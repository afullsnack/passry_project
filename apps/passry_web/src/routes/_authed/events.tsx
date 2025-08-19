import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CreateEventDialog from './-components/events/create-event-dialog'
import { useIsMobile } from '@/hooks/use-mobile'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_authed/events')({
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6"
        >
          <div className="flex items-center justify-between px-4 lg:px-6 mb-6 lg:mb-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search" />
            </div>
            <CreateEventDialog
              openTrigger={
                <Button className="" size={isMobile ? 'sm' : 'default'}>
                  Create event <Plus className="ml-2 size-4" />
                </Button>
              }
            />
          </div>
          <div className="flex flex-col gap-4 overflow-auto">
            <Outlet />
            {/*<div className="overflow-hidden rounded-lg grid gap-4.5 border p-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}
