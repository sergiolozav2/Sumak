import { describe, it, expect, beforeAll } from 'vitest'
import { ServiceFactories } from './service-factories'

describe('OCRService', () => {
  it(
    'should be defined',
    async () => {
      const ocrService = ServiceFactories.createOCRService()
      const url =
        'https://sergiolozav.netlify.app/assets/CV-Sergio%20Loza-CKowRC35.pdf'

      const result = await ocrService.extractContentFromDocument(url)

      expect(result).toBeDefined()
      console.log(result)
    },
    {
      timeout: 20000,
    },
  )
})
