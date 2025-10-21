import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { AuthContext } from '@/providers/AuthProvider'
import type { QueryClient } from '@tanstack/react-query'

import { FilterComponent } from '@/components/home/Filter'
import { SideBarComponent } from '@/components/SideBar'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContext
}

const RootLayout = () => {
  // check if in dev mode
  const developmentMode = import.meta.env.VITE_ENV === 'development'

  return (
    <>
      <FilterComponent />
      <Header />
      <div className="max-w-[1160px] mx-auto relative">
        <div className="sm:block hidden">
          <SideBarComponent />
        </div>
        <Outlet />
      </div>
      {developmentMode && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      )}
    </>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
})
