import { useSession } from '@/hooks/session'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session, error, isPending } = useSession()

  console.log('Session', session)

  if (error) return <div>Error: {error.message}</div>

  if (isPending) return <div>Loading...</div>

  return <div>Hello "/_dashboard/dashboard"!</div>
}
