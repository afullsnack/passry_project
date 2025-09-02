import { Button } from '@/components/ui/button'
import { List, ListItem } from '@/components/ui/list'
import {
  IconBrandTeams,
  IconDeviceDesktop,
  IconUsersPlus,
} from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import Avvvatars from 'avvvatars-react'
import {
  Calendar,
  HousePlusIcon,
  MinusCircle,
  Plus,
  RefreshCw,
} from 'lucide-react'
import { PiEmpty } from 'react-icons/pi'

export const Route = createFileRoute('/_authed/_settings/settings/account')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="rounded-lg overflow-hidden mb-12 py-6">
        <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
        <p className="text-gray-400">
          Update your personal and organization information.
        </p>
        <div className="flex my-6">
          <Avvvatars value={'miraclef60@gmail.com'} size={120} />
        </div>
      </div>

      <div className="bg-card/40 border border-border rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            Password and security
          </h1>
          <span>
            Change your password, or enable 2FA login for a more secure login
            experience.
          </span>
        </div>

        <List>
          <ListItem
            prefix={<Calendar className="w-5 h-5" />}
            title="Change accounts password"
            description="Follow link sent to your email to complete password change"
            suffix={
              <Button variant="secondary" size="sm">
                Change password
              </Button>
            }
          />

          <ListItem
            prefix={<RefreshCw className="w-5 h-5" />}
            title="Enable 2FA Login"
            description="Secure your account with two-factor authentication"
            suffix={
              <Button variant="default" size="sm">
                Enable 2FA
              </Button>
            }
          />
        </List>
      </div>

      <div className="bg-card/40 border border-border rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            Organization
          </h1>
          <span>
            Update organization settings. Add or remove a team member, set
            permissions for each team member.
          </span>
        </div>

        <List>
          <ListItem
            prefix={<HousePlusIcon className="w-5 h-5" />}
            title="Change organization name"
            description="Update the name of your organization"
            suffix={
              <Button variant="secondary" size="sm">
                Change name
              </Button>
            }
          />

          <ListItem
            prefix={<IconUsersPlus className="w-5 h-5" />}
            title="Go far with your team"
            description="Add, remove or set permissions for your team members"
            suffix={
              <Button
                variant="default"
                size="sm"
                className="flex items-center justify-center gap-2"
              >
                Add member
                <Plus className="w-5 h-5" />
              </Button>
            }
          />
          <div className="p-6 items-center justify-center flex flex-col gap-3">
            <PiEmpty className="size-10 text-gray-500" />
            <span className="text-gray-400 text-sm">No team yet</span>
          </div>
        </List>
      </div>

      <div className="bg-card/40 border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            Active Devices
          </h1>
          <span>
            See the list of devices you are currently signed into Passry from.
          </span>
        </div>

        <List>
          <ListItem
            prefix={<IconDeviceDesktop className="w-5 h-5" />}
            title="Device name"
            description="Lagos, NG - location"
          />

          <ListItem
            prefix={<IconDeviceDesktop className="w-5 h-5" />}
            title="Device name"
            description="Lagos, NG - location"
            suffix={
              <Button variant="ghost" size="icon">
                <MinusCircle className="w-5 h-5" />
              </Button>
            }
          />
        </List>
      </div>
    </div>
  )
}
