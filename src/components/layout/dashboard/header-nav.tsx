import { Notifications } from '@/components/features/Notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Header } from './header'
import { TopNav } from './top-nav'

const topNav = [
  { title: 'Overview', href: '/dashboard/overview', isActive: true },
  { title: 'Queries', href: '/dashboard/queries', isActive: false },
  { title: 'Wallet', href: '/dashboard/wallet', isActive: false },
  { title: 'Analytics', href: '/dashboard/analytics', isActive: false },
  { title: 'Notifications', href: '/dashboard/notifications', isActive: false },
]

export const HeaderNav = () => {
  return (
    <Header className="border-b bg-card">
      <TopNav links={topNav} />
      <div className="flex items-center ml-auto space-x-3">
        <Search />
        <Notifications />
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </Header>
  )
}