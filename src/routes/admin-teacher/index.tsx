import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-teacher/')({
  beforeLoad: () => {
    throw redirect({ to: '/admin-teacher/dashboard' })
  },
  component: () => null,
})
