import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/admin-teacher/study')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const fetchCards = useQuery(trpc.cards.getAll.queryOptions())

  const cards = fetchCards.data || []

  return (
    <div className="flex h-full w-full flex-col">
      <div className="responsive-app-container flex h-full flex-col md:flex-row">
        {/* Notes sidebar - constant width */}
        <div className="border-base-300 flex w-full flex-col md:w-80 md:border-r">
          {/* Card topics list */}
        </div>

        {/* Learning scrolling experience like tiktok here */}
        <div className="flex h-full flex-1"></div>
      </div>
    </div>
  )
}
