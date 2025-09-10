import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/admin-layout'

export const Route = createFileRoute('/admin-teacher/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="hero from-primary to-secondary text-primary-content rounded-lg bg-gradient-to-r shadow-xl">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">¡Bienvenido!</h1>
              <p className="py-6">
                Bienvenido al Panel de Administración de Sumak IA. Aquí puedes
                gestionar estudiantes, cursos y configurar la inteligencia
                artificial.
              </p>
              <button className="btn btn-neutral">Comenzar Tour</button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Estudiantes Activos Hoy</div>
              <div className="stat-value text-primary">892</div>
              <div className="stat-desc">↗︎ 15% más que ayer</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Sesiones IA Completadas</div>
              <div className="stat-value text-secondary">1,456</div>
              <div className="stat-desc">↗︎ 8% esta semana</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Tiempo Promedio Sesión</div>
              <div className="stat-value text-accent">42 min</div>
              <div className="stat-desc">↗︎ 3 min mejora</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Satisfacción</div>
              <div className="stat-value text-success">9.2/10</div>
              <div className="stat-desc">↗︎ 0.3 puntos</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button className="btn btn-primary btn-block">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Agregar Estudiante
                </button>
                <button className="btn btn-secondary btn-block">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Crear Curso
                </button>
                <button className="btn btn-accent btn-block">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Ver Analytics
                </button>
                <button className="btn btn-info btn-block">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Configuración
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Novedades del Sistema</h3>
              <div className="space-y-3">
                <div className="alert alert-info">
                  <svg
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm">
                    Nueva funcionalidad: Generador automático de exámenes con IA
                  </span>
                </div>
                <div className="alert alert-success">
                  <svg
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm">
                    Actualización completada: Mejor precisión en predicciones IA
                  </span>
                </div>
                <div className="alert alert-warning">
                  <svg
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.732-.833-2.502 0L5.368 15.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                  </svg>
                  <span className="text-sm">
                    Mantenimiento programado: 09/09/2025 02:00 AM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h3 className="card-title">Guía de Inicio Rápido</h3>
            <div className="steps steps-vertical lg:steps-horizontal w-full">
              <div className="step step-primary">Configurar IA</div>
              <div className="step step-primary">Agregar Estudiantes</div>
              <div className="step step-primary">Crear Cursos</div>
              <div className="step">Revisar Analytics</div>
            </div>
            <div className="mt-6">
              <p className="text-base-content/70 mb-4 text-sm">
                Sigue estos pasos para configurar completamente tu plataforma
                Sumak IA y comenzar a brindar educación personalizada a tus
                estudiantes.
              </p>
              <button className="btn btn-primary">
                Continuar Configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
