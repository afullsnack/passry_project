import { createFileRoute } from '@tanstack/react-router'
import { ThemeSelector } from './-components/theme-selector'
import { Notification } from './-components/notification'
import {
  AlarmClock,
  CalendarClock,
  ClipboardList,
  Folder,
  Megaphone,
  Stars,
  UserRoundPlusIcon,
} from 'lucide-react'

export const Route = createFileRoute('/_authed/_settings/settings/preferences')(
  {
    component: RouteComponent,
  },
)

const attendEventsNotifications = {
  title: 'Events you attend',
  notifications: [
    {
      options: ['Email', 'Off'],
      defaultValue: 'Off',
      title: 'Event invites',
      prefixIcon: <Folder />,
    },
    {
      options: ['Email', 'Off'],
      defaultValue: 'Off',
      title: 'Event Reminders',
      prefixIcon: <AlarmClock />,
    },
    {
      options: ['Email', 'Off'],
      defaultValue: 'Off',
      title: 'Event Blasts',
      prefixIcon: <Megaphone />,
    },
    {
      options: ['Email', 'Off'],
      defaultValue: 'Off',
      title: 'Event Updates',
      prefixIcon: <CalendarClock />,
    },
    {
      options: ['Email', 'Off'],
      defaultValue: 'Off',
      title: 'Feedback Requests',
      prefixIcon: <ClipboardList />,
    },
  ],
}
const hostEventsNotifications = {
  title: 'Events you host',
  notifications: [
    {
      options: ['Email', 'Off'],
      defaultValue: 'Off',
      title: 'Guest Registration',
      prefixIcon: <UserRoundPlusIcon />,
    },
    {
      options: ['Email', 'Off'],
      defaultValue: 'Email',
      title: 'Feedback Responses',
      prefixIcon: <ClipboardList />,
    },
  ],
}
const productNotifications = {
  title: 'Passry',
  notifications: [
    {
      options: ['Email', 'Off'],
      defaultValue: 'Email',
      title: 'Product updates',
      prefixIcon: <Stars />,
    },
  ],
}

function RouteComponent() {
  return (
    <div>
      <ThemeSelector />

      <div className="my-12">
        <h2 className="text-2xl font-semibold mb-2" id="notifications">
          Notifications
        </h2>
        <p className="text-gray-400">
          Choose how you would like to be notified about updates and invites.
        </p>
        <div className="max-w-lg my-6 space-y-4">
          <h4 className="text-sm font-medium">
            {attendEventsNotifications.title}
          </h4>
          <div>
            {attendEventsNotifications.notifications.map((notification) => (
              <Notification
                key={notification.title}
                options={notification.options}
                defaultValue={notification.defaultValue}
                title={notification.title}
                prefixIcon={notification.prefixIcon}
              />
            ))}
          </div>
        </div>
        <div className="max-w-lg my-6 space-y-4">
          <h4 className="text-sm font-medium">
            {hostEventsNotifications.title}
          </h4>
          <div>
            {hostEventsNotifications.notifications.map((notification) => (
              <Notification
                key={notification.title}
                options={notification.options}
                defaultValue={notification.defaultValue}
                title={notification.title}
                prefixIcon={notification.prefixIcon}
              />
            ))}
          </div>
        </div>
        <div className="max-w-lg my-6 space-y-4">
          <h4 className="text-sm font-medium">{productNotifications.title}</h4>
          <div>
            {productNotifications.notifications.map((notification) => (
              <Notification
                key={notification.title}
                options={notification.options}
                defaultValue={notification.defaultValue}
                title={notification.title}
                prefixIcon={notification.prefixIcon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
