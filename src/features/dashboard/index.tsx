import { Users, UserCheck, TrendingUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { UserRole, UserStatus } from '@/utils/roleAccess'
import { DashboardData, useDashboardData } from '@/hooks/use-dashboard-data'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import GoogleMap from './components/google-map'
import UserCard from './components/user-card'
import { StatsGrid } from './components/stats-grid'
import { PieChartComponent } from './components/pie-chart'
import { AreaChartComponent } from './components/area-chart'
import { RecentActivities } from './components/recent-activities'

type StatCardKey = keyof DashboardData | 'activeMembers'

// Stat card configuration
const statCards = [
  {
    title: 'Total Members',
    icon: Users,
    key: 'totalMembersIndia' as StatCardKey,
    subKey: 'totalMembersState' as keyof DashboardData,
    subText: (value: number) => `+${value} in your state`,
    showAlways: true,
    trend: 'up' as const,
  },
  {
    title: 'Primary Members',
    icon: UserCheck,
    key: 'totalPrimaryMembersState' as StatCardKey,
    subText: () => 'Primary Members in your state',
    showAlways: true,
    trend: 'up' as const,
  },
  {
    title: 'Active Members',
    icon: TrendingUp,
    key: 'totalActiveMembersState' as StatCardKey,
    subText: () => 'Active professionals in your state',
    showAlways: true,
    trend: 'up' as const,
  },
  {
    title: 'Total Referrals',
    icon: Users,
    key: 'referrals' as StatCardKey,
    subKey: 'referrals' as keyof DashboardData,
    subText: () => 'Total referrals you made',
    showAlways: true,
    trend: 'neutral' as const,
  },
]

// Main Dashboard Component
export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData()
  const { user: authUser } = useAuth()

  const user = !isLoading && authUser
    ? {
      firstName: authUser.firstName || 'User',
      lastName: authUser.lastName || '',
      role: authUser.role as UserRole || UserRole.MEMBER,
      status: authUser.status as UserStatus || UserStatus.PROCESSING,
      membership: dashboardData?.membership?.number || 'N/A',
      address: {
        state: authUser.address?.state || 'India',
        district: authUser.address?.district || 'Raigarh',
      },
      isVerified: authUser.isVerified || false,
    }
    : null

  const isVerified = user?.isVerified && user?.status === UserStatus.APPROVED

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <UserCard dashboardData={dashboardData} isLoading={isLoading} />
        <div className="space-y-6">
          <StatsGrid
            isLoading={isLoading}
            dashboardData={dashboardData}
            isVerified={isVerified || false}
            statCards={statCards}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <GoogleMap 
              state={user?.address.state || 'Maharashtra'} 
              district={user?.address.district || 'Raigarh'} 
              totalMembers={dashboardData?.totalMembersState || 0} 
              isLoading={isLoading} 
            />
            <RecentActivities dashboardData={dashboardData} isLoading={isLoading} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <AreaChartComponent dashboardData={dashboardData} isLoading={isLoading} />
            <PieChartComponent dashboardData={dashboardData} isLoading={isLoading} />
          </div>
        </div>
      </Main>
    </>
  )
}