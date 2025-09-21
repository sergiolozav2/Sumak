import { OpenAI } from 'openai'
import type { LLMConfig } from './llm-service-interface'

export class OCRService {
  private client: OpenAI
  private config: LLMConfig

  constructor(config: LLMConfig) {
    this.config = config
    this.client = this.createClient()
  }

  private createClient(): OpenAI {
    return new OpenAI({
      apiKey: this.config.apiKey,
    })
  }

  private getModel(): string {
    return this.config.model
  }

  // Extract text from image buffers using the chat completions endpoint
  async extractTextFromImage(imageUrl: string): Promise<string> {
    const systemPrompt = `You are an expert OCR system. Extract ALL text from the image with high accuracy.

Instructions:
- Extract ALL visible text, including handwritten notes, typed text, labels, captions, etc.
- Maintain the original structure (headings, paragraphs, lists, etc.)
- If there are tables, format them clearly
- If no text is found, attempt to describe the image content as accurately as possible

Focus on accuracy and completeness.`

    const response = await this.client.chat.completions.create({
      model: this.getModel(),
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please extract all text from this image:',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 2000,
    })

    const extractedText = response.choices?.[0]?.message?.content || ''

    if (extractedText === 'No text detected' || extractedText.trim() === '') {
      return ''
    }

    return extractedText
  }

  // Process file buffers: images -> OCR, pdf -> document extraction via the same endpoint
  async extractContentFromDocument(pdfUrl: string): Promise<string> {
    const systemPrompt = `You are a document processing expert. Extract and structure the content from this PDF document.

Instructions:
- Extract ALL text content from the document
- Convert tables to readable text format
- Preserve the original document structure and formatting
- Include headings, subheadings, and hierarchical structure
- Preserve important formatting like bullet points, numbered lists, etc.
- If there are images or charts, describe them briefly

Provide a clean, well-structured text output.`

    const response = await this.client.responses.create({
      instructions: systemPrompt,
      model: this.getModel(),
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_file', file_url: pdfUrl }, // Responses API supports content items like this
          ],
        },
      ],
      temperature: 0.1,
    })
    console.log(response)
    return response.output_text
  }
}
