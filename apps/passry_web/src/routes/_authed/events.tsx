import {
  Link,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { Plus } from 'lucide-react'
import NiceModal from '@ebay/nice-modal-react'

export const Route = createFileRoute('/_authed/events')({
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()

  const matchRoute = useMatchRoute()

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div
          defaultValue="events"
          className="w-full flex-col justify-start gap-6"
        >
          <div className="flex items-center justify-between px-4 lg:px-6 mb-6 lg:mb-4">
            <div className="flex items-center gap-2">
              {matchRoute({ to: '/events' }) && <Input placeholder="Search" />}
            </div>

            {!matchRoute({ to: '/events/new' }) && (
              <Button className="" size={isMobile ? 'sm' : 'default'} asChild>
                <Link to="/events/new">
                  Create event <Plus className="ml-2 size-4" />
                </Link>
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4 overflow-auto">
            <NiceModal.Provider>
              <Outlet />
            </NiceModal.Provider>
          </div>
        </div>
      </div>
    </div>
  )
}
