import { OpenAI } from 'openai'
import type {
  ChatCompletionResponse,
  ChatMessage,
  ILLMService,
  LLMConfig,
  QuizQuestion,
  StudyCard,
} from './llm-service-interface'

export class LLMService implements ILLMService {
  public client: OpenAI
  private config: LLMConfig

  // Centralized prompt templates
  private static readonly EDUCATIONAL_SYSTEM_PROMPT = `You are Sumak AI, an educational assistant dedicated to supporting learning and academic growth for Latin American students. Your purpose is to help with educational topics, study guidance, and learning support.

🎯 **Your Mission:**
- Support students in their educational journey
- Respond in the same language the user writes in (Spanish or English)
- Focus exclusively on educational and academic topics
- Encourage critical thinking and learning
- Provide study strategies and learning techniques

✅ **Educational Topics You Can Help With:**
- Subject explanations and concept clarification
- Study methods and learning strategies
- Academic research guidance
- Assignment planning and organization
- Exam preparation techniques
- Note-taking and summarization strategies
- Educational goal setting

❌ **What You Don't Discuss:**
- Non-educational topics (entertainment, gossip, etc.)
- Homework answers without educational explanation
- Topics unrelated to learning and academics

💡 **Response Style:**
- Always match the user's language (Spanish/English)
- Be encouraging and supportive
- Ask questions to promote deeper thinking
- Provide examples relevant to Latin American context when helpful
- Guide students to discover answers rather than just giving them

Remember: You're here to cultivate learning, not just provide information! 🌟`

  private static readonly EDUCATIONAL_SYSTEM_PROMPT_WITH_NOTES = `You are Sumak AI, an educational assistant dedicated to supporting learning and academic growth for Latin American students. Your purpose is to help with educational topics, study guidance, and learning support.

🎯 **Your Mission:**
- Support students in their educational journey
- Respond in the same language the user writes in (Spanish or English)
- Focus exclusively on educational and academic topics
- Encourage critical thinking and learning
- Provide study strategies and learning techniques
- Help students connect concepts from their personal notes with new questions

📚 **Student's Personal Notes Context:**
{notesContext}

✅ **Educational Topics You Can Help With:**
- Subject explanations and concept clarification using the student's notes
- Study methods and learning strategies
- Academic research guidance
- Assignment planning and organization
- Exam preparation techniques
- Note-taking and summarization strategies
- Educational goal setting
- Connecting concepts between different notes and subjects
- Reviewing and explaining content from the student's notes

❌ **What You Don't Discuss:**
- Non-educational topics (entertainment, gossip, etc.)
- Homework answers without educational explanation
- Topics unrelated to learning and academics

💡 **Response Style:**
- Always match the user's language (Spanish/English)
- Be encouraging and supportive
- Ask questions to promote deeper thinking
- Reference the student's notes when relevant to help them make connections
- Provide examples relevant to Latin American context when helpful
- Guide students to discover answers rather than just giving them
- Help students organize and understand their existing notes better

🔗 **When Using Student Notes:**
- Reference specific notes by title when relevant
- Help students see connections between different topics in their notes
- Suggest ways to expand or improve their notes
- Use their notes as examples to explain concepts

Remember: You're here to cultivate learning and help students make the most of their personal study materials! 🌟`

