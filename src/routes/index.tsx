import { createFileRoute, Link } from '@tanstack/react-router'
import {
  BookOpen,
  Brain,
  Users,
  CheckCircle,
  Play,
  Lightbulb,
  Target,
  Globe,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Zap,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-gradient-to-r from-[#59BAFF] to-purple-600 p-2 text-white">
                <img src="/logo.png" alt="Sumak AI Logo" className="h-8 w-8" />
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                Sumak AI
              </span>
            </div>

            <nav className="hidden items-center space-x-8 md:flex">
              <a
                href="#features"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Características
              </a>
              <a
                href="#benefits"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Beneficios
              </a>
              <a
                href="#pricing"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Precios
              </a>
              <a
                href="#faq"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                FAQ
              </a>
              <Link
                to="/login"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-white transition-all hover:shadow-lg"
              >
                Comenzar Ahora
              </Link>
            </nav>

            <div className="md:hidden">
              <button className="text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800">
                  🚀 Revolucionando la educación en América Latina
                </div>
                <h1 className="text-5xl leading-tight font-bold text-gray-900 lg:text-6xl">
                  El futuro de la
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}
                    educación{' '}
                  </span>
                  está aquí
                </h1>
                <p className="text-xl leading-relaxed text-gray-600">
                  Plataforma de aprendizaje con IA que personaliza la educación
                  para cada estudiante, rompiendo el ciclo de pobreza a través
                  de experiencias inmersivas y relevantes.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-xl">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo Gratuito
                </button>
                <button className="rounded-lg border-2 border-indigo-600 px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white">
                  Solicitar Información
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">15%</div>
                  <div className="text-sm text-gray-500">
                    Crecimiento anual EdTech
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">$11B</div>
                  <div className="text-sm text-gray-500">
                    Mercado global EdTech
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">70%</div>
                  <div className="text-sm text-gray-500">
                    Estudiantes con dificultades
                  </div>
                </div>
              </div>
            </div>

            <div className="text-base-100 relative">
              <div className="rotate-3 transform rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 transition-transform duration-300 hover:rotate-0">
                <div className="space-y-4 rounded-xl bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <BookOpen className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">María, 12 años</div>
                        <div className="text-sm text-gray-500">
                          Matemáticas Nivel 6
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-green-600">95%</div>
                  </div>
                  <div className="rounded-lg bg-gray-100 p-4">
                    <div className="mb-2 text-sm font-medium">
                      Progreso de hoy:
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fracciones</span>
                        <span className="text-green-600">✓ Completado</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Problemas de la vida real</span>
                        <span className="text-yellow-600">⏳ En progreso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 animate-bounce rounded-full bg-yellow-400 p-4">
                <Lightbulb className="h-6 w-6 text-yellow-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              La crisis educativa que enfrentamos
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              En América Latina, la educación tradicional no responde a las
              necesidades de nuestros estudiantes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-red-100 bg-red-50 p-8">
              <div className="mb-4 text-red-600">
                <TrendingUp className="h-12 w-12" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-red-800">
                70% de estudiantes
              </h3>
              <p className="text-red-700">
                tienen dificultades graves para leer en primaria, creando una
                base débil para todo su aprendizaje futuro.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-8">
              <div className="mb-4 text-orange-600">
                <Target className="h-12 w-12" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-orange-800">
                80% no resuelve
              </h3>
              <p className="text-orange-700">
                problemas matemáticos básicos, limitando sus oportunidades
                futuras en un mundo cada vez más tecnológico.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-8">
              <div className="mb-4 text-purple-600">
                <Heart className="h-12 w-12" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-purple-800">
                Ciclo de pobreza
              </h3>
              <p className="text-purple-700">
                La deserción escolar alimenta la pobreza, creando un círculo
                vicioso que se perpetúa por generaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Características revolucionarias
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Tecnología de vanguardia al servicio de una educación
              personalizada y efectiva
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-3 text-white">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                IA Personalizada
              </h3>
              <p className="mb-6 text-gray-600">
                Tutor inteligente que se adapta al ritmo, estilo de aprendizaje
                y emociones de cada estudiante en tiempo real.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Análisis de patrones de aprendizaje
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Ajuste automático de dificultad
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Recomendaciones personalizadas
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-green-500 to-teal-500 p-3 text-white">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Experiencias Inmersivas
              </h3>
              <p className="mb-6 text-gray-600">
                Universos de aprendizaje que convierten cada lección en una
                aventura memorable y significativa.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Escape rooms educativos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Simulaciones interactivas
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Gamificación avanzada
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3 text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Pedagogías Integradas
              </h3>
              <p className="mb-6 text-gray-600">
                Combinamos lo mejor de Montessori, Waldorf y Reggio Emilia con
                tecnología de última generación.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Aprendizaje basado en proyectos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Conexión con la realidad
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Desarrollo de habilidades blandas
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 text-white">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Accesibilidad Total
              </h3>
              <p className="mb-6 text-gray-600">
                Diseñado para funcionar en cualquier dispositivo y condición de
                conectividad, sin excluir a nadie.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Modo offline disponible
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Optimizado para móviles
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Soporte multilenguaje
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Analytics Avanzados
              </h3>
              <p className="mb-6 text-gray-600">
                Información detallada y actionable para educadores, padres y
                administradores educativos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Reportes de progreso en tiempo real
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Predicción de riesgos académicos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Insights pedagógicos
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-3 text-white">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Integración Escolar
              </h3>
              <p className="mb-6 text-gray-600">
                Se integra perfectamente con el currículo existente y las
                políticas educativas nacionales.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Compatible con currículos oficiales
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Capacitación para docentes
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Soporte técnico continuo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Impacto transformador demostrado
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Resultados que van más allá de las calificaciones: cambiamos vidas
              y comunidades enteras
            </p>
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Para Estudiantes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Reducción del 40% en deserción escolar
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Mejora del 60% en comprensión lectora
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Desarrollo de habilidades del siglo XXI
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Mayor motivación y autoestima
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Para Educadores
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Reducción del 70% en tareas administrativas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Insights detallados sobre cada estudiante
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Herramientas de diferenciación automática
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Renovación de la pasión por enseñar
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Para Instituciones
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Mejora en rankings educativos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Optimización de recursos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Mayor satisfacción de padres
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Innovación y diferenciación
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-white">
                <h4 className="mb-4 text-3xl font-bold">Impacto Regional</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">50K+</div>
                    <div className="text-indigo-100">
                      Estudiantes impactados
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">200+</div>
                    <div className="text-indigo-100">Escuelas aliadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">85%</div>
                    <div className="text-indigo-100">Satisfacción docente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">5</div>
                    <div className="text-indigo-100">Países presentes</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                <h5 className="mb-2 font-bold text-yellow-800">
                  Caso de Éxito:
                </h5>
                <p className="text-sm text-yellow-700">
                  "En la Escuela San Martín de La Paz, la deserción bajó del 35%
                  al 12% en un año. Los estudiantes ahora ven las matemáticas
                  como un juego, no como una tortura."
                </p>
                <div className="mt-2 text-sm font-medium text-yellow-600">
                  - Directora María Gonzales
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              ¿Por qué elegir Eduverso Inteligente?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Comparamos nuestra solución con las alternativas tradicionales y
              digitales
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full overflow-hidden rounded-2xl bg-white shadow-lg">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Característica</th>
                  <th className="px-6 py-4 text-center">
                    Educación Tradicional
                  </th>
                  <th className="px-6 py-4 text-center">Otras Plataformas</th>
                  <th className="bg-indigo-700 px-6 py-4 text-center">
                    Eduverso Inteligente
                  </th>
                </tr>
              </thead>
              <tbody className="text-primary divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Personalización</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Una talla para todos
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Limitada
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ 100% Personalizada con IA
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Accesibilidad</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Presencial únicamente
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Requiere internet
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Online y offline
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Relevancia cultural</td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Currículo estándar
                  </td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Contenido extranjero
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Adaptado a LATAM
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Soporte docente</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Recursos limitados
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Auto-servicio
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Capacitación completa
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Costo</td>
                  <td className="px-6 py-4 text-center text-green-600">
                    ✅ Público gratuito
                  </td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Muy costoso
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Accesible y escalable
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Planes diseñados para cada necesidad
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Desde escuelas rurales hasta sistemas educativos completos
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Plan Escuela */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-colors hover:border-indigo-300">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Escuela
                </h3>
                <p className="mb-4 text-gray-600">
                  Perfecto para instituciones individuales
                </p>
                <div className="text-4xl font-bold text-gray-900">$2</div>
                <div className="text-gray-500">por estudiante/mes</div>
              </div>

              <ul className="text-base-100 mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Hasta 500 estudiantes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>IA personalizada básica</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Reportes estándar</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Soporte por email</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Capacitación online</span>
                </li>
              </ul>

              <button className="w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-200">
                Empezar Prueba Gratuita
              </button>
            </div>

            {/* Plan Distrito - Destacado */}
            <div className="scale-105 transform rounded-2xl bg-gradient-to-b from-indigo-600 to-purple-600 p-8 text-white shadow-2xl">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-block rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-yellow-800">
                  Más Popular
                </div>
                <h3 className="mb-2 text-2xl font-bold">Distrito</h3>
                <p className="mb-4 text-indigo-100">
                  Para redes educativas y distritos
                </p>
                <div className="text-4xl font-bold">$1.5</div>
                <div className="text-indigo-200">por estudiante/mes</div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Hasta 5,000 estudiantes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>IA personalizada avanzada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Analytics avanzados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Soporte prioritario 24/7</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Capacitación presencial</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Integración con SIS</span>
                </li>
              </ul>

              <button className="w-full rounded-lg bg-white py-3 font-semibold text-indigo-600 transition-colors hover:bg-gray-50">
                Solicitar Demo
              </button>
            </div>

            {/* Plan Nacional */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-colors hover:border-purple-300">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Nacional
                </h3>
                <p className="mb-4 text-gray-600">
                  Para ministerios y sistemas nacionales
                </p>
                <div className="text-4xl font-bold text-gray-900">
                  Personalizado
                </div>
                <div className="text-gray-500">según volumen</div>
              </div>

              <ul className="text-base-100 mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Estudiantes ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>IA completamente personalizada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Dashboard gubernamental</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Soporte dedicado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Implementación guiada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Cumplimiento regulatorio</span>
                </li>
              </ul>

              <button className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-colors hover:bg-purple-700">
                Contactar Ventas
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center rounded-full bg-green-100 px-6 py-3 text-green-800">
              <CheckCircle className="mr-2 h-5 w-5" />
              30 días de prueba gratuita • Sin tarjeta de crédito • Soporte
              incluido
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Preguntas frecuentes
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Resolvemos las dudas más comunes sobre nuestra plataforma
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {[
              {
                question: '¿Cómo funciona la IA personalizada?',
                answer:
                  'Nuestra IA analiza continuamente el comportamiento, progreso y patrones de aprendizaje de cada estudiante. Utiliza algoritmos de machine learning para adaptar la dificultad, el estilo de presentación y el ritmo de las lecciones en tiempo real. También considera factores emocionales y de motivación para mantener a los estudiantes comprometidos.',
              },
              {
                question: '¿Qué pasa si no tenemos buena conexión a internet?',
                answer:
                  'Eduverso Inteligente está diseñado para funcionar en modo offline. Los estudiantes pueden descargar contenido previamente y trabajar sin conexión. Cuando se restablece la conexión, todos los datos se sincronizan automáticamente. También optimizamos el contenido para conexiones lentas.',
              },
              {
                question: '¿Los docentes necesitan capacitación especial?',
                answer:
                  'Proporcionamos capacitación completa adaptada al nivel tecnológico de cada docente. Incluye tutoriales interactivos, sesiones presenciales, documentación detallada y soporte continuo. La mayoría de los docentes se sienten cómodos usando la plataforma en menos de una semana.',
              },
              {
                question: '¿Cómo se integra con el currículo oficial?',
                answer:
                  'Trabajamos estrechamente con ministerios de educación para asegurar que todo el contenido esté alineado con los currículos nacionales. La plataforma es flexible y puede adaptarse a diferentes sistemas educativos, estándares y regulaciones locales.',
              },
              {
                question: '¿Qué datos se recopilan sobre los estudiantes?',
                answer:
                  'Recopilamos únicamente datos educativos necesarios para personalizar el aprendizaje: progreso académico, patrones de estudio, y preferencias de aprendizaje. Todos los datos están encriptados, cumplimos con GDPR y regulaciones locales de privacidad. Los datos nunca se venden a terceros.',
              },
              {
                question: '¿Cuánto tiempo toma ver resultados?',
                answer:
                  'Los primeros indicadores de mejora suelen verse en 2-4 semanas: mayor engagement y motivación. Los resultados académicos medibles generalmente aparecen en 2-3 meses. Los impactos más profundos en deserción y habilidades blandas se observan después de 6 meses de uso constante.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            El futuro de la educación comienza hoy
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-indigo-100 lg:text-2xl">
            Únete a la revolución educativa que está transformando vidas en
            América Latina. Cada día que esperamos, más estudiantes abandonan
            sus sueños.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-gray-100">
              <Play className="mr-2 h-5 w-5" />
              Comenzar Prueba Gratuita
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-indigo-600">
              Agendar Demo Personalizada
            </button>
          </div>

          <div className="space-y-2 text-center text-indigo-200">
            <p>✅ 30 días gratis • ✅ Sin compromiso • ✅ Soporte incluido</p>
            <p className="text-sm">
              Más de 200 escuelas ya confían en nosotros
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="max-w-14 rounded-lg bg-gradient-to-r from-[#59BAFF] to-purple-600 p-2">
                  <img src="/logo.png" />
                </div>
                <span className="text-xl font-bold">Sumak AI</span>
              </div>
              <p className="text-gray-400">
                Transformando la educación en América Latina a través de la
                inteligencia artificial y experiencias de aprendizaje
                personalizadas.
              </p>
              <div className="flex space-x-4">
                <button className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700">
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700">
                  <Mail className="h-5 w-5" />
                </button>
                <button className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700">
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Casos de éxito
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Soporte
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Eduverso Inteligente. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-sm">
              Hecho con ❤️ para transformar la educación en América Latina
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
