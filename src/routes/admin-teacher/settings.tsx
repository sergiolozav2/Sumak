import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/admin-layout'

export const Route = createFileRoute('/admin-teacher/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-base-content text-2xl leading-7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
              Configuración
            </h2>
            <p className="text-base-content/70 text-sm">
              Configuración general de la plataforma, IA y preferencias del
              sistema
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Guardar Cambios
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <ul className="menu bg-base-200 rounded-box">
                  <li>
                    <a className="active">General</a>
                  </li>
                  <li>
                    <a>Configuración de IA</a>
                  </li>
                  <li>
                    <a>Usuarios y Permisos</a>
                  </li>
                  <li>
                    <a>Integrations</a>
                  </li>
                  <li>
                    <a>Notificaciones</a>
                  </li>
                  <li>
                    <a>Seguridad</a>
                  </li>
                  <li>
                    <a>Backup y Restauración</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Settings Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* General Settings */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Configuración General</h3>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Nombre de la Plataforma
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Sumak IA"
                      className="input input-bordered w-full"
                      defaultValue="Sumak IA"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Descripción</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Descripción de la plataforma"
                      defaultValue="Plataforma educativa con inteligencia artificial para América Latina"
                    ></textarea>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Zona Horaria</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option disabled>Seleccionar zona horaria</option>
                      <option selected>GMT-4 (La Paz, Bolivia)</option>
                      <option>GMT-5 (Lima, Perú)</option>
                      <option>GMT-3 (Buenos Aires, Argentina)</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Idioma por Defecto</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option selected>Español</option>
                      <option>Quechua</option>
                      <option>Aymara</option>
                      <option>Inglés</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Configuration */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Configuración de IA</h3>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        Habilitar Adaptación Automática
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        Predicción de Deserción
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-warning"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        Generación Automática de Contenido
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-secondary"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Nivel de Agresividad de IA
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="range range-primary"
                    />
                    <div className="flex w-full justify-between px-2 text-xs">
                      <span>Conservador</span>
                      <span>Moderado</span>
                      <span>Agresivo</span>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Frecuencia de Análisis (horas)
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="24"
                      className="input input-bordered w-full"
                      defaultValue="24"
                      min="1"
                      max="168"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Settings */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Configuración de Rendimiento</h3>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Máximo de Estudiantes por Sesión
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="input input-bordered w-full"
                      defaultValue="100"
                      min="10"
                      max="1000"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Cache de Contenido (días)
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="7"
                      className="input input-bordered w-full"
                      defaultValue="7"
                      min="1"
                      max="30"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Compresión de Datos</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        Modo de Bajo Ancho de Banda
                      </span>
                      <input type="checkbox" className="toggle toggle-info" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Configuración de Notificaciones</h3>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Alertas de Deserción</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-error"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Reportes Semanales</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        Notificaciones de Sistema
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-neutral"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Email para Alertas Críticas
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="admin@sumak.edu"
                      className="input input-bordered w-full"
                      defaultValue="admin@sumak.edu"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Configuración de Seguridad</h3>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        Autenticación de Dos Factores
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Tiempo de Sesión (minutos)
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="480"
                      className="input input-bordered w-full"
                      defaultValue="480"
                      min="30"
                      max="1440"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Intentos de Login Máximos
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      className="input input-bordered w-full"
                      defaultValue="5"
                      min="3"
                      max="10"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Logging de Actividades</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-secondary"
                        checked
                        readOnly
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="card bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-white">Estado del Sistema</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm opacity-75">
                      Última Actualización
                    </div>
                    <div className="text-lg font-bold">2025-09-08 14:32</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Versión</div>
                    <div className="text-lg font-bold">v2.3.1</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Uptime</div>
                    <div className="text-lg font-bold">99.8%</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Usuarios Activos</div>
                    <div className="text-lg font-bold">1,247</div>
                  </div>
                </div>
                <div className="card-actions mt-4 justify-end">
                  <button className="btn btn-neutral">Ver Logs</button>
                  <button className="btn btn-secondary">Backup Ahora</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
