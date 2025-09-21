import { Outlet, createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/components/admin/admin-layout'

export const Route = createFileRoute('/admin-teacher')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
