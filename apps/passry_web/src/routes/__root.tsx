import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// import Header from '../components/Header'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { Layout } from '@/components/craft.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'

import FaviconLogoMark from '@/assets/PASSRY_LogoMark.svg?url'
import { Toaster } from '@/components/ui/sonner.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Passry - One app, All access',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: FaviconLogoMark,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      {/* <Header /> */}

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <Toaster />
      <TanStackQueryLayout />
    </RootDocument>
  ),
  notFoundComponent: undefined,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout className="transition-all duration-100 min-h-screen">
        <head>
          <HeadContent />
        </head>
        <body>
          {children}
          <Scripts />
        </body>
      </Layout>
    </ThemeProvider>
  )
}
