import * as React from 'react'
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  // IconDatabase,
  IconFileAi,
  IconFileDescription,
  // IconFileWord,
  IconFolder,
  // IconHelp,
  // IconInnerShadowTop,
  IconListDetails,
  // IconReport,
  // IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'

// import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link, useNavigate } from '@tanstack/react-router'
import LogoTextMark from '@/assets/PASSRY_Logo_TextMark.svg?url'
import { useSession } from '@/hooks/session'

const data = {
  user: {
    name: 'Miracle',
    email: 'miraclef60@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Explore',
      url: '/explore',
      icon: IconListDetails,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: IconDashboard,
    },
    {
      title: 'Events',
      url: '/events',
      icon: IconChartBar,
    },
    {
      title: 'Stats',
      url: '/stats',
      icon: IconFolder,
    },
    {
      title: 'Team',
      url: '/team',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
    // {
    //   title: 'Get Help',
    //   url: '#',
    //   icon: IconHelp,
    // },
    // {
    //   title: 'Search',
    //   url: '#',
    //   icon: IconSearch,
    // },
  ],
  // documents: [
  //   {
  //     name: 'Data Library',
  //     url: '#',
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: 'Reports',
  //     url: '#',
  //     icon: IconReport,
  //   },
  //   {
  //     name: 'Word Assistant',
  //     url: '#',
  //     icon: IconFileWord,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, error } = useSession()
  const navigate = useNavigate()

  if (!session) {
    console.log('Error in app sidebar', error, session)
    navigate({ to: '/login' })
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!px-3.5 data-[slot=sidebar-menu-button]:!py-20.5"
            >
              <Link to="/explore">
                <img src={LogoTextMark} className="object-cover h-8 w-28" />
                {/* <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user.name!,
            email: session?.user.email!,
            avatar: session?.user.image!,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
