import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

type UserType = 'student' | 'teacher'
type Mode = 'login' | 'register'

function RouteComponent() {
  const [mode, setMode] = useState<Mode>('login')
  const [userType, setUserType] = useState<UserType>('student')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    institution: '',
    subject: '',
    grade: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    // Here you would typically handle the authentication logic
    console.log('Form submitted:', { mode, userType, formData })
    alert(
      `${mode === 'login' ? 'Iniciando sesión' : 'Registrando'} como ${userType === 'student' ? 'estudiante' : 'profesor'}...`,
    )
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastName: '',
      institution: '',
      subject: '',
      grade: '',
    })
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    resetForm()
  }

  return (
    <div className="from-primary/20 to-secondary/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-primary mb-2 text-3xl font-bold">Sumak AI</h1>
            <p className="text-base-content/70">
              Plataforma de educación personalizada para América Latina
            </p>
          </div>

          {/* User Type Selection */}
          <div className="tabs tabs-boxed mb-6">
            <button
              className={`tab tab-md flex-1 ${userType === 'student' ? 'tab-active' : ''}`}
              onClick={() => setUserType('student')}
            >
              <svg
                className="mr-2 h-4 w-4"
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
              Estudiante
            </button>
            <button
              className={`tab tab-md flex-1 ${userType === 'teacher' ? 'tab-active' : ''}`}
              onClick={() => setUserType('teacher')}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Profesor
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="mb-3 text-center">
            <h2 className="mb-2 text-xl font-semibold">
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <p className="text-base-content/70 text-sm">
              {mode === 'login'
                ? `Accede como ${userType === 'student' ? 'estudiante' : 'profesor'}`
                : `Regístrate como ${userType === 'student' ? 'estudiante' : 'profesor'}`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Registration fields */}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Nombre</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Apellido</span>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Tu apellido"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">
                      {userType === 'student'
                        ? 'Institución Educativa'
                        : 'Institución donde enseña'}
                    </span>
                  </div>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder={
                      userType === 'student'
                        ? 'Nombre de tu escuela/universidad'
                        : 'Nombre de la institución'
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                {userType === 'student' ? (
                  <label className="form-control flex flex-col">
                    <div className="label">
                      <span className="label-text">Grado/Nivel</span>
                    </div>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Selecciona tu grado</option>
                      <option value="primaria-1">1° Primaria</option>
                      <option value="primaria-2">2° Primaria</option>
                      <option value="primaria-3">3° Primaria</option>
                      <option value="primaria-4">4° Primaria</option>
                      <option value="primaria-5">5° Primaria</option>
                      <option value="primaria-6">6° Primaria</option>
                      <option value="secundaria-1">1° Secundaria</option>
                      <option value="secundaria-2">2° Secundaria</option>
                      <option value="secundaria-3">3° Secundaria</option>
                      <option value="secundaria-4">4° Secundaria</option>
                      <option value="secundaria-5">5° Secundaria</option>
                      <option value="universidad">Universidad</option>
                      <option value="postgrado">Postgrado</option>
                    </select>
                  </label>
                ) : (
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">
                        Materia/Área de enseñanza
                      </span>
                    </div>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Selecciona la materia</option>
                      <option value="matematicas">Matemáticas</option>
                      <option value="ciencias">Ciencias Naturales</option>
                      <option value="lenguaje">Lenguaje y Literatura</option>
                      <option value="historia">Historia y Geografía</option>
                      <option value="idiomas">Idiomas</option>
                      <option value="arte">Arte y Cultura</option>
                      <option value="educacion-fisica">Educación Física</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="multiple">Múltiples materias</option>
                      <option value="otro">Otro</option>
                    </select>
                  </label>
                )}
              </>
            )}

            {/* Email */}
            <label className="form-control flex flex-col">
              <div className="label">
                <span className="label-text">Correo electrónico</span>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                className="input input-bordered w-full"
                required
              />
            </label>

            {/* Password */}
            <label className="form-control flex flex-col">
              <div className="label">
                <span className="label-text">Contraseña</span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
                minLength={6}
              />
              {mode === 'register' && (
                <div className="label">
                  <span className="label-text-alt">Mínimo 6 caracteres</span>
                </div>
              )}
            </label>

            {/* Confirm Password (only for registration) */}
            {mode === 'register' && (
              <label className="form-control flex flex-col">
                <div className="label">
                  <span className="label-text">Confirmar contraseña</span>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            )}

            {/* Submit Button */}
            <Link to="/admin-teacher/notes" className="btn btn-primary w-full">
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Link>
          </form>

          {/* Mode Toggle Link */}
          <div className="divider">O</div>
          <div className="text-center">
            <p className="text-base-content/70 text-sm">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </p>
            <button
              onClick={toggleMode}
              className="link link-primary font-semibold"
            >
              {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="link link-neutral text-sm">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
