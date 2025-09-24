import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  Heart,
  Instagram,
  Lightbulb,
  Linkedin,
  MessageCircle,
  Play,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
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
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Benefits
              </a>
              <a
                href="#pricing"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Pricing
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
                Get Started
              </Link>
            </nav>

            <div className="md:hidden">
              <button
                className="cursor-pointer text-gray-600"
                onClick={toggleMobileMenu}
              >
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
                    d={
                      mobileMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <a
                  href="#features"
                  className="block rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#benefits"
                  className="block rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Benefits
                </a>
                <a
                  href="#pricing"
                  className="block rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="block rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <Link
                  to="/login"
                  className="mt-4 block rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-center text-white transition-all hover:shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
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
                  🚀 Revolutionizing education in Latin America
                </div>
                <h1 className="text-5xl leading-tight font-bold text-gray-900 lg:text-6xl">
                  The future of
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}
                    education{' '}
                  </span>
                  is here
                </h1>
                <p className="text-xl leading-relaxed text-gray-600">
                  AI-powered learning platform that personalizes education for
                  each student, breaking the cycle of poverty through immersive
                  and relevant experiences.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-xl"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Free Demo
                </Link>
                <button className="rounded-lg border-2 border-indigo-600 px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white">
                  Request Information
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">15%</div>
                  <div className="text-sm text-gray-500">Sample growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">$15B</div>
                  <div className="text-sm text-gray-500">Demo market size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">60%</div>
                  <div className="text-sm text-gray-500">
                    Learning challenges
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
                        <div className="font-semibold text-black">
                          María, 11 years old
                        </div>
                        <div className="text-sm text-gray-500">
                          Math Level 6
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-green-600">95%</div>
                  </div>
                  <div className="rounded-lg bg-gray-100 p-4 text-black">
                    <div className="mb-2 text-sm font-medium">
                      Studied today:
                    </div>
                    <div className="text-base-content space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fractions</span>
                        <span className="text-green-600">✓ Completed</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Real life problems</span>
                        <span className="text-yellow-600">⏳ In progress</span>
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
              The educational crisis we face
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              In Latin America, traditional education does not respond to our
              students' needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-red-100 bg-red-50 p-8">
              <div className="mb-4 text-red-600">
                <TrendingUp className="h-12 w-12" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-red-800">
                Many students
              </h3>
              <p className="text-red-700">
                face reading difficulties in elementary school, creating
                challenges for their future learning journey.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-8">
              <div className="mb-4 text-orange-600">
                <Target className="h-12 w-12" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-orange-800">
                Math challenges
              </h3>
              <p className="text-orange-700">
                Many students struggle with mathematical concepts, which may
                limit their opportunities in our technology-driven world.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-8">
              <div className="mb-4 text-purple-600">
                <Heart className="h-12 w-12" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-purple-800">
                Poverty cycle
              </h3>
              <p className="text-purple-700">
                School dropout feeds poverty, creating a vicious cycle that
                perpetuates for generations.
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
              Revolutionary features
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Cutting-edge technology in service of personalized and effective
              education
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-3 text-white">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Personalized AI
              </h3>
              <p className="mb-6 text-gray-600">
                Intelligent tutor that adapts to each student's pace, learning
                style, and emotions in real time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Learning pattern analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Automatic difficulty adjustment
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Personalized recommendations
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-green-500 to-teal-500 p-3 text-white">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Immersive Experiences
              </h3>
              <p className="mb-6 text-gray-600">
                Learning universes that turn every lesson into a memorable and
                meaningful adventure.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Educational escape rooms
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Interactive simulations
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Advanced gamification
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3 text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Integrated Pedagogies
              </h3>
              <p className="mb-6 text-gray-600">
                We combine the best of Montessori, Waldorf and Reggio Emilia
                with cutting-edge technology.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Project-based learning
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Connection to reality
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Soft skills development
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 text-white">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Total Accessibility
              </h3>
              <p className="mb-6 text-gray-600">
                Designed to work on any device and connectivity condition,
                without excluding anyone.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Offline mode available
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Mobile optimized
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Multilanguage support
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Advanced Analytics
              </h3>
              <p className="mb-6 text-gray-600">
                Detailed and actionable information for educators, parents and
                educational administrators.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Real-time progress reports
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Academic risk prediction
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Pedagogical insights
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 w-fit rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-3 text-white">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                School Integration
              </h3>
              <p className="mb-6 text-gray-600">
                Integrates seamlessly with existing curriculum and national
                educational policies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Compatible with official curricula
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Teacher training
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Continuous technical support
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
              Proven transformative impact
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Results that go beyond grades: we change lives and entire
              communities
            </p>
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  For Students
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Improved student engagement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Enhanced reading comprehension
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      21st century skills development
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Higher motivation and self-esteem
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  For Educators
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Streamlined administrative tasks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Detailed insights about each student
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Automatic differentiation tools
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Renewed passion for teaching
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  For Institutions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Improvement in educational rankings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Resource optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Higher parent satisfaction
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-500" />
                    <span className="text-gray-700">
                      Innovation and differentiation
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-white">
                <h4 className="mb-4 text-3xl font-bold">Demo Impact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">10K+</div>
                    <div className="text-indigo-100">Demo students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">50+</div>
                    <div className="text-indigo-100">Demo schools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">90%</div>
                    <div className="text-indigo-100">Sample satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">3</div>
                    <div className="text-indigo-100">Demo regions</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                <h5 className="mb-2 font-bold text-yellow-800">
                  Demo Success Story:
                </h5>
                <p className="text-sm text-yellow-700">
                  "Sample Elementary School saw significant improvements in
                  student engagement and learning outcomes after implementing
                  our platform."
                </p>
                <div className="mt-2 text-sm font-medium text-yellow-600">
                  - Demo Principal
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
              Why choose Sumak AI?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              We compare our solution with traditional and digital alternatives
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full overflow-hidden rounded-2xl bg-white shadow-lg">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">
                    Traditional Education
                  </th>
                  <th className="px-6 py-4 text-center">Other Platforms</th>
                  <th className="bg-indigo-700 px-6 py-4 text-center">
                    Sumak AI
                  </th>
                </tr>
              </thead>
              <tbody className="text-primary divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Personalization</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ One size fits all
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Limited
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ 100% AI Personalized
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Accessibility</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ In-person only
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Requires internet
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Online and offline
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Cultural relevance</td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Standard curriculum
                  </td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Foreign content
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Adapted to LATAM
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Teacher support</td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Limited resources
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600">
                    ⚠️ Self-service
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Complete training
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Cost</td>
                  <td className="px-6 py-4 text-center text-green-600">
                    ✅ Public free
                  </td>
                  <td className="px-6 py-4 text-center text-red-600">
                    ❌ Very expensive
                  </td>
                  <td className="bg-green-50 px-6 py-4 text-center text-green-600">
                    ✅ Accessible and scalable
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
              Plans designed for every need
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              From rural schools to complete educational systems
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Plan Escuela */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-colors hover:border-indigo-300">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  School
                </h3>
                <p className="mb-4 text-gray-600">
                  Perfect for individual institutions
                </p>
                <div className="text-4xl font-bold text-gray-900">$2</div>
                <div className="text-gray-500">per student/month</div>
              </div>

              <ul className="text-base-content mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Up to 500 students</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Basic personalized AI</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Standard reports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Online training</span>
                </li>
              </ul>

              <button className="w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-200">
                Start Free Trial
              </button>
            </div>

            {/* Plan Distrito - Destacado */}
            <div className="scale-105 transform rounded-2xl bg-gradient-to-b from-indigo-600 to-purple-600 p-8 text-white shadow-2xl">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-block rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-yellow-800">
                  Most Popular
                </div>
                <h3 className="mb-2 text-2xl font-bold">District</h3>
                <p className="mb-4 text-indigo-100">
                  For educational networks and districts
                </p>
                <div className="text-4xl font-bold">$1.5</div>
                <div className="text-indigo-200">per student/month</div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Up to 5,000 students</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Advanced personalized AI</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>Priority 24/7 support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>In-person training</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>SIS integration</span>
                </li>
              </ul>

              <button className="w-full rounded-lg bg-white py-3 font-semibold text-indigo-600 transition-colors hover:bg-gray-50">
                Request Demo
              </button>
            </div>

            {/* Plan Nacional */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-colors hover:border-purple-300">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  National
                </h3>
                <p className="mb-4 text-gray-600">
                  For ministries and national systems
                </p>
                <div className="text-4xl font-bold text-gray-900">Custom</div>
                <div className="text-gray-500">based on volume</div>
              </div>

              <ul className="text-base-content mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Unlimited students</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Fully customized AI</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Government dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Guided implementation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Regulatory compliance</span>
                </li>
              </ul>

              <button className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-colors hover:bg-purple-700">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center rounded-full bg-green-100 px-6 py-3 text-green-800">
              <CheckCircle className="mr-2 h-5 w-5" />
              30-day free trial • No credit card • Support included
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              We answer the most common questions about our platform
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {[
              {
                question: 'How does personalized AI work?',
                answer:
                  "Our AI continuously analyzes each student's behavior, progress, and learning patterns. It uses machine learning algorithms to adapt difficulty, presentation style, and lesson pace in real time. It also considers emotional and motivational factors to keep students engaged.",
              },
              {
                question:
                  "What happens if we don't have good internet connection?",
                answer:
                  'Sumak AI is designed to work offline. Students can download content in advance and work without a connection. When connectivity is restored, all data syncs automatically. We also optimize content for slow connections.',
              },
              {
                question: 'Do teachers need special training?',
                answer:
                  "We provide comprehensive training adapted to each teacher's technology level. This includes interactive tutorials, in-person sessions, detailed documentation, and ongoing support. Most teachers feel comfortable using the platform in less than a week.",
              },
              {
                question: 'How does it integrate with official curriculum?',
                answer:
                  'We work closely with education ministries to ensure all content aligns with national curricula. The platform is flexible and can adapt to different educational systems, standards, and local regulations.',
              },
              {
                question: 'What data is collected about students?',
                answer:
                  'We collect only educational data necessary to personalize learning: academic progress, study patterns, and learning preferences. All data is encrypted, we comply with GDPR and local privacy regulations. Data is never sold to third parties.',
              },
              {
                question: 'How long does it take to see results?',
                answer:
                  'Initial improvement indicators are usually seen in 2-4 weeks: higher engagement and motivation. Measurable academic results typically appear in 2-3 months. Deeper impacts on retention and soft skills are observed after 6 months of consistent use.',
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
            The future of education starts today
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-indigo-100 lg:text-2xl">
            Join the educational revolution that's transforming lives across
            Latin America. Every day we wait, more students abandon their
            dreams.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-gray-100">
              <Play className="mr-2 h-5 w-5" />
              Start Free Trial
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-indigo-600">
              Schedule Personalized Demo
            </button>
          </div>

          <div className="space-y-2 text-center text-indigo-200">
            <p>✅ 30 days free • ✅ No commitment • ✅ Support included</p>
            <p className="text-sm">
              More than 50 demo schools already trust us
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
                Transforming education in Latin America through artificial
                intelligence and personalized learning experiences.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/59175034784?text=Hi%2C%20I%27d%20like%20more%20info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-green-600"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/sumakedu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-pink-600"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/sumak-education"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-blue-600"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Success Stories
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
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Documentation
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
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sumak AI. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Made with ❤️ to transform education in Latin America
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/59175034784?text=Hi%2C%20I%27d%20like%20more%20info"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
