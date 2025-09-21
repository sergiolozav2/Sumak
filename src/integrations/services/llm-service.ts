import { OpenAI } from 'openai'
import type {
  ChatCompletionResponse,
  ChatMessage,
  ILLMService,
  LLMConfig,
  QuizQuestion,
} from './llm-service-interface'

export class LLMService implements ILLMService {
  public client: OpenAI
  private config: LLMConfig

  constructor(config: LLMConfig) {
    this.config = config
    this.client = this.createClient()
  }

  private createClient(): OpenAI {
    return new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseUrl,
    })
  }

  private getModel(): string {
    return 'distill-llama-8b_46e6iu'
  }

  async createChatCompletion(
    messages: Array<ChatMessage>,
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
      })

      if ('choices' in response && response.choices.length > 0) {
        const choice = response.choices[0]
        const content =
          (choice.message?.content?.includes('</think>')
            ? choice.message?.content?.split('</think>\n\n')[1].trim()
            : choice.message?.content) || ''
        return {
          content,
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

  async *fakeStreamingCompletion() {
    let maxMessages = 3000
    while (maxMessages-- > 0) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      yield Math.random()?.toString().slice(2, 3) + ' '
    }
  }

  async *createStreamingCompletion(
    messages: Array<ChatMessage>,
    options?: {
      temperature?: number
      maxTokens?: number
    },
  ) {
    try {
      const stream = await this.client.chat.completions.create({
        model: this.getModel(),
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
        temperature: options?.temperature ?? 0.7,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          yield content
        }
      }
    } catch (error) {
      console.error('LLM Streaming Error:', error)
      throw new Error(
        `Failed to create streaming completion: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  // Method to extract thinking process and final message from streamed content
  extractThinkingAndMessage(fullContent: string): {
    thinkingProcess: string | null
    finalMessage: string
  } {
    const thinkEndIndex = fullContent.indexOf('</think>')

    if (thinkEndIndex === -1) {
      // No thinking process found
      return {
        thinkingProcess: null,
        finalMessage: fullContent.trim(),
      }
    }

    const thinkingProcess = fullContent.substring(0, thinkEndIndex + 8)
    const finalMessage = fullContent.substring(thinkEndIndex + 8).trim()

    return {
      thinkingProcess,
      finalMessage,
    }
  }

  // Helper method to create a tutoring response based on context
  async createTutoringResponse(
    question: string,
    context: string,
    conversationHistory?: Array<ChatMessage>,
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

    const messages: Array<ChatMessage> = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: question },
    ]

    const response = await this.createChatCompletion(messages)
    return response.content
  }

  // Helper method to generate a chat title based on the first message
  async generateChatTitle(message: string): Promise<string> {
    const systemPrompt = `You are a helpful assistant that generates short, descriptive titles for chat conversations based on the first message. The title should be:
- 3-6 words maximum
- Descriptive of the topic
- In the same language as the user's message
- No quotes or special formatting

Generate only the title, nothing else.

First message is given below:`

    const messages: Array<ChatMessage> = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: message,
      },
    ]

    try {
      const response = await this.createChatCompletion(messages, {
        temperature: 0.3,
      })

      return response.content.trim() || 'New Chat'
    } catch (error) {
      console.error('Error generating chat title:', error)
      return 'New Chat' // Fallback title
    }
  }

  // Helper method to generate quiz questions based on content
  async generateQuizQuestions(
    content: string,
    numberOfQuestions: number = 3,
  ): Promise<Array<QuizQuestion>> {
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

    const messages: Array<ChatMessage> = [
      { role: 'system', content: systemPrompt },
    ]

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

// Export types for use in other modules
export type {
  ChatMessage,
  ChatCompletionResponse,
  LLMConfig,
  QuizQuestion,
  ILLMService,
} from './llm-service-interface'
