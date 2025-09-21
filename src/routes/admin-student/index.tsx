import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/integrations/trpc/react'

export const Route = createFileRoute('/admin-student/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [joinCode, setJoinCode] = useState('')
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinResult, setJoinResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const trpc = useTRPC()

  // Fetch student's classes
  const { data: classes, isLoading } = useQuery(
    trpc.student.getClasses.queryOptions(),
  )

  // Join class mutation
  const joinClassMutation = useMutation(
    trpc.student.joinClass.mutationOptions({
      onSuccess: (result: any) => {
        if (result.success) {
          setJoinResult({
            success: true,
            message: `¡Te has unido exitosamente a la clase: ${result.class?.name}!`,
          })
          setJoinCode('')
          // In a real app, we'd refetch the classes here
        } else {
          setJoinResult({
            success: false,
            message: result.error || 'Error al unirse a la clase',
          })
        }
        setTimeout(() => {
          setJoinResult(null)
          setShowJoinModal(false)
        }, 3000)
      },
    }),
  )

  const handleJoinClass = () => {
    if (joinCode.trim()) {
      joinClassMutation.mutate({ code: joinCode.trim() })
    }
  }

  if (isLoading) {
    return (
      <div className="bg-base-100 flex min-h-screen items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Header */}
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Dashboard - Estudiante</h1>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-secondary"
            onClick={() => setShowJoinModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Unirse a Clase
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="hero from-primary to-secondary text-primary-content mb-8 rounded-lg bg-gradient-to-r">
          <div className="hero-content py-12 text-center">
            <div className="max-w-md">
              <h1 className="mb-4 text-4xl font-bold">¡Bienvenido!</h1>
              <p className="text-lg opacity-90">
                Explora tus clases, estudia con la IA y mejora tu aprendizaje
              </p>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-base-content text-2xl font-bold">Mis Clases</h2>
            <div className="badge badge-primary badge-lg">
              {classes?.length || 0} clases
            </div>
          </div>

          {classes && classes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem: any) => (
                <div
                  key={classItem.id}
                  className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <div className="card-body">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="card-title text-lg">{classItem.name}</h3>
                      <div className="badge badge-success">Activa</div>
                    </div>

                    <p className="text-base-content/70 mb-4">
                      {classItem.description}
                    </p>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        {classItem.teacher}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6h.008v.008H6V6z"
                          />
                        </svg>
                        Código: {classItem.code}
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          // For now, we'll navigate manually since we need to create the route
                          window.location.href = `/admin-student/class/${classItem.id}`
                        }}
                      >
                        Ver Temas
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-base-content/50 mx-auto h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                No tienes clases aún
              </h3>
              <p className="text-base-content/70 mb-4">
                Únete a una clase usando el código que te proporcione tu
                profesor
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowJoinModal(true)}
              >
                Unirse a Primera Clase
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">Unirse a una Clase</h3>

            {joinResult ? (
              <div
                className={`alert ${joinResult.success ? 'alert-success' : 'alert-error'} mb-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      joinResult.success
                        ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                    }
                  ></path>
                </svg>
                <span>{joinResult.message}</span>
              </div>
            ) : (
              <>
                <div className="form-control mb-4 w-full">
                  <label className="label">
                    <span className="label-text">Código de la clase</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: MATH101, HIST201"
                    className="input input-bordered w-full"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleJoinClass()}
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      Ingresa el código proporcionado por tu profesor
                    </span>
                  </label>
                </div>

                <div className="modal-action">
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setShowJoinModal(false)
                      setJoinCode('')
                      setJoinResult(null)
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className={`btn btn-primary ${joinClassMutation.isPending ? 'loading' : ''}`}
                    onClick={handleJoinClass}
                    disabled={!joinCode.trim() || joinClassMutation.isPending}
                  >
                    Unirse
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
