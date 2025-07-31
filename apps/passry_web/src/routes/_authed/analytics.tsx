import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSession } from '@/hooks/session'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import data from '@/app/dashboard/data.json'

export const Route = createFileRoute('/_authed/analytics')({
  component: RouteComponent,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  notFoundComponent: () => <div>Not Found</div>,
})

function RouteComponent() {
  const { data: session, error, isPending } = useSession()
  const navigate = useNavigate()

  console.log('Session', session)

  if (error || !session) {
    navigate({ to: '/login' })
  }

  if (isPending) return <div>Loading...</div>

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  )
}
