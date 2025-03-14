import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bell } from 'lucide-react'
import { Header } from './header'
import { TopNav } from './top-nav'
import { Search } from '@/components/search'

export const HeaderNav = () => {
  return (
    <Header className="border-b bg-card">
      <TopNav links={topNav} />
      <div className='ml-auto flex items-center space-x-3'>
        <Search />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </Header>
  )
}



const topNav = [
  { title: 'Overview', href: '/dashboard/overview', isActive: true },
  { title: 'Queries', href: '/dashboard/queries', isActive: false },
  { title: 'Wallet', href: '/dashboard/wallet', isActive: false },
  { title: 'Analytics', href: '/dashboard/analytics', isActive: false },
  { title: 'Notifications', href: '/dashboard/notifications', isActive: false },
]


const notifications = [
  { id: 1, message: "New campaign launched", date: "2025-03-12", unread: true },
  { id: 2, message: "Query #Q123 pending", date: "2025-03-11", unread: false },
]