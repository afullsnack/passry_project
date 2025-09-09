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
  Loader2,
  Lock,
  LockKeyholeOpen,
  MinusCircle,
  Plus,
  RefreshCw,
} from 'lucide-react'
import { PiEmpty } from 'react-icons/pi'
import { ProfileUpload } from './-components-account/avatar-upload'
import { Notification } from './-components/notification'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { useSession } from '@/hooks/session'
import { authClient } from '@/lib/auth-client'
import type { Session, User } from 'better-auth'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { UAParser } from 'ua-parser-js'
import NiceModal from '@ebay/nice-modal-react'
import ChangePasswordModal from './-components-account/dialogs/change-password'
import ChangeOrgNameDialog from './-components-account/dialogs/change-org-name'
import { useIsMobile } from '@/hooks/use-mobile'

export const Route = createFileRoute('/_authed/_settings/settings/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()
  const [is2FADisabled, setIs2FADisabled] = useState<boolean>(false)
  const { data: session } = useSession()

  const showChangePassword = () => NiceModal.show(ChangePasswordModal)
  const showChangeOrgName = () => NiceModal.show(ChangeOrgNameDialog)

  const {
    data: activeSessions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['list-device-sessions'],
    queryFn: async () => {
      const { data, error: listSessionsError } =
        await authClient.multiSession.listDeviceSessions()
      if (listSessionsError) throw listSessionsError

      return data
    },
  })

  if (error) {
    return toast.error(error.message, {
      description: `${JSON.stringify(error, null, 3)}`,
    })
  }

  return (
    <div>
      <div className="rounded-lg overflow-hidden mb-12 py-6">
        <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
        <p className="text-gray-400">
          Update your personal and organization information.
        </p>
        <div className="grid my-6">
          <ProfileUpload
            label={session?.user.email || 'miraclef60@gmail.com'}
            url={session?.user.image}
          />
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
              <Button
                variant="secondary"
                size="sm"
                onClick={showChangePassword}
              >
                Change password
              </Button>
            }
          />

          <ListItem
            prefix={<LockKeyholeOpen className="w-5 h-5" />}
            title="Enable 2FA Login"
            description="Secure your account with two-factor authentication"
            suffix={
              <Switch
                onCheckedChange={(checked) => setIs2FADisabled(!checked)}
                defaultChecked={!is2FADisabled}
              />
            }
          />
          <div>
            <Notification
              title={
                isMobile
                  ? 'Choose default 2FA method'
                  : 'Choose default 2 factor authentication method'
              }
              options={['Authenticator app', 'Email']}
              defaultValue={'Authenticator app'}
              prefixIcon={undefined}
              disabled={is2FADisabled}
            />
          </div>
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
              <Button variant="secondary" size="sm" onClick={showChangeOrgName}>
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
                <span className="hidden md:inline">Add member</span>
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
          {isLoading && (
            <ListItem
              prefix={<IconDeviceDesktop className="w-5 h-5" />}
              title="Loading..."
              description="Please wait..."
              suffix={<Loader2 className="w-5 h-5 animate-spin" />}
            />
          )}
          {!isLoading &&
            activeSessions?.map((session, index) => {
              return (
                <ListItem
                  key={index}
                  prefix={<IconDeviceDesktop className="w-5 h-5" />}
                  title={
                    UAParser(session.session.userAgent!).device.model ||
                    'Device name'
                  }
                  description={
                    session.session.ipAddress || 'Lagos, NG - location' // TODO: Implement location lookup using IP
                  }
                  suffix={
                    index > 0 && (
                      <Button variant="ghost" size="icon">
                        <MinusCircle className="w-5 h-5" />
                      </Button>
                    )
                  }
                />
              )
            })}
        </List>
      </div>
    </div>
  )
}
