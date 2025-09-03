import { List } from '@/components/ui/list'
import { Separator } from '@/components/ui/separator'
import { useSession } from '@/hooks/session'
import { formatDate } from '@/lib/date-formatter'
import { createFileRoute } from '@tanstack/react-router'
import Avvvatars from 'avvvatars-react'
import { Calendar } from 'lucide-react'
import { PiEmpty } from 'react-icons/pi'

export const Route = createFileRoute('/_authed/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = useSession()
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 md:px-6 px-4">
        <div className="w-full flex-col justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-4 overflow-auto md:max-w-2xl mx-auto">
            {/*Content goes here*/}
            <div className="flex gap-4 items-center justify-start w-full">
              <Avvvatars value={'miraclef60@gmail.com'} size={120} />
              <div className="grid">
                <span>{session?.user.name}</span>
                <span className="flex gap-3 items-center">
                  <Calendar className="size-4" /> Joined{' '}
                  {formatDate(session?.user.updatedAt)}
                </span>
                <div className="flex items-center justify-start gap-4">
                  <span className="flex gap-1 items-center">
                    <b>0</b>
                    Hosted
                  </span>
                  <span className="flex gap-1 items-center">
                    <b>0</b>
                    Attended
                  </span>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <span className="flex gap-1 items-center">
                    <b>0</b>
                    Followers
                  </span>
                  <span className="flex gap-1 items-center">
                    <b>0</b>
                    Following
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col items-center justify-center w-full">
              <div className="bg-card/20 border border-border rounded-lg overflow-hidden w-full">
                {/*<div className="p-6 border-b border-border">
                  <h1 className="text-xl font-semibold text-foreground">
                    Payment history
                  </h1>
                  <span>
                    Update organization settings. Add or remove a team member, set
                    permissions for each team member.
                  </span>
                </div>*/}

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
                    <PiEmpty className="size-16 text-gray-500" />
                    <h2 className="text-gray-400 text-lg">Nothing here, yet</h2>
                    <span>You have no public events at this time.</span>
                  </div>
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
