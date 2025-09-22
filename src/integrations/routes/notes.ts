import z from 'zod'
import { prisma } from '../prisma/prisma'
import { publicProcedure } from '../trpc/init'
import type { TRPCRouterRecord } from '@trpc/server'
import { StudyCardsService } from '../services/study-cards-service'

export const notesRouter = {
  getAll: publicProcedure.query(async () => {
    // Seed some sample notes if none exist
    const count = await prisma.notes.count()
    if (count === 0) {
      await prisma.notes.createMany({
        data: [
          {
            title: 'My First Note',
            content:
              'This is my first note. I can write anything here and it will be saved automatically when I press Ctrl+S or click the Save button.',
          },
        ],
      })
    }

    return await prisma.notes.findMany({
      orderBy: { id: 'desc' },
    })
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const createdNote = await prisma.notes.create({
        data: {
          title: input.title,
          content: input.content,
        },
      })

      // Generate study cards in the background (don't wait for completion)
      StudyCardsService.generateAndSaveStudyCards(
        createdNote.id,
        createdNote.title,
        createdNote.content,
      ).catch((error) => {
        console.error('Failed to generate study cards for new note:', error)
      })

      return createdNote
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedNote = await prisma.notes.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      })

      // Regenerate study cards in the background (don't wait for completion)
      StudyCardsService.updateStudyCardsForNote(
        updatedNote.id,
        updatedNote.title,
        updatedNote.content,
      ).catch((error) => {
        console.error('Failed to update study cards for updated note:', error)
      })

      return updatedNote
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // Delete associated study cards first
      await StudyCardsService.deleteStudyCardsForNote(input.id)

      // Then delete the note (the CASCADE constraint in schema should handle this automatically,
      // but explicit deletion ensures proper cleanup and logging)
      return await prisma.notes.delete({
        where: { id: input.id },
      })
    }),
} satisfies TRPCRouterRecord
