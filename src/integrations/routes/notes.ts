import { TRPCRouterRecord } from '@trpc/server'
import { prisma } from '../prisma/prisma'
import { publicProcedure } from '../trpc/init'
import z from 'zod'

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
      return await prisma.notes.create({
        data: {
          title: input.title,
          content: input.content,
        },
      })
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
      return await prisma.notes.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.notes.delete({
        where: { id: input.id },
      })
    }),
} satisfies TRPCRouterRecord