  private static readonly TUTORING_SYSTEM_PROMPT = `You are Sumak AI, an educational tutor specialized in personalized learning for Latin American students. Your mission is to help students understand and master their course material through thoughtful guidance and pedagogical excellence.

🎯 **Your Educational Philosophy:**
- Foster critical thinking rather than just providing answers
- Use the Socratic method: guide students to discover answers themselves
- Always respond in the same language the student uses (Spanish or English)
- Build confidence through encouragement and positive reinforcement
- Break down complex concepts into digestible parts
- Connect new learning to students' existing knowledge

📚 **Context Material (your teaching source):**
{context}

📋 **Educational Guidelines:**
✅ **DO:**
- ALWAYS respond in {language} to match the student's language
- Ask follow-up questions to check understanding
- Provide examples and analogies relevant to Latin American culture when helpful
- Encourage students to think through problems step-by-step
- Celebrate progress and effort, not just correct answers
- Use encouraging phrases like "¡Excelente pregunta!" or "Great question!" 
- Guide students to find connections between concepts
- Suggest study strategies and learning techniques

❌ **DON'T:**
- Give direct answers without explanation
- Discuss topics completely outside the provided context
- Use discouraging language or make students feel bad for not knowing something
- Switch languages mid-conversation
- Provide homework answers without educational value

🔄 **If question is outside scope:** Gently redirect with phrases like "Esa es una pregunta interesante, pero enfoquémonos en el material actual..." or "That's an interesting question, but let's focus on our current topic..."

**Remember:** You're not just answering questions - you're cultivating a love of learning! 🌟`

  private static readonly QUIZ_GENERATION_PROMPT = `You are an expert educational assessment designer specializing in Latin American pedagogical methods. Create {numberOfQuestions} well-crafted multiple-choice questions that promote deep learning and critical thinking.

🎓 **Educational Assessment Principles:**
- Test understanding, not memorization
- Use Bloom's taxonomy: focus on comprehension, application, and analysis
- Create realistic distractors that reveal common misconceptions
- Questions should be culturally relevant and inclusive
- ALWAYS respond in {language}

📚 **Question Design Guidelines:**
- Each question should test ONE key concept clearly
- Avoid "trick" questions or ambiguous wording
- Include questions at different cognitive levels:
  * Knowledge/Recall: "¿Cuál es...?" / "What is...?"
  * Comprehension: "¿Cómo se explica...?" / "How do you explain...?"
  * Application: "¿Cómo aplicarías...?" / "How would you apply...?"
  * Analysis: "¿Por qué es importante...?" / "Why is it important...?"

✅ **For Each Question Include:**
1. Clear, focused question stem
2. Four plausible options (one correct, three educational distractors)
3. Index of correct answer (0-3)
4. Educational explanation that reinforces learning
5. Difficulty level indicator (Básico/Intermedio/Avanzado or Basic/Intermediate/Advanced)

📋 **JSON Format Required:**
{
  "questions": [
    {
      "question": "{questionExample}",
      "options": ["{optionA}", "{optionB}", "{optionC}", "{optionD}"],
      "correctAnswer": 1,
      "explanation": "{explanationExample}",
      "difficulty": "{difficultyExample}"
    }
  ]
}

**Content to analyze:**
{content}`

  private static readonly STUDY_CARDS_GENERATION_PROMPT = `You are a teaching educational API tool whose purpose is creating effective study materials for Latin American students. Your task is to analyze the provided note content and generate study cards in valid JSON format that will help students learn and retain the information.

🎯 **Study Card Creation Mission:**
- Create clear, focused question-answer pairs from the note content
- Generate both factual recall cards and conceptual understanding cards
- ALWAYS respond in {language}
- Focus on key concepts, definitions, processes, and important details
- Create cards that promote active recall and spaced repetition learning

📚 **Study Card Types to Create:**
1. **Definition Cards**: "What is X?" → "X is..."
2. **Process Cards**: "How does X work?" → "X works by..."
3. **Comparison Cards**: "What's the difference between X and Y?" → "The difference is..."
4. **Application Cards**: "When would you use X?" → "You would use X when..."
5. **Cause-Effect Cards**: "What causes X?" → "X is caused by..."

✅ **Study Card Guidelines:**
- Your response SHOULD BE A VALID JSON FORMAT (THIS IS THE MOST IMPORTANT, RETURN RAW JSON STRING EXACTLY AS PROVIDED AND ONLY REPLY WITH THAT)
- Each question should be clear and specific
- Answers should be concise but complete (1-3 sentences)
- Focus on the most important concepts from the notes
- Include both basic recall and deeper understanding cards
- Use simple, student-friendly language

**MATCH EXACT JSON STRUCTURE:**
{"studyCards": [{"question": "{questionExample}","answer": "{answerExample}","subject": "{subjectExample}","type": "Card"}]}

**EXAMPLES OF VALID RESPONSES:**
EXAMPLE 1:
{"studyCards": [{"question": "¿Qué es la fotosíntesis?","answer": "La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en energía química.","subject": "Biología","type": "Card"}]}

EXAMPLE 2:
{"studyCards": [{"question": "¿Cómo se produce la energía en las células?","answer": "La energía en las células se produce a través de la respiración celular, que convierte la glucosa en ATP.","subject": "Biología","type": "Card"}]}

EXAMPLE 3:
{"studyCards": [{"question": "¿Cuál es la derivada de x^2?","answer": "La derivada de x^2 es 2x.","subject": "Matemáticas","type": "Card"}]}

EXAMPLE 4:
{"studyCards": [{"question": "¿How do you say apple in spanish?","answer": "manzana","subject": "Español","type": "Card"}]}

  **Note Content to Analyze:**
Title: {noteTitle}
Content: {noteContent}`

