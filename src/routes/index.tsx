import { createFileRoute } from '@tanstack/react-router'
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
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-[#59BAFF] to-purple-600 text-white p-2 rounded-lg">
                <img src="/logo.png" alt="Sumak AI Logo" className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sumak AI
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Características
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Beneficios
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Precios
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                FAQ
              </a>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Comenzar Ahora
              </button>
            </nav>

            <div className="md:hidden">
              <button className="text-gray-600">
                <svg
                  className="w-6 h-6"
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  🚀 Revolucionando la educación en América Latina
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  El futuro de la
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}
                    educación{' '}
                  </span>
                  está aquí
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Plataforma de aprendizaje con IA que personaliza la educación
                  para cada estudiante, rompiendo el ciclo de pobreza a través
                  de experiencias inmersivas y relevantes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo Gratuito
                </button>
                <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all">
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

            <div className="relative text-base-100">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">María, 12 años</div>
                        <div className="text-sm text-gray-500">
                          Matemáticas Nivel 6
                        </div>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">95%</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">
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
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-full p-4 animate-bounce">
                <Lightbulb className="w-6 h-6 text-yellow-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              La crisis educativa que enfrentamos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En América Latina, la educación tradicional no responde a las
              necesidades de nuestros estudiantes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
              <div className="text-red-600 mb-4">
                <TrendingUp className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-3">
                70% de estudiantes
              </h3>
              <p className="text-red-700">
                tienen dificultades graves para leer en primaria, creando una
                base débil para todo su aprendizaje futuro.
              </p>
            </div>

            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
              <div className="text-orange-600 mb-4">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-orange-800 mb-3">
                80% no resuelve
              </h3>
              <p className="text-orange-700">
                problemas matemáticos básicos, limitando sus oportunidades
                futuras en un mundo cada vez más tecnológico.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
              <div className="text-purple-600 mb-4">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-3">
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
        className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Características revolucionarias
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnología de vanguardia al servicio de una educación
              personalizada y efectiva
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-lg w-fit mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                IA Personalizada
              </h3>
              <p className="text-gray-600 mb-6">
                Tutor inteligente que se adapta al ritmo, estilo de aprendizaje
                y emociones de cada estudiante en tiempo real.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Análisis de patrones de aprendizaje
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Ajuste automático de dificultad
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Recomendaciones personalizadas
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg w-fit mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Experiencias Inmersivas
              </h3>
              <p className="text-gray-600 mb-6">
                Universos de aprendizaje que convierten cada lección en una
                aventura memorable y significativa.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Escape rooms educativos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Simulaciones interactivas
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Gamificación avanzada
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-lg w-fit mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pedagogías Integradas
              </h3>
              <p className="text-gray-600 mb-6">
                Combinamos lo mejor de Montessori, Waldorf y Reggio Emilia con
                tecnología de última generación.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Aprendizaje basado en proyectos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Conexión con la realidad
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Desarrollo de habilidades blandas
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg w-fit mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Accesibilidad Total
              </h3>
              <p className="text-gray-600 mb-6">
                Diseñado para funcionar en cualquier dispositivo y condición de
                conectividad, sin excluir a nadie.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Modo offline disponible
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Optimizado para móviles
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Soporte multilenguaje
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg w-fit mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Analytics Avanzados
              </h3>
              <p className="text-gray-600 mb-6">
                Información detallada y actionable para educadores, padres y
                administradores educativos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Reportes de progreso en tiempo real
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Predicción de riesgos académicos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Insights pedagógicos
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-lg w-fit mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Integración Escolar
              </h3>
              <p className="text-gray-600 mb-6">
                Se integra perfectamente con el currículo existente y las
                políticas educativas nacionales.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Compatible con currículos oficiales
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Capacitación para docentes
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Soporte técnico continuo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Impacto transformador demostrado
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resultados que van más allá de las calificaciones: cambiamos vidas
              y comunidades enteras
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Para Estudiantes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Reducción del 40% en deserción escolar
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Mejora del 60% en comprensión lectora
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Desarrollo de habilidades del siglo XXI
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Mayor motivación y autoestima
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Para Educadores
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Reducción del 70% en tareas administrativas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Insights detallados sobre cada estudiante
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Herramientas de diferenciación automática
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Renovación de la pasión por enseñar
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Para Instituciones
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Mejora en rankings educativos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Optimización de recursos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Mayor satisfacción de padres
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">
                      Innovación y diferenciación
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-2xl">
                <h4 className="text-3xl font-bold mb-4">Impacto Regional</h4>
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

              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h5 className="font-bold text-yellow-800 mb-2">
                  Caso de Éxito:
                </h5>
                <p className="text-yellow-700 text-sm">
                  "En la Escuela San Martín de La Paz, la deserción bajó del 35%
                  al 12% en un año. Los estudiantes ahora ven las matemáticas
                  como un juego, no como una tortura."
                </p>
                <div className="text-yellow-600 text-sm mt-2 font-medium">
                  - Directora María Gonzales
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Eduverso Inteligente?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comparamos nuestra solución con las alternativas tradicionales y
              digitales
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Característica</th>
                  <th className="px-6 py-4 text-center">
                    Educación Tradicional
                  </th>
                  <th className="px-6 py-4 text-center">Otras Plataformas</th>
                  <th className="px-6 py-4 text-center bg-indigo-700">
                    Eduverso Inteligente
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-primary divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Personalización</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Una talla para todos
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Limitada
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 bg-green-50">
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
                  <td className="px-6 py-4 text-center text-green-600 bg-green-50">
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
                  <td className="px-6 py-4 text-center text-green-600 bg-green-50">
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
                  <td className="px-6 py-4 text-center text-green-600 bg-green-50">
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
                  <td className="px-6 py-4 text-center text-green-600 bg-green-50">
                    ✅ Accesible y escalable
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planes diseñados para cada necesidad
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde escuelas rurales hasta sistemas educativos completos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Plan Escuela */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Escuela
                </h3>
                <p className="text-gray-600 mb-4">
                  Perfecto para instituciones individuales
                </p>
                <div className="text-4xl font-bold text-gray-900">$2</div>
                <div className="text-gray-500">por estudiante/mes</div>
              </div>

              <ul className="space-y-3 mb-8 text-base-100">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Hasta 500 estudiantes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>IA personalizada básica</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Reportes estándar</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Soporte por email</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Capacitación online</span>
                </li>
              </ul>

              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Empezar Prueba Gratuita
              </button>
            </div>

            {/* Plan Distrito - Destacado */}
            <div className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white rounded-2xl p-8 transform scale-105 shadow-2xl">
              <div className="text-center mb-8">
                <div className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  Más Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Distrito</h3>
                <p className="text-indigo-100 mb-4">
                  Para redes educativas y distritos
                </p>
                <div className="text-4xl font-bold">$1.5</div>
                <div className="text-indigo-200">por estudiante/mes</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Hasta 5,000 estudiantes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>IA personalizada avanzada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Analytics avanzados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Soporte prioritario 24/7</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Capacitación presencial</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Integración con SIS</span>
                </li>
              </ul>

              <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Solicitar Demo
              </button>
            </div>

            {/* Plan Nacional */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-300 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nacional
                </h3>
                <p className="text-gray-600 mb-4">
                  Para ministerios y sistemas nacionales
                </p>
                <div className="text-4xl font-bold text-gray-900">
                  Personalizado
                </div>
                <div className="text-gray-500">según volumen</div>
              </div>

              <ul className="space-y-3 mb-8 text-base-100">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Estudiantes ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>IA completamente personalizada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Dashboard gubernamental</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Soporte dedicado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Implementación guiada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Cumplimiento regulatorio</span>
                </li>
              </ul>

              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Contactar Ventas
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 mr-2" />
              30 días de prueba gratuita • Sin tarjeta de crédito • Soporte
              incluido
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestra plataforma
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
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
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            El futuro de la educación comienza hoy
          </h2>
          <p className="text-xl lg:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Únete a la revolución educativa que está transformando vidas en
            América Latina. Cada día que esperamos, más estudiantes abandonan
            sus sueños.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Comenzar Prueba Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all">
              Agendar Demo Personalizada
            </button>
          </div>

          <div className="text-center text-indigo-200 space-y-2">
            <p>✅ 30 días gratis • ✅ Sin compromiso • ✅ Soporte incluido</p>
            <p className="text-sm">
              Más de 200 escuelas ya confían en nosotros
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r max-w-14 from-[#59BAFF] to-purple-600 p-2 rounded-lg">
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
                <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Casos de éxito
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Soporte
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
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
