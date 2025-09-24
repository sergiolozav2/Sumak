import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

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
      alert('Passwords do not match')
      return
    }

    // Here you would typically handle the authentication logic
    console.log('Form submitted:', { mode, userType, formData })
    alert(
      `${mode === 'login' ? 'Logging in' : 'Registering'} as ${userType === 'student' ? 'student' : 'teacher'}...`,
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
      {/* Demo Toast Notification */}
      <div className="bg-info text-info-content border-info/20 fixed top-4 left-1/2 z-50 flex max-w-sm -translate-x-1/2 transform items-center gap-2 rounded-lg border px-6 py-3 shadow-lg">
        <svg
          className="h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm font-medium">
          This is a demo - only click "Sign In"
        </span>
      </div>

      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-primary mb-2 text-3xl font-bold">Sumak AI</h1>
            <p className="text-base-content/70">
              Personalized education platform for Latin America
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
              Student
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
              Teacher
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="mb-3 text-center">
            <h2 className="mb-2 text-xl font-semibold">
              {mode === 'login' ? 'Sign In' : 'Create Account'} []
            </h2>
            <p className="text-base-content/70 text-sm">
              {mode === 'login'
                ? `Access as ${userType === 'student' ? 'student' : 'teacher'}`
                : `Register as ${userType === 'student' ? 'student' : 'teacher'}`}
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
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">
                      {userType === 'student'
                        ? 'Educational Institution'
                        : 'Teaching Institution'}
                    </span>
                  </div>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder={
                      userType === 'student'
                        ? 'Name of your school/university'
                        : 'Name of the institution'
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                {userType === 'student' ? (
                  <label className="form-control flex flex-col">
                    <div className="label">
                      <span className="label-text">Grade/Level</span>
                    </div>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select your grade</option>
                      <option value="primaria-1">1st Grade</option>
                      <option value="primaria-2">2nd Grade</option>
                      <option value="primaria-3">3rd Grade</option>
                      <option value="primaria-4">4th Grade</option>
                      <option value="primaria-5">5th Grade</option>
                      <option value="primaria-6">6th Grade</option>
                      <option value="secundaria-1">7th Grade</option>
                      <option value="secundaria-2">8th Grade</option>
                      <option value="secundaria-3">9th Grade</option>
                      <option value="secundaria-4">10th Grade</option>
                      <option value="secundaria-5">11th Grade</option>
                      <option value="universidad">University</option>
                      <option value="postgrado">Graduate School</option>
                    </select>
                  </label>
                ) : (
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Subject/Teaching Area</span>
                    </div>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select subject</option>
                      <option value="matematicas">Mathematics</option>
                      <option value="ciencias">Natural Sciences</option>
                      <option value="lenguaje">Language & Literature</option>
                      <option value="historia">History & Geography</option>
                      <option value="idiomas">Languages</option>
                      <option value="arte">Arts & Culture</option>
                      <option value="educacion-fisica">
                        Physical Education
                      </option>
                      <option value="tecnologia">Technology</option>
                      <option value="multiple">Multiple subjects</option>
                      <option value="otro">Other</option>
                    </select>
                  </label>
                )}
              </>
            )}

            {/* Email */}
            <label className="form-control flex flex-col">
              <div className="label">
                <span className="label-text">Email</span>
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
                <span className="label-text">Password</span>
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
                  <span className="label-text-alt">Minimum 6 characters</span>
                </div>
              )}
            </label>

            {/* Confirm Password (only for registration) */}
            {mode === 'register' && (
              <label className="form-control flex flex-col">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
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
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Link>
          </form>

          {/* Mode Toggle Link */}
          <div className="divider">O</div>
          <div className="text-center">
            <p className="text-base-content/70 text-sm">
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <button
              onClick={toggleMode}
              className="link link-primary font-semibold"
            >
              {mode === 'login' ? 'Register here' : 'Sign in here'}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="link link-neutral text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
