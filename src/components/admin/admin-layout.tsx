import { Link, useLocation } from '@tanstack/react-router'
import {
  BookOpenCheck,
  ClipboardList,
  Settings,
  Sparkles,
  SquarePen,
} from 'lucide-react'
import { ThemeSwitcher } from '../common/theme-switcher'
import { Logo } from '../common/logo'
import type { LinkOptions } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

interface AdminLayoutProps {
  children: React.ReactNode
}

type NavigationItem = {
  name: string
  href: NonNullable<LinkOptions['to']>
  icon: React.ComponentType<{ size: number }>
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigation: Array<NavigationItem> = [
    {
      name: 'Notes',
      href: '/admin-teacher/notes',
      icon: SquarePen,
    },
    {
      name: 'Documents',
      href: '/admin-teacher/documents',
      icon: ClipboardList,
    },
    {
      name: 'AI Tutor',
      href: '/admin-teacher/chat',
      icon: Sparkles,
    },
    {
      name: 'Study',
      href: '/admin-teacher/study',
      icon: BookOpenCheck,
    },
    {
      name: 'Settings',
      href: '/admin-teacher/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden min-h-screen w-fit flex-col md:flex">
        <DesktopSidebar navigation={navigation} />
      </div>
      <div className="block md:hidden">
        <MobileSidebar navigation={navigation} />
      </div>

      <main className="flex min-h-svh flex-1">{children}</main>
    </div>
  )
}

function MobileSidebar({ navigation }: { navigation: Array<NavigationItem> }) {
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

function DesktopSidebar({ navigation }: { navigation: Array<NavigationItem> }) {
  const location = useLocation()
  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <div className="border-base-300 bg-base-200 flex h-full flex-col justify-between border-r xl:w-64">
      <div className="sticky top-0 z-10 flex h-fit flex-col items-center pt-4">
        <div className="flex w-full gap-3 px-4">
          <Link to="/">
            <Logo />
          </Link>

          <div className="hidden w-full flex-col overflow-hidden xl:flex">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              Sergio Loza Villarroel Lopez Marquez
            </p>
            <p className="text-base-content/60 text-sm">Student</p>
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
      <div className="flex w-full items-center justify-center px-2 py-2">
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default AdminLayout
