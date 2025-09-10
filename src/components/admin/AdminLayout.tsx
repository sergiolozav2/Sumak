import { Link, useLocation } from '@tanstack/react-router'
import { BookA, ChartColumnIncreasing, Settings, Users } from 'lucide-react'
import { useState } from 'react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin-teacher/dashboard',
      icon: ChartColumnIncreasing,
    },
    {
      name: 'Estudiantes',
      href: '/admin-teacher/students',
      icon: Users,
    },
    {
      name: 'Cursos',
      href: '/admin-teacher/courses',
      icon: BookA,
    },
    {
      name: 'IA & Analytics',
      href: '/admin-teacher/analytics',
      icon: ChartColumnIncreasing,
    },
    {
      name: 'Configuración',
      href: '/admin-teacher/settings',
      icon: Settings,
    },
  ]

  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="lg:flex lg:w-fit lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-base-300 bg-primary pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-8 w-auto" src="/logo.png" alt="Sumak" />
          </div>
          <nav className="mt-5 flex-1 flex flex-col divide-y divide-base-300">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  data-tip={item.name}
                  className={`group tooltip tooltip-right flex w-fit flex-col items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-content'
                      : 'text-base-content hover:bg-base-300'
                  }`}
                >
                  <item.icon size={32} />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {/* Main content */}
        <main className="flex-1 py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
