import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/stats')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Stats page still a work in progress</div>
}
