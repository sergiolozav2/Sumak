import { createFileRoute, Link } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/admin-student/class/$classId')({
  component: ClassView,
})

function ClassView() {
  const { classId } = Route.useParams()
  const trpc = useTRPC()

  // Fetch topics for this class
  const { data: topics, isLoading } = useQuery(
    trpc.student.getTopics.queryOptions({
      classId: parseInt(classId),
    }),
  )

  // Get class info from mock data (in real app, this would be a separate query)
  const mockClasses = [
    { id: 1, name: 'Matemáticas Básicas', teacher: 'Prof. García' },
    { id: 2, name: 'Historia de Bolivia', teacher: 'Prof. Mamani' },
    { id: 3, name: 'Ciencias Naturales', teacher: 'Prof. Condori' },
  ]

  const classInfo = mockClasses.find((c) => c.id === parseInt(classId))

  if (isLoading) {
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
          <Link to="/admin-student" className="btn btn-ghost btn-sm">
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
            Volver
          </Link>
          <h1 className="text-xl font-bold ml-4">{classInfo?.name}</h1>
        </div>
        <div className="flex-none">
          <div className="text-sm opacity-90">{classInfo?.teacher}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Class Header */}
        <div className="card bg-gradient-to-r from-secondary to-accent text-secondary-content mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl">{classInfo?.name}</h2>
            <p className="opacity-90">
              Explora los temas de esta clase y aprende con la ayuda de IA
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-base-content">
              Temas de la Clase
            </h3>
            <div className="badge badge-primary badge-lg">
              {topics?.length || 0} temas
            </div>
          </div>

          {topics && topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic: any, index: number) => (
                <div
                  key={topic.id}
                  className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-3">
                      <div className="badge badge-primary">
                        Tema {index + 1}
                      </div>
                      <div className="badge badge-success">Publicado</div>
                    </div>

                    <h4 className="card-title text-lg mb-2">{topic.title}</h4>
                    <p className="text-base-content/70 text-sm mb-4">
                      {topic.description}
                    </p>

                    <div className="text-xs text-base-content/50 mb-4">
                      Creado:{' '}
                      {new Date(topic.createdAt).toLocaleDateString('es-ES')}
                    </div>

                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          // For now, we'll navigate manually since the route doesn't exist yet
                          window.location.href = `/admin-student/topic/${topic.id}`
                        }}
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
                            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                          />
                        </svg>
                        Estudiar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto text-base-content/50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No hay temas disponibles
              </h3>
              <p className="text-base-content/70">
                El profesor aún no ha agregado temas a esta clase
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
