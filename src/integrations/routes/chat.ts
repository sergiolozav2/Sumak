import { TRPCRouterRecord } from '@trpc/server'
import { prisma } from '../prisma/prisma'
import { publicProcedure } from '../trpc/init'
import z from 'zod'
import { createLLMService } from '../services/llm-service'
export const chatRouter = {
  // Get all chats for a user (in future, you might want to add user filtering)
  getAll: publicProcedure.query(async () => {
    // DB
    return await prisma.chat.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { id: 'desc' },
    })
  }),

  // Get a specific chat with its messages
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.chat.findUnique({
        where: { id: input.id },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      })
    }),

  // Create a new chat
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Title is required'),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.chat.create({
        data: {
          title: input.title,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      })
    }),

  // Update chat title
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1, 'Title is required'),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.chat.update({
        where: { id: input.id },
        data: {
          title: input.title,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      })
    }),

  // Delete a chat and all its messages
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // First delete all messages associated with the chat
      await prisma.chatMessage.deleteMany({
        where: { chatId: input.id },
      })

      // Then delete the chat itself
      return await prisma.chat.delete({
        where: { id: input.id },
      })
    }),

  // Send a message and get AI response
  sendMessage: publicProcedure
    .input(
      z.object({
        chatId: z.number(),
        message: z.string().min(1, 'Message cannot be empty'),
        context: z.string().optional(), // Optional context for tutoring mode
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Create user message
        const userMessage = await prisma.chatMessage.create({
          data: {
            chatId: input.chatId,
            message: input.message,
            fromSystem: false,
          },
        })

        // Get conversation history for context
        const previousMessages = await prisma.chatMessage.findMany({
          where: { chatId: input.chatId },
          orderBy: { createdAt: 'asc' },
          take: 10, // Last 10 messages for context
        })

        // Convert to LLM format
        const conversationHistory = previousMessages
          .slice(0, -1) // Exclude the just-created user message
          .map((msg) => ({
            role: msg.fromSystem ? ('assistant' as const) : ('user' as const),
            content: msg.message,
          }))

        // Create LLM service instance
        const llmService = createLLMService()

        let aiResponse: string

        if (input.context) {
          // If context is provided, use tutoring mode
          aiResponse = await llmService.createTutoringResponse(
            input.message,
            input.context,
            conversationHistory,
          )
        } else {
          // General chat mode
          const messages = [
            {
              role: 'system' as const,
              content:
                'You are a helpful AI assistant. Provide clear, concise, and helpful responses.',
            },
            ...conversationHistory,
            { role: 'user' as const, content: input.message },
          ]

          const response = await llmService.createChatCompletion(messages)
          aiResponse = response.content
        }

        // Create AI response message
        const aiMessage = await prisma.chatMessage.create({
          data: {
            chatId: input.chatId,
            message: aiResponse,
            fromSystem: true,
          },
        })

        return {
          userMessage,
          aiMessage,
        }
      } catch (error) {
        console.error('Error sending message:', error)

        // Create error response message
        const errorMessage = await prisma.chatMessage.create({
          data: {
            chatId: input.chatId,
            message:
              'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.',
            fromSystem: true,
          },
        })

        return {
          userMessage: await prisma.chatMessage.findFirst({
            where: {
              chatId: input.chatId,
              message: input.message,
              fromSystem: false,
            },
            orderBy: { createdAt: 'desc' },
          }),
          aiMessage: errorMessage,
        }
      }
    }),

  // Get messages for a specific chat
  getMessages: publicProcedure
    .input(z.object({ chatId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.chatMessage.findMany({
        where: { chatId: input.chatId },
        orderBy: { createdAt: 'asc' },
      })
    }),

  // Delete a specific message
  deleteMessage: publicProcedure
    .input(z.object({ messageId: z.number() }))
    .mutation(async ({ input }) => {
      const message = await prisma.chatMessage.findFirstOrThrow({
        where: { id: input.messageId },
      })
      return await prisma.chatMessage.deleteMany({
        where: {
          createdAt: {
            lte: message?.createdAt,
          },
        },
      })
    }),

  // Generate quiz questions based on content
  generateQuiz: publicProcedure
    .input(
      z.object({
        content: z.string().min(1, 'Content is required'),
        numberOfQuestions: z.number().min(1).max(10).default(3),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const llmService = createLLMService()
        const questions = await llmService.generateQuizQuestions(
          input.content,
          input.numberOfQuestions,
        )

        return {
          success: true,
          questions,
        }
      } catch (error) {
        console.error('Error generating quiz:', error)
        return {
          success: false,
          error: 'Failed to generate quiz questions. Please try again.',
        }
      }
    }),
} satisfies TRPCRouterRecord
