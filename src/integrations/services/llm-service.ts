import { OpenAI } from 'openai'

interface LLMConfig {
  apiKey: string
  baseURL: string
  model: string
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatCompletionResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

class LLMService {
  private client: OpenAI
  private config: LLMConfig

  constructor(config: LLMConfig) {
    this.config = config
    this.client = this.createClient()
  }

  private createClient(): OpenAI {
    return new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
    })
  }

  private getModel(): string {
    return this.config.model
  }

  async createChatCompletion(
    messages: ChatMessage[],
    options?: {
      stream?: boolean
      temperature?: number
      maxTokens?: number
    },
  ): Promise<ChatCompletionResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.getModel(),
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: options?.stream ?? false,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 1000,
      })

      if ('choices' in response && response.choices.length > 0) {
        const choice = response.choices[0]
        return {
          content: choice.message?.content || '',
          usage: response.usage
            ? {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens,
              }
            : undefined,
        }
      }

      throw new Error('No response from LLM service')
    } catch (error) {
      console.error('LLM Service Error:', error)
      throw new Error(
        `Failed to create chat completion: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  async createStreamingCompletion(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    options?: {
      temperature?: number
      maxTokens?: number
    },
  ): Promise<void> {
    try {
      const stream = await this.client.chat.completions.create({
        model: this.getModel(),
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 1000,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          onChunk(content)
        }
      }
    } catch (error) {
      console.error('LLM Streaming Error:', error)
      throw new Error(
        `Failed to create streaming completion: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  // Helper method to create a tutoring response based on context
  async createTutoringResponse(
    question: string,
    context: string,
    conversationHistory?: ChatMessage[],
  ): Promise<string> {
    const systemPrompt = `You are a helpful AI tutor. You should only answer questions based on the provided context material. If a question is not related to the context or requires information outside of it, politely redirect the student to ask questions about the current topic.

Context Material:
${context}

Instructions:
- Only use information from the provided context
- Be encouraging and supportive
- Provide clear, step-by-step explanations when appropriate
- If the question is outside the context scope, explain that you can only help with the current topic material
- Keep responses concise but thorough`

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: question },
    ]

    const response = await this.createChatCompletion(messages)
    return response.content
  }

  // Helper method to generate quiz questions based on content
  async generateQuizQuestions(
    content: string,
    numberOfQuestions: number = 3,
  ): Promise<
    Array<{
      question: string
      options: string[]
      correctAnswer: number
      explanation: string
    }>
  > {
    const systemPrompt = `You are an educational content generator. Based on the provided content, create ${numberOfQuestions} multiple-choice questions that test understanding of the key concepts.

For each question, provide:
1. A clear question
2. Four plausible answer options
3. The index (0-3) of the correct answer
4. A brief explanation of why that answer is correct

Format your response as JSON with this structure:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 1,
      "explanation": "Explanation here"
    }
  ]
}

Content to analyze:
${content}`

    const messages: ChatMessage[] = [{ role: 'system', content: systemPrompt }]

    try {
      const response = await this.createChatCompletion(messages, {
        temperature: 0.3, // Lower temperature for more consistent output
      })

      const parsedResponse = JSON.parse(response.content)
      return parsedResponse.questions || []
    } catch (error) {
      console.error('Error generating quiz questions:', error)
      // Fallback to empty array if parsing fails
      return []
    }
  }
}

// Factory function to create LLM service instance
export function createLLMService(): LLMService {
  const apiKey = process.env.LLM_API_KEY
  const baseURL = process.env.LLM_BASE_URL
  const model = process.env.LLM_MODEL

  if (!apiKey) {
    throw new Error('LLM_API_KEY environment variable is required')
  }

  if (!baseURL) {
    throw new Error('LLM_BASE_URL environment variable is required')
  }

  if (!model) {
    throw new Error('LLM_MODEL environment variable is required')
  }

  return new LLMService({
    apiKey,
    baseURL,
    model,
  })
}

// Export types for use in other modules
export type { ChatMessage, ChatCompletionResponse, LLMConfig }
export { LLMService }
