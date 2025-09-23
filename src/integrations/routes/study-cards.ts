import z from 'zod'
import { prisma } from '../prisma/prisma'
import { publicProcedure } from '../trpc/init'
import type { TRPCRouterRecord } from '@trpc/server'

export const studyCardsRouter = {
  getAll: publicProcedure.query(async () => {
    return await prisma.studyCards.findMany({
      orderBy: { id: 'desc' },
    })
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.studyCards.delete({
        where: { id: input.id },
      })
    }),

  getByNoteId: publicProcedure
    .input(z.object({ noteId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.studyCards.findMany({
        where: { noteId: input.noteId },
        orderBy: { id: 'asc' },
      })
    }),
} satisfies TRPCRouterRecord
