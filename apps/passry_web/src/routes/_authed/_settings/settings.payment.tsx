import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/_settings/settings/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="rounded-lg overflow-hidden mb-12 py-6">
        <h2 className="text-2xl font-semibold mb-2">Payment Methods</h2>
        <p className="text-gray-400">
          Your saved payment methods are encrypted and stored by paystack.
        </p>
        <div className="flex my-6">
          <Button>Add payment method</Button>
        </div>
      </div>
    </div>
  )
}
