import { Link, LinkOptions, useLocation } from '@tanstack/react-router'
import {
  BookOpenCheck,
  ClipboardList,
  Settings,
  Sparkles,
  SquarePen,
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

type NavigationItem = {
  name: string
  href: NonNullable<LinkOptions['to']>
  icon: React.ComponentType<{ size: number }>
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigation: NavigationItem[] = [
    {
      name: 'Notes',
      href: '/admin-teacher/notes',
      icon: SquarePen,
    },
    {
      name: 'Tasks',
      href: '/admin-teacher/students',
      icon: ClipboardList,
    },
    {
      name: 'AI Tutor',
      href: '/admin-teacher/courses',
      icon: Sparkles,
    },
    {
      name: 'Study',
      href: '/admin-teacher/analytics',
      icon: BookOpenCheck,
    },
    {
      name: 'Settings',
      href: '/admin-teacher/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen w-fit flex-col md:block">
        <DesktopSidebar navigation={navigation} />
      </div>
      <div className="block md:hidden">
        <MobileSidebar navigation={navigation} />
      </div>

      <main className="flex-1">
        <div className="">{children}</div>
      </main>
    </div>
  )
}

function MobileSidebar({ navigation }: { navigation: NavigationItem[] }) {
  const location = useLocation()
  const isActive = (href: string) => {
    return location.pathname === href
  }
  return (
    <div className="dock bg-neutral text-neutral-content border-base-300 border-t">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          data-tip={item.name}
          className={`dock-item ${isActive(item.href) ? 'dock-active' : ''}`}
        >
          <div className="tooltip tooltip-top" data-tip={item.name}>
            <item.icon size={24} />
          </div>
        </Link>
      ))}
    </div>
  )
}

function DesktopSidebar({ navigation }: { navigation: NavigationItem[] }) {
  const location = useLocation()
  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <div className="border-base-300 bg-base-200 h-full border-r xl:w-64">
      <div className="sticky top-0 z-10 flex h-fit flex-col items-center pt-4">
        <div className="flex w-full gap-3 px-4">
          <div className="max-w-11 min-w-11 cursor-pointer items-center rounded-lg bg-gradient-to-r from-[#59BAFF] to-purple-600 p-1.5">
            <img src="/logo.png" alt="Sumak" />
          </div>

          <div className="hidden w-full flex-col overflow-hidden xl:flex">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              Sergio Loza Villarroel Lopez Marquez
            </p>
            <p className="text-base-content/60 text-sm">Estudiante</p>
          </div>
        </div>
        <nav className="mt-6 w-full">
          <div className="menu menu-vertical w-full items-center gap-3">
            {navigation.map((item) => (
              <li key={item.name} className="flex xl:w-full">
                <Link
                  to={item.href}
                  data-tip={item.name}
                  className={`tooltip tooltip-right flex w-fit items-center justify-center transition-all before:z-50 xl:w-full xl:justify-start ${
                    isActive(item.href) ? 'menu-active' : ''
                  }`}
                >
                  <item.icon size={24} />
                  <p className="hidden xl:block">{item.name}</p>
                </Link>
              </li>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default AdminLayout
