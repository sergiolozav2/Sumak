import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from './init'

import type { TRPCRouterRecord } from '@trpc/server'

const todos = [
  { id: 1, name: 'Get groceries' },
  { id: 2, name: 'Buy a new phone' },
  { id: 3, name: 'Finish the project' },
]

const todosRouter = {
  list: publicProcedure.query(() => todos),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      const newTodo = { id: todos.length + 1, name: input.name }
      todos.push(newTodo)
      return newTodo
    }),
} satisfies TRPCRouterRecord

// Mock data for student features
const mockClasses = [
  {
    id: 1,
    name: 'Matemáticas Básicas',
    code: 'MATH101',
    teacher: 'Prof. García',
    description: 'Fundamentos de álgebra y geometría',
    status: 'active',
    joinedAt: new Date('2024-09-01'),
  },
  {
    id: 2,
    name: 'Historia de Bolivia',
    code: 'HIST201',
    teacher: 'Prof. Mamani',
    description: 'Historia precolombina y colonial de Bolivia',
    status: 'active',
    joinedAt: new Date('2024-08-15'),
  },
  {
    id: 3,
    name: 'Ciencias Naturales',
    code: 'SCI301',
    teacher: 'Prof. Condori',
    description: 'Biología y química básica',
    status: 'active',
    joinedAt: new Date('2024-09-10'),
  },
]

const mockTopics = [
  {
    id: 1,
    classId: 1,
    title: 'Introducción al Álgebra',
    description: 'Conceptos básicos de variables y ecuaciones',
    order: 1,
    status: 'published',
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 2,
    classId: 1,
    title: 'Ecuaciones Lineales',
    description: 'Resolución de ecuaciones de primer grado',
    order: 2,
    status: 'published',
    createdAt: new Date('2024-09-05'),
  },
  {
    id: 3,
    classId: 1,
    title: 'Geometría Básica',
    description: 'Figuras geométricas y sus propiedades',
    order: 3,
    status: 'published',
    createdAt: new Date('2024-09-08'),
  },
  {
    id: 4,
    classId: 2,
    title: 'Culturas Precolombinas',
    description: 'Tiwanaku y otras civilizaciones andinas',
    order: 1,
    status: 'published',
    createdAt: new Date('2024-08-16'),
  },
  {
    id: 5,
    classId: 2,
    title: 'Conquista Española',
    description: 'La llegada de los españoles a América',
    order: 2,
    status: 'published',
    createdAt: new Date('2024-08-20'),
  },
]

const mockNotes = [
  {
    id: 1,
    topicId: 1,
    title: 'Introducción al Álgebra',
    content: `# Introducción al Álgebra

## ¿Qué es el Álgebra?

El álgebra es una rama de las matemáticas que utiliza **variables** (como x, y, z) para representar números desconocidos en ecuaciones y expresiones.

## Conceptos Clave

### Variables
- Las variables son letras que representan números
- Ejemplo: x, y, z, a, b, c

### Constantes
- Los números que no cambian
- Ejemplo: 2, 5, -3, 10

### Expresiones Algebraicas
Una expresión algebraica combina variables y constantes con operaciones matemáticas.

**Ejemplos:**
- 3x + 5
- 2y - 7
- x² + 4x + 3

## Operaciones Básicas

1. **Suma:** x + y
2. **Resta:** x - y  
3. **Multiplicación:** x × y o xy
4. **División:** x ÷ y o x/y

## Ejercicios Prácticos

**Problema 1:** Si x = 3, ¿cuál es el valor de 2x + 5?
**Solución:** 2(3) + 5 = 6 + 5 = 11

**Problema 2:** Si y = 4, ¿cuál es el valor de 3y - 2?
**Solución:** 3(4) - 2 = 12 - 2 = 10`,
    aiProcessed: true,
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 2,
    topicId: 2,
    title: 'Ecuaciones Lineales',
    content: `# Ecuaciones Lineales

## Definición

Una ecuación lineal es una ecuación algebraica en la que cada término es una constante o el producto de una constante por una variable elevada a la primera potencia.

## Forma General

La forma general de una ecuación lineal con una variable es:
**ax + b = 0**

Donde:
- a y b son constantes
- x es la variable
- a ≠ 0

## Pasos para Resolver

### 1. Aislar la variable
- Mover todos los términos con la variable a un lado
- Mover todas las constantes al otro lado

### 2. Simplificar
- Combinar términos semejantes
- Dividir por el coeficiente de la variable

## Ejemplos Resueltos

### Ejemplo 1: 2x + 3 = 11
1. Restar 3 de ambos lados: 2x = 8
2. Dividir por 2: x = 4

### Ejemplo 2: 5x - 7 = 13
1. Sumar 7 a ambos lados: 5x = 20
2. Dividir por 5: x = 4

### Ejemplo 3: 3x + 4 = x + 10
1. Restar x de ambos lados: 2x + 4 = 10
2. Restar 4 de ambos lados: 2x = 6
3. Dividir por 2: x = 3

## Verificación

Siempre verifica tu respuesta sustituyendo el valor encontrado en la ecuación original.`,
    aiProcessed: true,
    createdAt: new Date('2024-09-05'),
  },
]

const mockQuestions = [
  {
    id: 1,
    topicId: 1,
    question: '¿Qué es una variable en álgebra?',
    options: [
      'Un número que nunca cambia',
      'Una letra que representa un número desconocido',
      'Solo las letras x, y, z',
      'Un símbolo matemático',
    ],
    correctAnswer: 1,
    explanation:
      'Una variable es una letra que representa un número desconocido o que puede cambiar de valor.',
  },
  {
    id: 2,
    topicId: 1,
    question: 'Si x = 5, ¿cuál es el valor de 3x + 2?',
    options: ['15', '17', '13', '10'],
    correctAnswer: 1,
    explanation: '3(5) + 2 = 15 + 2 = 17',
  },
  {
    id: 3,
    topicId: 1,
    question: '¿Cuál de estas es una expresión algebraica?',
    options: ['5 + 3', '2x - 7', '10', '4 × 2'],
    correctAnswer: 1,
    explanation:
      '2x - 7 es una expresión algebraica porque contiene una variable (x) combinada con constantes.',
  },
]

