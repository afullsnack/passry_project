import {
  Outlet,
  createFileRoute,
  useMatchRoute,
  useNavigate,
} from '@tanstack/react-router'
import { SettingsTabs } from './-components/settings-tab'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authed/_settings/settings')({
  component: RouteComponent,
  notFoundComponent: () => <div>Not found</div>,
})

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: `/settings/account` })
  }, [])

  const matchRoute = useMatchRoute()

  const tab = matchRoute({ to: '/settings/account' })
    ? 'account'
    : matchRoute({ to: '/settings/preferences' })
      ? 'preferences'
      : 'payment'

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 md:px-6 px-4">
        <div className="w-full flex-col justify-center gap-6">
          <div className="grid items-center justify-start gap-4 overflow-auto md:max-w-4xl mx-auto">
            <div className="flex items-start">
              <h1 className="font-semibold text-3xl lg:text-2xl">Settings</h1>
            </div>
            <SettingsTabs defaultTab={tab}>
              <Outlet />
            </SettingsTabs>
          </div>
        </div>
      </div>
    </div>
  )
}
