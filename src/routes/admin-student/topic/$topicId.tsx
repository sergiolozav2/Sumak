import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/admin-student/topic/$topicId')({
  component: TopicView,
})

function TopicView() {
  const { topicId } = Route.useParams()
  const trpc = useTRPC()
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [chatId] = useState(() => Math.random().toString(36).substring(7))

  // Fetch notes for this topic
  const { data: notes, isLoading: notesLoading } = useQuery(
    trpc.student.getNotes.queryOptions({ topicId: parseInt(topicId) }),
  )

  // Get topic info from mock data
  const mockTopics = [
    {
      id: 1,
      title: 'Ecuaciones Lineales',
      classId: 1,
      description: 'Fundamentos de las ecuaciones lineales',
    },
    {
      id: 2,
      title: 'La Conquista Española',
      classId: 2,
      description: 'Historia de la conquista de América',
    },
    {
      id: 3,
      title: 'Sistema Solar',
      classId: 3,
      description: 'Los planetas y el sistema solar',
    },
  ]

  const topicInfo = mockTopics.find((t) => t.id === parseInt(topicId))

  // AI Tutor mutation
  const askTutorMutation = useMutation(
    trpc.student.askTutor.mutationOptions({
      onSuccess: (response: any) => {
        setChatHistory((prev) => [
          ...prev,
          { role: 'user', content: question },
          { role: 'assistant', content: response.response },
        ])
        setQuestion('')
      },
    }),
  )

  // Generate quiz mutation
  const generateQuizMutation = useMutation(
    trpc.student.generateQuiz.mutationOptions({
      onSuccess: () => {
        setShowQuiz(true)
      },
    }),
  )

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      askTutorMutation.mutate({
        topicId: parseInt(topicId),
        question: question.trim(),
        chatId,
      })
    }
  }

  if (notesLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="flex-1">
          <button
            onClick={() =>
              (window.location.href = `/admin-student/class/${topicInfo?.classId}`)
            }
            className="btn btn-ghost btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Volver a la Clase
          </button>
          <h1 className="text-xl font-bold ml-4">{topicInfo?.title}</h1>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() =>
              generateQuizMutation.mutate({ topicId: parseInt(topicId) })
            }
            disabled={generateQuizMutation.isPending}
          >
            {generateQuizMutation.isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-1.57 1.57a2.25 2.25 0 01-1.591.659H6.862a2.25 2.25 0 01-1.591-.659L3.7 14.5m16.1 0V9.75a2.25 2.25 0 00-2.25-2.25H6.45a2.25 2.25 0 00-2.25 2.25v4.75"
                />
              </svg>
            )}
            Generar Quiz
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes Section */}
          <div className="lg:col-span-2">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{topicInfo?.title}</h2>
                    <p className="text-base-content/70">
                      {topicInfo?.description}
                    </p>
                  </div>
                </div>

                {notes && notes.content ? (
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="bg-base-100 p-6 rounded-lg border-l-4 border-primary"
                      dangerouslySetInnerHTML={{ __html: notes.content }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16 mx-auto text-base-content/50 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">
                      No hay notas disponibles
                    </h3>
                    <p className="text-base-content/70">
                      El profesor aún no ha agregado notas para este tema
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Tutor Chat */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-10 rounded-full bg-accent text-accent-content">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto my-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">Tutor IA</h3>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-base-content/60 py-8">
                      <p className="mb-2">¡Hola! Soy tu tutor de IA.</p>
                      <p className="text-sm">
                        Hazme cualquier pregunta sobre este tema y te ayudaré a
                        entender mejor.
                      </p>
                    </div>
                  ) : (
                    chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}
                      >
                        <div
                          className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-accent'}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}

                  {askTutorMutation.isPending && (
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-accent">
                        <span className="loading loading-dots loading-sm"></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Question Input */}
                <form onSubmit={handleAskQuestion} className="mt-auto">
                  <div className="join w-full">
                    <input
                      type="text"
                      placeholder="Pregúntame algo sobre este tema..."
                      className="input input-bordered join-item flex-1"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={askTutorMutation.isPending}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary join-item"
                      disabled={!question.trim() || askTutorMutation.isPending}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Modal */}
        {showQuiz && (
          <QuizModal
            topicId={parseInt(topicId)}
            onClose={() => setShowQuiz(false)}
          />
        )}
      </div>
    </div>
  )
}

function QuizModal({
  topicId,
  onClose,
}: {
  topicId: number
  onClose: () => void
}) {
  const trpc = useTRPC()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Submit quiz mutation
  const submitQuizMutation = useMutation(
    trpc.student.submitQuiz.mutationOptions({
      onSuccess: () => {
        setShowResults(true)
      },
    }),
  )

  // Load quiz on mount using mutation
  const generateQuizMutation = useMutation(
    trpc.student.generateQuiz.mutationOptions({
      onSuccess: (result) => {
        setQuiz(result)
        setIsLoading(false)
      },
    }),
  )

  useEffect(() => {
    generateQuizMutation.mutate({ topicId })
  }, [topicId])

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Submit quiz with proper format
      const submissionAnswers = quiz.questions.map((q: any, index: number) => ({
        questionId: q.id,
        selectedAnswer: q.options.indexOf(answers[index]),
      }))
      submitQuizMutation.mutate({ topicId, answers: submissionAnswers })
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <div className="flex items-center justify-center py-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">¡Quiz Completado!</h3>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-lg">Has completado el quiz exitosamente.</p>
            <p className="text-base-content/70 mt-2">
              ¡Excelente trabajo! Sigue practicando para mejorar tu comprensión.
            </p>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz || !quiz.questions || !quiz.questions.length) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Error</h3>
          <p>No se pudieron generar preguntas para este tema.</p>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Quiz de Práctica</h3>
          <div className="badge badge-primary">
            {currentQuestion + 1} de {quiz.questions.length}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">{question.question}</h4>

          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="radio radio-primary mr-3"
                />
                <span className="text-base">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion === quiz.questions.length - 1
              ? 'Finalizar'
              : 'Siguiente'}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}
