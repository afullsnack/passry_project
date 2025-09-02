import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_settings/settings/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/settings/settings/payments"!</div>
}
