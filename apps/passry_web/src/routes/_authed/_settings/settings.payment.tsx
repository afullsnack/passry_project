import { Button } from '@/components/ui/button'
import { List, ListItem } from '@/components/ui/list'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { createFileRoute } from '@tanstack/react-router'
import { Bitcoin, CreditCard, File, Upload } from 'lucide-react'
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

      <Separator className="my-12" />

      <div className="bg-card/40 border border-border rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            Organization payment setup
          </h1>
          <span>Decide how you want attendees to pay for your tickets.</span>
        </div>

        <List>
          <ListItem
            prefix={<CreditCard className="w-5 h-5" />}
            title="Bank payment"
            description="Allow payments with debit card or bank transfer"
            suffix={<Switch defaultChecked={true} />}
          />
          <ListItem
            prefix={<Bitcoin className="w-5 h-5" />}
            title="Crypto payment"
            description="Allow crypto payments"
            suffix={<Switch defaultChecked={true} />}
          />
          <ListItem
            prefix={<File className="w-5 h-5" />}
            title="Refund policy"
            description="Let attendees know about your refund policy"
            suffix={
              <Button variant="ghost" size="sm">
                Upload <Upload className="size-4 ml-2" />
              </Button>
            }
          />
        </List>
      </div>

      <div className="bg-card/40 border border-border rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            Transaction history
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
            <h2 className="text-gray-400 text-sm">No transactions yet</h2>
            <span>
              Your transactions will appear here when attendees buy your tickets
            </span>
          </div>
        </List>
      </div>
      <div className="bg-card/40 border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Payout history
            </h1>
            <span>Current Balance: $0.00</span>
          </div>
          <Button size="sm">Request payout</Button>
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
            <h2 className="text-gray-400 text-sm">No payouts yet</h2>
            <span>Your payout history will appear here</span>
          </div>
        </List>
      </div>
    </div>
  )
}
