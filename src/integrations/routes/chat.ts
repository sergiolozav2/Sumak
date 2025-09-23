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
  createWithMessageStream: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, 'Message cannot be empty'),
      }),
    )
    .mutation(async function* ({ input }) {
      try {
        // Create LLM service instance
        const llmService = ServiceFactories.createLLMService()

        // Create the chat instantly with message as temporary title
        const tempTitle =
          input.message.length > 50
            ? input.message.substring(0, 50) + '...'
            : input.message

        const chat = await prisma.chat.create({
          data: {
            title: tempTitle,
          },
        })

        // Create user message
        const userMessage = await prisma.chatMessage.create({
          data: {
            chatId: chat.id,
            message: input.message,
            fromSystem: false,
          },
        })

        // Extract file references from user message (format: file:{id})
        const fileReferences = [...input.message.matchAll(/file:(\d+)/g)]
        const fileIds = fileReferences.map((match) => parseInt(match[1], 10))

        // Fetch referenced files
        let filesContext = ''
        if (fileIds.length > 0) {
          const referencedFiles = await prisma.files.findMany({
            where: {
              id: { in: fileIds },
            },
          })

          filesContext = referencedFiles
            .filter((file) => file.ocrDescription) // Only include files with OCR content
            .map((file) => `**File: ${file.title}**\n${file.ocrDescription}`)
            .join('\n\n---\n\n')
        }

        // Fetch all student notes to include as context
        const studentNotes = await prisma.notes.findMany({
          orderBy: { id: 'desc' },
        })

        // Prepare notes context for the LLM
        const notesContext =
          studentNotes.length > 0
            ? studentNotes
                .map((note) => `**${note.title}**\n${note.content}`)
                .join('\n\n---\n\n')
            : 'No notes available.'

        // Detect user's language
        const userLanguage = input.message
          .toLowerCase()
          .match(
            /[ñáéíóúü]|qué|cómo|que|como|porque|donde|cuando|quien|cuanto|pregunta|por qué|cuál|dónde|cuándo|quién|cuánto|cuánta|hola|gracias|por favor|ayuda|explicar|entender|aprender/,
          )
          ? 'es'
          : 'en'

        // Parallelize title generation and AI response
        const titlePromise = llmService
          .generateChatTitle(input.message)
          .then(async (generatedTitle) => {
            await prisma.chat.update({
              where: { id: chat.id },
              data: { title: generatedTitle },
            })
            return generatedTitle
          })
          .catch((error) => {
            console.error('Error generating title:', error)
            return tempTitle // Keep temp title if generation fails
          })

        // Format complete context message and combine with actual user message
        const contextMessage = llmService.formatStudyContextMessage(
          filesContext,
          notesContext,
          userLanguage,
        )
        const combinedUserMessage = contextMessage
          ? `${contextMessage} ${input.message}`
          : input.message

        const messages: Array<ChatMessage> = [
          {
            role: 'system' as const,
            content: llmService.getEducationalSystemMessageWithNotesContext(),
          },
          { role: 'user' as const, content: combinedUserMessage },
        ]

        const readableResponse = llmService.createStreamingCompletion(messages)
        let aiResponse = ''
        let chunkBuffer = ''
        let chunkCount = 0

        for await (const chunk of readableResponse) {
          aiResponse += chunk
          chunkBuffer += chunk
          chunkCount++

          // Yield every 10 chunks
          if (chunkCount >= 10) {
            yield {
              type: 'chunk' as const,
              chunk: chunkBuffer,
            }
            chunkBuffer = ''
            chunkCount = 0
          }
        }

        // Yield any remaining chunks in the buffer
        if (chunkBuffer) {
          yield {
            type: 'chunk' as const,
            chunk: chunkBuffer,
          }
        }

        // Extract thinking process and final message
        const { thinkingProcess, finalMessage } =
          llmService.extractThinkingAndMessage(aiResponse)

        const aiMessage = await prisma.chatMessage.create({
          data: {
            chatId: chat.id,
            message: finalMessage,
            thinkingProcess: thinkingProcess,
            fromSystem: true,
          },
        })

        // Wait for title generation to complete (if not already done)
        const finalTitle = await titlePromise

        // Yield completion with final messages and updated title
        yield {
          type: 'complete' as const,
          userMessage,
          aiMessage,
          chatId: chat.id,
          finalTitle,
        }

        return {
          userMessage,
          aiMessage,
          chatId: chat.id,
          finalTitle,
        }
      } catch (error) {
        console.error('Error creating chat with streaming message:', error)
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

      // Extract file references from user message (format: file:{id})
      const fileReferences = [...input.message.matchAll(/file:(\d+)/g)]
      const fileIds = fileReferences.map((match) => parseInt(match[1], 10))
      // Fetch referenced files
      let filesContext = ''
      if (fileIds.length > 0) {
        const referencedFiles = await prisma.files.findMany({
          where: {
            id: { in: fileIds },
          },
        })

        filesContext = referencedFiles
          .filter((file) => file.ocrDescription) // Only include files with OCR content
          .map((file) => `**File: ${file.title}**\n${file.ocrDescription}`)
          .join('\n\n---\n\n')
      }

      // Fetch all student notes to include as context
      const studentNotes = await prisma.notes.findMany({
        orderBy: { id: 'desc' },
      })

      // Prepare notes context for the LLM
      const notesContext =
        studentNotes.length > 0
          ? studentNotes
              .map((note) => `**${note.title}**\n${note.content}`)
              .join('\n\n---\n\n')
          : 'No notes available.'

      // Create LLM service instance
      const llmService = ServiceFactories.createLLMService()

      // Detect user's language
      const userLanguage = input.message
        .toLowerCase()
        .match(
          /[ñáéíóúü]|qué|cómo|que|como|porque|donde|cuando|quien|cuanto|pregunta|por qué|cuál|dónde|cuándo|quién|cuánto|cuánta|hola|gracias|por favor|ayuda|explicar|entender|aprender/,
        )
        ? 'es'
        : 'en'

      // Only include context if files are referenced in the message
      let userMessageContent = input.message
      if (fileIds.length > 0) {
        // Include files and notes context when files are referenced
        const contextMessage = llmService.formatStudyContextMessage(
          filesContext,
          notesContext,
          userLanguage,
        )
        userMessageContent = contextMessage
          ? `${contextMessage} ${input.message}`
          : input.message
      }

      // Educational chat mode with notes context
      const messages = [
        {
          role: 'system' as const,
          content: llmService.getEducationalSystemMessageWithNotesContext(),
        },
        ...conversationHistory,
        { role: 'user' as const, content: userMessageContent },
      ]

      const readableResponse = llmService.createStreamingCompletion(messages)
      let aiResponse = ''
      let chunkBuffer = ''
      let chunkCount = 0

      for await (const chunk of readableResponse) {
        aiResponse += chunk
        chunkBuffer += chunk
        chunkCount++

        // Yield every 10 chunks
        if (chunkCount >= 10) {
          yield {
            chunk: chunkBuffer,
          }
          chunkBuffer = ''
          chunkCount = 0
        }
      }

      // Yield any remaining chunks in the buffer
      if (chunkBuffer) {
        yield {
          chunk: chunkBuffer,
        }
      }

      // Extract thinking process and final message
      const { thinkingProcess, finalMessage } =
        llmService.extractThinkingAndMessage(aiResponse)

      const aiMessage = await prisma.chatMessage.create({
        data: {
          chatId: input.chatId,
          message: finalMessage,
          thinkingProcess: thinkingProcess,
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
