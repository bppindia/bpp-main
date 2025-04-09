import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import store from '@/store/store'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/dashboard/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: async ({ location }) => {
    // Check both Redux store and cookies for authentication
    const state = store.getState()
    const authToken = Cookies.get('authToken')
    const userDetails = Cookies.get('userDetails')

    if (
      (!state.auth.token || !state.auth.user) &&
      (!authToken || !userDetails)
    ) {
      // Redirect to sign-in with return url
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }

    // If we have cookies but no Redux state, update Redux state
    if ((!state.auth.token || !state.auth.user) && authToken && userDetails) {
      store.dispatch({
        type: 'auth/setCredentials',
        payload: {
          token: authToken,
          user: JSON.parse(userDetails),
        },
      })
    }
  },
})

function DashboardLayout() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
