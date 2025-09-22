import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StudyCardsService } from './study-cards-service'
import { ServiceFactories } from './service-factories'

// Mock the dependencies
vi.mock('../prisma/prisma', () => ({
  prisma: {
    studyCards: {
      deleteMany: vi.fn(),
      createMany: vi.fn(),
      findMany: vi.fn(),
    },
  },
}))

vi.mock('./service-factories', () => ({
  ServiceFactories: {
    createLLMService: vi.fn(),
  },
}))

describe('StudyCardsService', () => {
  const mockLLMService = {
    generateStudyCards: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(ServiceFactories.createLLMService).mockReturnValue(
      mockLLMService as any,
    )
  })

  describe('generateAndSaveStudyCards', () => {
    it('should skip generation for short content', async () => {
      const result = await StudyCardsService.generateAndSaveStudyCards(
        1,
        'Test Note',
        'Short',
      )

      expect(result).toEqual([])
      expect(mockLLMService.generateStudyCards).not.toHaveBeenCalled()
    })

    it('should generate and save study cards for valid content', async () => {
      const mockGeneratedCards = [
        {
          question: 'What is photosynthesis?',
          answer: 'The process by which plants convert sunlight into energy',
          subject: 'Biology',
          type: 'Card' as const,
        },
      ]

      mockLLMService.generateStudyCards.mockResolvedValue(mockGeneratedCards)

      const { prisma } = await import('../prisma/prisma')
      vi.mocked(prisma.studyCards.deleteMany).mockResolvedValue({ count: 0 })
      vi.mocked(prisma.studyCards.createMany).mockResolvedValue({ count: 1 })

      const result = await StudyCardsService.generateAndSaveStudyCards(
        1,
        'Biology Notes',
        'Photosynthesis is the process by which plants convert sunlight into energy using chlorophyll.',
      )

      expect(mockLLMService.generateStudyCards).toHaveBeenCalledWith(
        'Biology Notes',
        'Photosynthesis is the process by which plants convert sunlight into energy using chlorophyll.',
      )

      expect(prisma.studyCards.deleteMany).toHaveBeenCalledWith({
        where: { noteId: 1 },
      })

      expect(prisma.studyCards.createMany).toHaveBeenCalledWith({
        data: [
          {
            question: 'What is photosynthesis?',
            answer: 'The process by which plants convert sunlight into energy',
            subject: 'Biology',
            type: 'Card',
            noteId: 1,
          },
        ],
      })

      expect(result).toEqual([
        {
          question: 'What is photosynthesis?',
          answer: 'The process by which plants convert sunlight into energy',
          subject: 'Biology',
          type: 'Card',
          noteId: 1,
        },
      ])
    })

    it('should handle LLM service errors gracefully', async () => {
      mockLLMService.generateStudyCards.mockRejectedValue(
        new Error('LLM Error'),
      )

      const { prisma } = await import('../prisma/prisma')
      vi.mocked(prisma.studyCards.deleteMany).mockResolvedValue({ count: 0 })

      const result = await StudyCardsService.generateAndSaveStudyCards(
        1,
        'Test Note',
        'This is a long enough content to trigger generation but will fail.',
      )

      expect(result).toEqual([])
    })
  })

  describe('deleteStudyCardsForNote', () => {
    it('should delete study cards for a given note', async () => {
      const { prisma } = await import('../prisma/prisma')
      vi.mocked(prisma.studyCards.deleteMany).mockResolvedValue({ count: 3 })

      const result = await StudyCardsService.deleteStudyCardsForNote(1)

      expect(prisma.studyCards.deleteMany).toHaveBeenCalledWith({
        where: { noteId: 1 },
      })
      expect(result.count).toBe(3)
    })
  })

  describe('getStudyCardsForNote', () => {
    it('should fetch study cards for a given note', async () => {
      const mockCards = [
        {
          id: 1,
          question: 'Test question?',
          answer: 'Test answer',
          subject: 'Test',
          type: 'Card',
          noteId: 1,
        },
      ]

      const { prisma } = await import('../prisma/prisma')
      vi.mocked(prisma.studyCards.findMany).mockResolvedValue(mockCards as any)

      const result = await StudyCardsService.getStudyCardsForNote(1)

      expect(prisma.studyCards.findMany).toHaveBeenCalledWith({
        where: { noteId: 1 },
        orderBy: { id: 'asc' },
      })
      expect(result).toEqual(mockCards)
    })
  })
})
