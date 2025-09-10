import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/admin-layout'

export const Route = createFileRoute('/admin-teacher/students')({
  component: RouteComponent,
})

function RouteComponent() {
  // Mock student data
  const students = [
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@ejemplo.com',
      grade: '8vo Grado',
      status: 'Activo',
      progress: 85,
      lastActivity: '2025-09-08',
      aiInsights: 'Excelente progreso en matemáticas',
    },
    {
      id: 2,
      name: 'Carlos Mamani',
      email: 'carlos.mamani@ejemplo.com',
      grade: '7mo Grado',
      status: 'Activo',
      progress: 72,
      lastActivity: '2025-09-07',
      aiInsights: 'Necesita apoyo en comprensión lectora',
    },
    {
      id: 3,
      name: 'Ana Quispe',
      email: 'ana.quispe@ejemplo.com',
      grade: '9no Grado',
      status: 'Inactivo',
      progress: 45,
      lastActivity: '2025-09-05',
      aiInsights: 'Riesgo de deserción - intervención requerida',
    },
    {
      id: 4,
      name: 'Luis Vargas',
      email: 'luis.vargas@ejemplo.com',
      grade: '8vo Grado',
      status: 'Activo',
      progress: 93,
      lastActivity: '2025-09-08',
      aiInsights: 'Estudiante destacado - listo para contenido avanzado',
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-base-content text-2xl leading-7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
              Gestión de Estudiantes
            </h2>
            <p className="text-base-content/70 text-sm">
              Administra estudiantes, revisa su progreso y recibe insights de IA
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="btn btn-primary">
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
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Estudiantes</div>
              <div className="stat-value text-primary">1,247</div>
              <div className="stat-desc">↗︎ 12% este mes</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Estudiantes Activos</div>
              <div className="stat-value text-success">1,089</div>
              <div className="stat-desc">87% del total</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">En Riesgo</div>
              <div className="stat-value text-warning">23</div>
              <div className="stat-desc">IA detectó patrones</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Progreso Promedio</div>
              <div className="stat-value text-accent">74%</div>
              <div className="stat-desc">↗︎ 8% mejora</div>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar estudiantes..."
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex gap-2">
                <select className="select select-bordered">
                  <option disabled selected>
                    Grado
                  </option>
                  <option>7mo Grado</option>
                  <option>8vo Grado</option>
                  <option>9no Grado</option>
                </select>
                <select className="select select-bordered">
                  <option disabled selected>
                    Estado
                  </option>
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>En Riesgo</option>
                </select>
                <button className="btn btn-neutral">Filtrar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Students table */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Grado</th>
                    <th>Estado</th>
                    <th>Progreso</th>
                    <th>Última Actividad</th>
                    <th>IA Insights</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover">
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4f46e5&color=fff`}
                                alt={student.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{student.name}</div>
                            <div className="text-sm opacity-50">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{student.grade}</td>
                      <td>
                        <div
                          className={`badge ${
                            student.status === 'Activo'
                              ? 'badge-success'
                              : student.status === 'Inactivo'
                                ? 'badge-error'
                                : 'badge-warning'
                          }`}
                        >
                          {student.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <progress
                            className="progress progress-primary w-20"
                            value={student.progress}
                            max="100"
                          ></progress>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </td>
                      <td>{student.lastActivity}</td>
                      <td>
                        <div className="tooltip" data-tip={student.aiInsights}>
                          <div
                            className={`badge badge-outline ${
                              student.aiInsights.includes('Excelente')
                                ? 'badge-success'
                                : student.aiInsights.includes('Riesgo')
                                  ? 'badge-error'
                                  : 'badge-warning'
                            }`}
                          >
                            IA
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-xs">
                            <svg
                              className="h-4 w-4"
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
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                          >
                            <li>
                              <a>Ver Perfil</a>
                            </li>
                            <li>
                              <a>Editar</a>
                            </li>
                            <li>
                              <a>Ver Progreso</a>
                            </li>
                            <li>
                              <a>Configurar IA</a>
                            </li>
                            <li>
                              <a className="text-error">Suspender</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Página 1</button>
                <button className="join-item btn btn-active">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">»</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
