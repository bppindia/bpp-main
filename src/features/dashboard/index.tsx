import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import StateMap from './components/state-map'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { Copy, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData()

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast.success(message)
  }

  const user = {
    firstName: dashboardData?.user?.firstName || 'User',
    lastName: dashboardData?.user?.lastName || '',
    role: dashboardData?.user?.role || 'Member',
    membership: dashboardData?.membership?.membershipNumber || 'N/A',
    address: {
      state: dashboardData?.user?.address?.state || 'India'
    }
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='flex items-center ml-auto space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        {/* User Info and Wallet Balance */}
        <div className="flex flex-col gap-6 justify-between mb-6 md:flex-row md:items-center">
          <div className="flex gap-4 items-center">
            <Avatar className="w-12 h-12 md:w-16 md:h-16">
              <AvatarImage src="/avatar.jpg" alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                Welcome, {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {user.role} | ID: {user.membership} | {user.address?.state}, India
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Wallet Balance:</span>
            {isLoading ? (
              <Skeleton className="w-20 h-6" />
            ) : (
              <span className="text-lg font-bold">₹{dashboardData?.wallet?.balance || 0}</span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Total Members', value: dashboardData?.totalMembersIndia, sub: `+${dashboardData?.totalMembersState} in your state`, icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { title: 'Primary Members', value: dashboardData?.cases?.totalCases || 0, sub: 'Primary Members in your state', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 1 0-8 M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
              { title: 'Active Members', value: dashboardData?.totalProfessionalsState, sub: 'Active professionals in your state', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
              { title: 'Business Registered', value: dashboardData?.referrals?.totalReferrals, sub: 'Total business registered in your state', icon: 'M2 5h20v14H2z M2 10h20' },
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-muted-foreground">
                    <path d={stat.icon} />
                  </svg>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <><Skeleton className="mb-2 w-24 h-8" /><Skeleton className="w-32 h-4" /></>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.sub}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Referral Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
              <CardDescription>Share your referral code with friends and earn rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <><Skeleton className="w-full h-12" /><Skeleton className="w-48 h-4" /></>
              ) : (
                <>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 p-3 font-mono text-lg rounded-md bg-muted">
                      {dashboardData?.referrals?.referralCode || 'No referral code available'}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(dashboardData?.referrals?.referralCode || '', 'Referral code copied')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                      { label: 'Total Referrals', value: dashboardData?.referrals?.totalReferrals },
                      { label: 'Successful', value: dashboardData?.referrals?.successfulReferrals },
                      { label: 'Pending', value: dashboardData?.referrals?.pendingReferrals },
                    ].map((item, index) => (
                      <div key={index} className="p-3 text-center rounded-md bg-muted">
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  {dashboardData?.referrals?.referralLink && (
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 p-2 text-sm truncate rounded-md bg-muted">{dashboardData.referrals.referralLink}</div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(dashboardData.referrals.referralLink || '', 'Referral link copied')}>
                        Copy
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Overview and Recent Activity */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-[300px] w-full" /> : (
                  <StateMap state="Maharashtra" dist="Raigarh" totalMembers={dashboardData?.totalMembersState} />
                )}
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  {isLoading ? <Skeleton className="w-48 h-4" /> : `You made ${dashboardData?.referrals?.totalReferrals} Referrals this month.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4"><Skeleton className="w-full h-12" /><Skeleton className="w-full h-12" /></div>
                ) : dashboardData?.wallet?.recentTransactions?.length > 0 ? (
                  dashboardData.wallet.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-2 mb-2 rounded-md border">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className={`font-bold ${transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-muted-foreground">No recent transactions</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}