import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/AdminLayout'

export const Route = createFileRoute('/admin-teacher/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'Matemáticas Básicas con IA',
      description:
        'Curso adaptativo de matemáticas potenciado por inteligencia artificial',
      category: 'Matemáticas',
      level: 'Básico',
      students: 234,
      completion: 87,
      status: 'Activo',
      aiFeatures: [
        'Ejercicios adaptativos',
        'Retroalimentación inmediata',
        'Detección de patrones',
      ],
      lastUpdated: '2025-09-01',
    },
    {
      id: 2,
      title: 'Comprensión Lectora Inteligente',
      description: 'Desarrollo de habilidades de lectura con análisis de IA',
      category: 'Lenguaje',
      level: 'Intermedio',
      students: 189,
      completion: 72,
      status: 'Activo',
      aiFeatures: [
        'Análisis de comprensión',
        'Vocabulario adaptativo',
        'Recomendaciones personalizadas',
      ],
      lastUpdated: '2025-08-28',
    },
    {
      id: 3,
      title: 'Ciencias Naturales Interactivas',
      description: 'Exploración científica con simulaciones de IA',
      category: 'Ciencias',
      level: 'Intermedio',
      students: 156,
      completion: 65,
      status: 'En Desarrollo',
      aiFeatures: [
        'Simulaciones virtuales',
        'Experimentos adaptativos',
        'Análisis predictivo',
      ],
      lastUpdated: '2025-08-15',
    },
    {
      id: 4,
      title: 'Historia de Bolivia con IA',
      description: 'Aprendizaje inmersivo de la historia boliviana',
      category: 'Historia',
      level: 'Avanzado',
      students: 98,
      completion: 91,
      status: 'Activo',
      aiFeatures: [
        'Narrativas adaptativas',
        'Líneas de tiempo inteligentes',
        'Contexto cultural',
      ],
      lastUpdated: '2025-09-05',
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-base-content sm:truncate sm:text-3xl sm:tracking-tight">
              Gestión de Cursos
            </h2>
            <p className="text-sm text-base-content/70">
              Administra cursos, configura IA y monitorea el rendimiento
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
                  d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              Importar Curso
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Crear Curso
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Cursos</div>
              <div className="stat-value text-primary">156</div>
              <div className="stat-desc">↗︎ 8 nuevos este mes</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Cursos Activos</div>
              <div className="stat-value text-success">142</div>
              <div className="stat-desc">91% del total</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Con IA Avanzada</div>
              <div className="stat-value text-accent">89</div>
              <div className="stat-desc">63% mejorados</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Tasa Completación</div>
              <div className="stat-value text-info">78%</div>
              <div className="stat-desc">↗︎ 12% mejora</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex gap-2">
                <select className="select select-bordered">
                  <option disabled selected>
                    Categoría
                  </option>
                  <option>Matemáticas</option>
                  <option>Lenguaje</option>
                  <option>Ciencias</option>
                  <option>Historia</option>
                </select>
                <select className="select select-bordered">
                  <option disabled selected>
                    Nivel
                  </option>
                  <option>Básico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
                <select className="select select-bordered">
                  <option disabled selected>
                    Estado
                  </option>
                  <option>Activo</option>
                  <option>En Desarrollo</option>
                  <option>Pausado</option>
                </select>
                <button className="btn btn-neutral">Filtrar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card bg-base-200 shadow hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-3">
                  <div
                    className={`badge ${
                      course.status === 'Activo'
                        ? 'badge-success'
                        : course.status === 'En Desarrollo'
                          ? 'badge-warning'
                          : 'badge-error'
                    }`}
                  >
                    {course.status}
                  </div>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-xs">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>Ver Detalles</a>
                      </li>
                      <li>
                        <a>Editar</a>
                      </li>
                      <li>
                        <a>Configurar IA</a>
                      </li>
                      <li>
                        <a>Duplicar</a>
                      </li>
                      <li>
                        <a>Exportar</a>
                      </li>
                      <li>
                        <a className="text-error">Eliminar</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="card-title text-lg">{course.title}</h3>
                <p className="text-sm text-base-content/70 mb-3">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="badge badge-outline">{course.category}</div>
                  <div className="badge badge-outline">{course.level}</div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Estudiantes</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completación</span>
                    <span className="font-semibold">{course.completion}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={course.completion}
                    max="100"
                  ></progress>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">
                    Características de IA:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {course.aiFeatures.map((feature, index) => (
                      <div key={index} className="badge badge-primary badge-sm">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-actions justify-between items-center">
                  <span className="text-xs text-base-content/50">
                    Actualizado: {course.lastUpdated}
                  </span>
                  <div className="flex gap-2">
                    <button className="btn btn-primary btn-sm">Editar</button>
                    <button className="btn btn-secondary btn-sm">Ver</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Course Builder CTA */}
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
          <div className="card-body text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              ¿Necesitas crear un curso con IA?
            </h3>
            <p className="mb-6">
              Usa nuestro generador automático de cursos potenciado por
              inteligencia artificial
            </p>
            <button className="btn btn-neutral">
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
              Generar Curso con IA
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
