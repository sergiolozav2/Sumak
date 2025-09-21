export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatCompletionResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface LLMConfig {
  apiKey: string
  model: string
  baseUrl?: string
}

export interface QuizQuestion {
  question: string
  options: Array<string>
  correctAnswer: number
  explanation: string
}

/**
 * Interface for LLM service implementations
 */
export interface ILLMService {
  /**
   * Create a chat completion
   */
  createChatCompletion: (
    messages: Array<ChatMessage>,
    options?: {
      stream?: boolean
      temperature?: number
      maxTokens?: number
    },
  ) => Promise<ChatCompletionResponse>

  /**
   * Create a streaming completion
   */
  createStreamingCompletion: (
    messages: Array<ChatMessage>,
    options?: {
      temperature?: number
      maxTokens?: number
    },
  ) => AsyncIterable<string>

  /**
   * Create a tutoring response based on context
   */
  createTutoringResponse: (
    question: string,
    context: string,
    conversationHistory?: Array<ChatMessage>,
  ) => Promise<string>

  /**
   * Generate a chat title based on the first message
   */
  generateChatTitle: (message: string) => Promise<string>

  /**
   * Generate quiz questions based on content
   */
  generateQuizQuestions: (
    content: string,
    numberOfQuestions?: number,
  ) => Promise<Array<QuizQuestion>>
}