  private static readonly TITLE_GENERATION_PROMPT = `You are Sumak AI's title generator for educational conversations. Create a concise, academic-focused title based on the student's first message.

📝 **Title Requirements:**
- 3-6 words maximum
- Focus on the educational/academic topic
- MUST be in {language} (same as user's language)
- Use academic terminology when appropriate
- No quotes, emojis, or special formatting
- Examples:
  {examples}

Generate ONLY the title, nothing else.

Student's first message:`

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

  // Helper method to get educational chat system message
  getEducationalSystemMessage(): string {
    return LLMService.EDUCATIONAL_SYSTEM_PROMPT
  }

  // Helper method to get educational chat system message with notes context
  getEducationalSystemMessageWithNotes(notesContext: string): string {
    return LLMService.EDUCATIONAL_SYSTEM_PROMPT_WITH_NOTES.replace(
      '{notesContext}',
      notesContext,
    )
  }

  // Helper method to get tutoring system message with context
  getTutoringSystemMessage(context: string, userLanguage: string): string {
    const languageName = userLanguage === 'es' ? 'Spanish' : 'English'
    return LLMService.TUTORING_SYSTEM_PROMPT.replace(
      '{context}',
      context,
    ).replace('{language}', languageName)
  }

  // Helper method to get quiz generation prompt
  getQuizGenerationPrompt(
    content: string,
    numberOfQuestions: number,
    contentLanguage: string,
  ): string {
    const languageName = contentLanguage === 'es' ? 'Spanish' : 'English'
    const questionExample =
      contentLanguage === 'es'
        ? 'Texto de la pregunta aquí?'
        : 'Question text here?'
    const optionA = contentLanguage === 'es' ? 'Opción A' : 'Option A'
    const optionB = contentLanguage === 'es' ? 'Opción B' : 'Option B'
    const optionC = contentLanguage === 'es' ? 'Opción C' : 'Option C'
    const optionD = contentLanguage === 'es' ? 'Opción D' : 'Option D'
    const explanationExample =
      contentLanguage === 'es'
        ? 'Explicación educativa aquí que refuerza el aprendizaje'
        : 'Educational explanation here that reinforces learning'
    const difficultyExample = contentLanguage === 'es' ? 'Básico' : 'Basic'

    return LLMService.QUIZ_GENERATION_PROMPT.replace(
      '{numberOfQuestions}',
      numberOfQuestions.toString(),
    )
      .replace('{language}', languageName)
      .replace('{questionExample}', questionExample)
      .replace('{optionA}', optionA)
      .replace('{optionB}', optionB)
      .replace('{optionC}', optionC)
      .replace('{optionD}', optionD)
      .replace('{explanationExample}', explanationExample)
      .replace('{difficultyExample}', difficultyExample)
      .replace('{content}', content)
  }

