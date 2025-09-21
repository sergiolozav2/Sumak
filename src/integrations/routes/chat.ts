import z from 'zod'
import { prisma } from '../prisma/prisma'
import { publicProcedure } from '../trpc/init'
import type { ChatMessage } from '../services/llm-service'
import type { TRPCRouterRecord } from '@trpc/server'
import { ServiceFactories } from '../services/service-factories'

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

  // Create a new chat with an initial message and AI-generated title
  createWithMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, 'Message cannot be empty'),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Create LLM service instance
        const llmService = ServiceFactories.createLLMService()

        // Generate a title based on the first message
        const generatedTitle = await llmService.generateChatTitle(input.message)

        // Create the chat with the generated title
        const chat = await prisma.chat.create({
          data: {
            title: generatedTitle,
          },
        })

        // Create user message
        await prisma.chatMessage.create({
          data: {
            chatId: chat.id,
            message: input.message,
            fromSystem: false,
          },
        })

        const messages: Array<ChatMessage> = [
          {
            role: 'system' as const,
            content:
              'You are a helpful AI assistant. Provide clear, concise, and helpful responses.',
          },
          { role: 'user' as const, content: input.message },
        ]

        const response = await llmService.createChatCompletion(messages)

        // Create AI response message
        await prisma.chatMessage.create({
          data: {
            chatId: chat.id,
            message: response.content,
            fromSystem: true,
          },
        })

        // Return the chat with messages
        return await prisma.chat.findUnique({
          where: { id: chat.id },
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
            },
          },
        })
      } catch (error) {
        console.error('Error creating chat with message:', error)
        throw new Error('Failed to create chat. Please try again.')
      }
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
      }),
    )
    .mutation(async function* ({ input }) {
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
      const llmService = ServiceFactories.createLLMService()

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

      const readableResponse = llmService.fakeStreamingCompletion()
      let aiResponse = ''
      for await (const chunk of readableResponse) {
        aiResponse += chunk
        yield {
          chunk: chunk,
        }
      }
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
            gte: message?.createdAt,
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
        const llmService = ServiceFactories.createLLMService()
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
