import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/AdminLayout'

export const Route = createFileRoute('/admin-teacher/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-base-content sm:truncate sm:text-3xl sm:tracking-tight">
              Dashboard
            </h2>
            <p
              className="text-sm text-base-content/70"
              data-tip="Resumen general de la plataforma Sumak IA"
            >
              Resumen general de la plataforma Sumak IA
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  className="inline-block w-8 h-8 stroke-current"
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
              </div>
              <div className="stat-title">Estudiantes Activos</div>
              <div className="stat-value text-primary">1,247</div>
              <div className="stat-desc">↗︎ 12% más que el mes pasado</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  className="inline-block w-8 h-8 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Cursos Disponibles</div>
              <div className="stat-value text-secondary">156</div>
              <div className="stat-desc">↗︎ 8 nuevos cursos</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  className="inline-block w-8 h-8 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Tasa de Completación</div>
              <div className="stat-value text-accent">87%</div>
              <div className="stat-desc">↗︎ 5% mejora</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-success">
                <svg
                  className="inline-block w-8 h-8 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Reducción Deserción</div>
              <div className="stat-value text-success">-32%</div>
              <div className="stat-desc">Objetivo: -40%</div>
            </div>
          </div>
        </div>

        {/* Charts and recent activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Actividad Reciente</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                      <span className="text-xs font-medium">JD</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Juan Díaz completó el curso "Matemáticas Básicas con IA"
                    </p>
                    <p className="text-xs text-base-content/60">
                      Hace 2 minutos
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                      <span className="text-xs font-medium">MP</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      María Pérez inició sesión de estudio personalizada
                    </p>
                    <p className="text-xs text-base-content/60">
                      Hace 5 minutos
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-content flex items-center justify-center">
                      <span className="text-xs font-medium">CR</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Carlos Rodríguez alcanzó el 90% en comprensión lectora
                    </p>
                    <p className="text-xs text-base-content/60">
                      Hace 12 minutos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Insights de IA</h3>
              <div className="space-y-4">
                <div className="alert alert-success">
                  <svg
                    className="stroke-current shrink-0 h-6 w-6"
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
                    Los estudiantes de matemáticas muestran 23% más de
                    engagement con contenido adaptativo
                  </span>
                </div>
                <div className="alert alert-warning">
                  <svg
                    className="stroke-current shrink-0 h-6 w-6"
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
                    12 estudiantes requieren intervención por bajo rendimiento
                  </span>
                </div>
                <div className="alert alert-info">
                  <svg
                    className="stroke-current shrink-0 h-6 w-6"
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
                    Nuevo patrón detectado: Mayor retención en horarios
                    matutinos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h3 className="card-title">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button className="btn btn-primary">
                <svg
                  className="w-5 h-5 mr-2"
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
              <button className="btn btn-secondary">
                <svg
                  className="w-5 h-5 mr-2"
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
              <button className="btn btn-accent">
                <svg
                  className="w-5 h-5 mr-2"
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
                Ver Reportes
              </button>
              <button className="btn btn-info">
                <svg
                  className="w-5 h-5 mr-2"
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
                Configurar IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