const chatHistory = new Map()

// Student router
const studentRouter = {
  // Story-13: Get student's joined classes
  getClasses: publicProcedure.query(() => {
    return mockClasses
  }),

  // Story-14: Join a class with code
  joinClass: publicProcedure
    .input(z.object({ code: z.string() }))
    .mutation(({ input }) => {
      const existingClass = mockClasses.find((c) => c.code === input.code)
      if (existingClass) {
        return { success: true, class: existingClass }
      }
      return { success: false, error: 'Código de clase no válido' }
    }),

  // Story-15: Get topics for a class
  getTopics: publicProcedure
    .input(z.object({ classId: z.number() }))
    .query(({ input }) => {
      return mockTopics.filter((topic) => topic.classId === input.classId)
    }),

  // Story-16: Get notes for a topic
  getNotes: publicProcedure
    .input(z.object({ topicId: z.number() }))
    .query(({ input }) => {
      return mockNotes.find((note) => note.topicId === input.topicId)
    }),

  // Story-17 & 18: AI Tutor chat scoped to topic
  askTutor: publicProcedure
    .input(
      z.object({
        topicId: z.number(),
        question: z.string(),
        chatId: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const topic = mockTopics.find((t) => t.id === input.topicId)

      if (!chatHistory.has(input.chatId)) {
        chatHistory.set(input.chatId, [])
      }

      const history = chatHistory.get(input.chatId)

      // Mock AI responses based on topic
      let response = ''
      const question = input.question.toLowerCase()

      if (input.topicId === 1) {
        // Álgebra
        if (question.includes('variable')) {
          response =
            'Una variable en álgebra es una letra (como x, y, z) que representa un número desconocido. Por ejemplo, en la expresión 3x + 5, la "x" es una variable que puede tomar diferentes valores.'
        } else if (
          question.includes('ecuación') ||
          question.includes('resolver')
        ) {
          response =
            'Para resolver una ecuación algebraica, debes aislar la variable. Por ejemplo, en 2x + 3 = 11, restas 3 de ambos lados (2x = 8) y luego divides por 2 (x = 4).'
        } else if (question.includes('expresión')) {
          response =
            'Una expresión algebraica combina variables y números con operaciones matemáticas. Por ejemplo: 3x + 5, 2y - 7, o x² + 4x + 3.'
        } else {
          response = `Basándome en el tema "${topic?.title}", puedo ayudarte con conceptos de álgebra como variables, constantes, expresiones algebraicas y operaciones básicas. ¿Qué aspecto específico te gustaría que explique?`
        }
      } else if (input.topicId === 2) {
        // Ecuaciones lineales
        if (question.includes('lineal')) {
          response =
            'Una ecuación lineal es una ecuación donde la variable está elevada solo a la primera potencia. Su forma general es ax + b = 0. Por ejemplo: 2x + 3 = 11.'
        } else if (
          question.includes('resolver') ||
          question.includes('pasos')
        ) {
          response =
            'Para resolver ecuaciones lineales: 1) Mueve todos los términos con variables a un lado, 2) Mueve las constantes al otro lado, 3) Simplifica y despeja la variable.'
        } else {
          response = `Basándome en el tema "${topic?.title}", puedo explicarte sobre ecuaciones lineales, sus formas, y métodos de resolución. ¿Qué aspecto específico necesitas aclarar?`
        }
      } else {
        response = `Basándome en el contenido del tema "${topic?.title}", estoy aquí para ayudarte con preguntas específicas sobre este material. ¿Qué te gustaría saber?`
      }

      const userMessage = {
        type: 'user',
        content: input.question,
        timestamp: new Date(),
      }
      const aiMessage = { type: 'ai', content: response, timestamp: new Date() }

      history.push(userMessage, aiMessage)

      return {
        response,
        chatHistory: history,
      }
    }),

  // Get chat history
  getChatHistory: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(({ input }) => {
      return chatHistory.get(input.chatId) || []
    }),

  // Story-19: Generate practice questions
  generateQuiz: publicProcedure
    .input(z.object({ topicId: z.number() }))
    .mutation(({ input }) => {
      const questions = mockQuestions.filter((q) => q.topicId === input.topicId)
      return {
        topicId: input.topicId,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options,
        })),
      }
    }),

  // Story-20: Submit quiz and get feedback
  submitQuiz: publicProcedure
    .input(
      z.object({
        topicId: z.number(),
        answers: z.array(
          z.object({
            questionId: z.number(),
            selectedAnswer: z.number(),
          }),
        ),
      }),
    )
    .mutation(({ input }) => {
      const questions = mockQuestions.filter((q) => q.topicId === input.topicId)
      const results = input.answers.map((answer) => {
        const question = questions.find((q) => q.id === answer.questionId)
        const isCorrect = question?.correctAnswer === answer.selectedAnswer

        return {
          questionId: answer.questionId,
          isCorrect,
          correctAnswer: question?.correctAnswer,
          explanation: question?.explanation,
        }
      })

      const score = results.filter((r) => r.isCorrect).length
      const total = results.length

      return {
        score,
        total,
        percentage: Math.round((score / total) * 100),
        results,
      }
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
  student: studentRouter,
})
export type TRPCRouter = typeof trpcRouter
