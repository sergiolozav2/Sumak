import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/AdminLayout'

export const Route = createFileRoute('/admin-teacher/analytics')({
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
              IA & Analytics
            </h2>
            <p className="text-sm text-base-content/70">
              Insights inteligentes y análisis predictivo del rendimiento
              académico
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
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
                  d="M12 10v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              Exportar Reporte
            </button>
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Ejecutar Análisis IA
            </button>
          </div>
        </div>

        {/* AI Performance Metrics */}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">IA Adaptaciones</div>
              <div className="stat-value text-primary">2,847</div>
              <div className="stat-desc">↗︎ 23% esta semana</div>
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
              <div className="stat-title">Predicción Precisión</div>
              <div className="stat-value text-success">94.3%</div>
              <div className="stat-desc">↗︎ 2.1% mejora</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-warning">
                <svg
                  className="inline-block w-8 h-8 stroke-current"
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
              </div>
              <div className="stat-title">Alertas Deserción</div>
              <div className="stat-value text-warning">12</div>
              <div className="stat-desc">Estudiantes en riesgo</div>
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
              <div className="stat-title">Engagement Score</div>
              <div className="stat-value text-accent">8.7/10</div>
              <div className="stat-desc">↗︎ 0.8 mejora</div>
            </div>
          </div>
        </div>

        {/* AI Insights Dashboard */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Real-time AI Insights */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Insights de IA en Tiempo Real
              </h3>
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
                  <div>
                    <h4 className="font-bold">Patrón Positivo Detectado</h4>
                    <div className="text-xs">
                      Los estudiantes de matemáticas muestran 34% más engagement
                      con ejercicios adaptativos
                    </div>
                  </div>
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
                  <div>
                    <h4 className="font-bold">Intervención Recomendada</h4>
                    <div className="text-xs">
                      12 estudiantes requieren apoyo adicional en comprensión
                      lectora
                    </div>
                  </div>
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
                  <div>
                    <h4 className="font-bold">Nuevo Insight</h4>
                    <div className="text-xs">
                      Horarios matutinos muestran 28% mejor retención de
                      información
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path Optimization */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Optimización de Rutas de Aprendizaje
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rutas Personalizadas Activas</span>
                  <span className="font-bold">1,247</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value="87"
                  max="100"
                ></progress>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Eficiencia de Adaptación</span>
                  <span className="font-bold">92%</span>
                </div>
                <progress
                  className="progress progress-secondary w-full"
                  value="92"
                  max="100"
                ></progress>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Tiempo Optimizado</span>
                  <span className="font-bold">-23%</span>
                </div>
                <progress
                  className="progress progress-accent w-full"
                  value="77"
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Dropout Prediction */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title text-error">Predicción de Deserción</h3>
              <div
                className="radial-progress text-error"
                style={{ '--value': 15 } as React.CSSProperties}
                role="progressbar"
              >
                15%
              </div>
              <p className="text-sm text-base-content/70 mt-2">
                Probabilidad promedio de deserción detectada por IA
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-error btn-sm">Ver Detalles</button>
              </div>
            </div>
          </div>

          {/* Performance Improvement */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title text-success">Mejora de Rendimiento</h3>
              <div
                className="radial-progress text-success"
                style={{ '--value': 78 } as React.CSSProperties}
                role="progressbar"
              >
                78%
              </div>
              <p className="text-sm text-base-content/70 mt-2">
                Estudiantes con mejora predicha en próximas 4 semanas
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-success btn-sm">Ver Detalles</button>
              </div>
            </div>
          </div>

          {/* Content Effectiveness */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title text-primary">
                Efectividad de Contenido
              </h3>
              <div
                className="radial-progress text-primary"
                style={{ '--value': 84 } as React.CSSProperties}
                role="progressbar"
              >
                84%
              </div>
              <p className="text-sm text-base-content/70 mt-2">
                Score de efectividad promedio del contenido generado por IA
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Optimizar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Performing Content */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Contenido Más Efectivo</h3>
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Contenido</th>
                      <th>Engagement</th>
                      <th>Retención</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Matemáticas Adaptativas</td>
                      <td>
                        <div className="badge badge-success">94%</div>
                      </td>
                      <td>
                        <div className="badge badge-primary">89%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>Lectura Interactiva</td>
                      <td>
                        <div className="badge badge-success">87%</div>
                      </td>
                      <td>
                        <div className="badge badge-primary">82%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ciencias Virtuales</td>
                      <td>
                        <div className="badge badge-warning">73%</div>
                      </td>
                      <td>
                        <div className="badge badge-secondary">75%</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Learning Patterns */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Patrones de Aprendizaje</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Horario Óptimo</span>
                  <span className="font-bold">9:00 - 11:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Duración Sesión Ideal</span>
                  <span className="font-bold">45 minutos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Frecuencia Óptima</span>
                  <span className="font-bold">4 veces/semana</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tipo Contenido Preferido</span>
                  <span className="font-bold">Interactivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Model Performance */}
        <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Estado del Modelo de IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">v2.3.1</div>
                <div className="text-sm opacity-75">Versión Actual</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.2%</div>
                <div className="text-sm opacity-75">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">152ms</div>
                <div className="text-sm opacity-75">Latencia Promedio</div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-neutral">Configurar Modelo</button>
              <button className="btn btn-secondary">Entrenar Nuevo</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