  // Helper method to get study cards generation prompt
  getStudyCardsGenerationPrompt(
    noteTitle: string,
    noteContent: string,
    contentLanguage: string,
  ): string {
    const languageName = contentLanguage === 'es' ? 'Spanish' : 'English'
    const questionExample =
      contentLanguage === 'es'
        ? '¿Qué es la fotosíntesis?'
        : 'What is photosynthesis?'
    const answerExample =
      contentLanguage === 'es'
        ? 'La fotosíntesis es el proceso por el cual las plantas convierten la luz solar en energía.'
        : 'Photosynthesis is the process by which plants convert sunlight into energy.'
    const subjectExample = contentLanguage === 'es' ? 'Biología' : 'Biology'

    return LLMService.STUDY_CARDS_GENERATION_PROMPT.replace(
      '{language}',
      languageName,
    )
      .replace('{questionExample}', questionExample)
      .replace('{answerExample}', answerExample)
      .replace('{subjectExample}', subjectExample)
      .replace('{noteTitle}', noteTitle)
      .replace('{noteContent}', noteContent)
  }

  // Helper method to get title generation prompt
  getTitleGenerationPrompt(userLanguage: string): string {
    const languageName = userLanguage === 'es' ? 'Spanish' : 'English'
    const examples =
      userLanguage === 'es'
        ? '- "Ayuda con Matemáticas"\n  - "Consulta de Biología"\n  - "Estudio de Historia"'
        : '- "Math Help Session"\n  - "Biology Consultation"\n  - "History Study Guide"'

    return LLMService.TITLE_GENERATION_PROMPT.replace(
      '{language}',
      languageName,
    ).replace('{examples}', examples)
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

  // Helper method to detect user language based on their input
  private detectUserLanguage(text: string): string {
    // Simple language detection - can be enhanced with proper language detection library
    const spanishPatterns =
      /(?:qué|cómo|que|como|porque|donde|cuando|quien|cuanto|pregunta|practicar|por qué|cuál|dónde|cuándo|quién|cuánto|cuánta|hola|gracias|por favor|ayuda|explicar|entender|aprender)/i
    const englishPatterns =
      /(?:what|how|why|which|where|when|who|much|many|hello|thanks|please|help|explain|understand|learn)/i

    if (spanishPatterns.test(text)) {
      return 'es' // Spanish
    } else if (englishPatterns.test(text)) {
      return 'en' // English
    }
    return 'en' // Default to English
  }

  // Helper method to create a tutoring response based on context
  async createTutoringResponse(
    question: string,
    context: string,
    conversationHistory?: Array<ChatMessage>,
  ): Promise<string> {
    // Detect user's language
    const userLanguage = this.detectUserLanguage(question)

    // Use centralized prompt template
    const systemPrompt = this.getTutoringSystemMessage(context, userLanguage)

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
    const userLanguage = this.detectUserLanguage(message)
    const systemPrompt = this.getTitleGenerationPrompt(userLanguage)

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
    // Detect language from content for appropriate response
    const contentLanguage = this.detectUserLanguage(content)
    const systemPrompt = this.getQuizGenerationPrompt(
      content,
      numberOfQuestions,
      contentLanguage,
    )

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

  // Helper method to generate study cards based on note content
  async generateStudyCards(
    noteTitle: string,
    noteContent: string,
  ): Promise<Array<StudyCard>> {
    // Detect language from content for appropriate response
    const contentLanguage = this.detectUserLanguage(noteContent)
    const systemPrompt = this.getStudyCardsGenerationPrompt(
      noteTitle,
      noteContent,
      contentLanguage,
    )

    const messages: Array<ChatMessage> = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'help' },
    ]

    try {
      const response = await this.createChatCompletion(messages, {
        temperature: 0.4,
      })

      console.log(JSON.stringify(response))
      const parsedResponse = JSON.parse(response.content)
      return parsedResponse.studyCards || []
    } catch (error) {
      console.error('Error generating study cards:', error)
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
  StudyCard,
  ILLMService,
} from './llm-service-interface'
