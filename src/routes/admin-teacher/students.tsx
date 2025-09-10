import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/admin-layout'

export const Route = createFileRoute('/admin-teacher/students')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>HOLA</div>
}
