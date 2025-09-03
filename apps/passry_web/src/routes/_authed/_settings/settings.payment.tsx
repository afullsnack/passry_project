import { Button } from '@/components/ui/button'
import { List, ListItem } from '@/components/ui/list'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { PiEmpty } from 'react-icons/pi'

export const Route = createFileRoute('/_authed/_settings/settings/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="rounded-lg overflow-hidden pt-6">
        <h2 className="text-2xl font-semibold mb-2">Payment Methods</h2>
        <p className="text-gray-400">
          Your saved payment methods are encrypted and stored by paystack.
        </p>
        <div className="flex my-6">
          <Button>Add payment method</Button>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="bg-card/40 border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            Payment history
          </h1>
          {/*<span>
            Update organization settings. Add or remove a team member, set
            permissions for each team member.
          </span>*/}
        </div>

        <List>
          {/*<ListItem
            prefix={<HousePlusIcon className="w-5 h-5" />}
            title="Change organization name"
            description="Update the name of your organization"
            suffix={
              <Button variant="secondary" size="sm">
                Change name
              </Button>
            }
          />*/}

          <div className="p-6 items-center justify-center flex flex-col gap-3">
            <PiEmpty className="size-10 text-gray-500" />
            <h2 className="text-gray-400 text-sm">No payment yet</h2>
            <span>
              Your payments will appear here once you purchase your first ticket
            </span>
          </div>
        </List>
      </div>
    </div>
  )
}
