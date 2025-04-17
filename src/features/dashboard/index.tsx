import { Link } from '@tanstack/react-router'
import {
  Copy,
  CreditCard,
  AlertCircle,
  CheckCircle,
  UserCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData()

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast.success(message)
  }

  // Only create user object when data is loaded
  const user = !isLoading
    ? {
        firstName: dashboardData?.user?.firstName || 'User',
        lastName: dashboardData?.user?.lastName || '',
        role: dashboardData?.user?.role || 'Member',
        status: dashboardData?.user?.status || 'PROCESSING',
        membership: dashboardData?.membership?.membershipNumber || 'N/A',
        address: {
          state: dashboardData?.user?.address?.state || 'India',
        },
        isVerified:
          (dashboardData?.user as { isVerified?: boolean })?.isVerified ||
          false,
      }
    : null

  // Only determine status when user object exists
  const isVerified = user
    ? user.status === 'APPROVED' || user.isVerified === true
    : false
  const isPrimaryMember = user ? user.role === 'PRIMARY MEMBER' : false
  // const isActiveMember = user ? user.role === 'ACTIVE MEMBER' : false

  // Format membership dates
  const membershipExpiryDate =
    !isLoading && dashboardData?.membership?.validity?.expiryDate
      ? new Date(
          dashboardData.membership.validity.expiryDate
        ).toLocaleDateString()
      : 'N/A'

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        {/* User Info and Wallet Balance */}
        <div className='mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-12 w-12 md:h-16 md:w-16'>
              <AvatarImage
                src='/avatar.jpg'
                alt={user ? `${user.firstName} ${user.lastName}` : 'User'}
              />
              <AvatarFallback>
                {user ? `${user.firstName[0]}${user.lastName[0]}` : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className='text-xl font-bold tracking-tight md:text-2xl'>
                Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </h1>
              {!isLoading && (
                <div className='flex items-center gap-2'>
                  <Badge variant={isVerified ? 'default' : 'secondary'}>
                    {user?.role || 'Member'}
                  </Badge>
                  <Badge variant={isVerified ? 'outline' : 'destructive'}>
                    {isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
              )}
              <p className='text-sm text-muted-foreground'>
                ID: {user?.membership || 'N/A'} |{' '}
                {user?.address?.state || 'India'}, India
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <CreditCard className='h-5 w-5 text-muted-foreground' />
            <span className='text-sm font-medium'>Wallet Balance:</span>
            {isLoading ? (
              <Skeleton className='h-6 w-20' />
            ) : (
              <span className='text-lg font-bold'>
                ₹{dashboardData?.wallet?.balance || 0}
              </span>
            )}
          </div>
        </div>

        {/* Verification and Membership Status Alerts - Only show when not loading */}
        {!isLoading && (
          <>
            {!isVerified && (
              <Alert variant='destructive' className='mb-6'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Account Verification Required</AlertTitle>
                <AlertDescription>
                  Your account is pending verification. Please complete the
                  verification process to access all features.
                </AlertDescription>
              </Alert>
            )}

            {isVerified && !isPrimaryMember && (
              <Alert className='mb-6'>
                <UserCheck className='h-4 w-4' />
                <AlertTitle>Upgrade to Primary Membership</AlertTitle>
                <AlertDescription>
                  You're verified but not a primary member. Upgrade to access
                  premium features.
                </AlertDescription>
                <div className='mt-4'>
                  <Button asChild>
                    <Link to='/dashboard/membership'>
                      Activate Primary Membership
                    </Link>
                  </Button>
                </div>
              </Alert>
            )}

            {isPrimaryMember && (
              <Alert className='mb-6'>
                <CheckCircle className='h-4 w-4' />
                <AlertTitle>Primary Membership Active</AlertTitle>
                <AlertDescription>
                  Your primary membership is active until {membershipExpiryDate}
                  . Enjoy all premium features!
                </AlertDescription>
              </Alert>
            )}

            {/* {isPrimaryMember && dashboardData?.referrals?.successfulReferrals >= 10 && ( */}
            <Alert className='mb-6 border-yellow-200 bg-yellow-50'>
              <UserCheck className='h-4 w-4 text-yellow-600' />
              <AlertTitle className='text-yellow-800'>
                Upgrade to Active Membership
              </AlertTitle>
              <AlertDescription className='text-yellow-700'>
                Congratulations! You have completed{' '}
                {dashboardData.referrals.successfulReferrals} successful
                referrals. You are now eligible to upgrade to Active Membership.
              </AlertDescription>
              <div className='mt-4'>
                <Button
                  asChild
                  className='bg-yellow-600 text-white hover:bg-yellow-700'
                >
                  <Link to='/dashboard/membership/upgrade'>Upgrade Now</Link>
                </Button>
              </div>
            </Alert>
            {/* )} */}
          </>
        )}

        {/* Main Content */}
        <div className='space-y-6'>
          {/* Stats Grid */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {[
              {
                title: 'Total Members',
                value: dashboardData?.totalMembersIndia,
                sub: `+${dashboardData?.totalMembersState} in your state`,
                icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
                showAlways: true,
              },
              {
                title: 'Primary Members',
                value: dashboardData?.totalProfessionalsState || 0,
                sub: 'Primary Members in your state',
                icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 1 0-8 M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
                showAlways: true,
              },
              {
                title: 'Active Members',
                value: 0,
                sub: 'Active professionals in your state',
                icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
                showAlways: true,
              },
              {
                title: 'Business Registered',
                value: dashboardData?.referrals?.totalReferrals,
                sub: 'Total business registered in your state',
                icon: 'M2 5h20v14H2z M2 10h20',
                showAlways: true,
              },
            ]
              .filter((stat) => stat.showAlways || isVerified)
              .map((stat, index) => (
                <Card key={index}>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      {stat.title}
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d={stat.icon} />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <>
                        <Skeleton className='mb-2 h-8 w-24' />
                        <Skeleton className='h-4 w-32' />
                      </>
                    ) : (
                      <>
                        <div className='text-2xl font-bold'>{stat.value}</div>
                        <p className='text-xs text-muted-foreground'>
                          {stat.sub}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Referral Section - Only show for verified users */}
          {/* {isVerified && dashboardData?.referrals && (
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Code</CardTitle>
                <CardDescription>
                  Share your referral code with friends and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {isLoading ? (
                  <>
                    <Skeleton className='w-full h-12' />
                    <Skeleton className='w-48 h-4' />
                  </>
                ) : (
                  <>
                    <div className='flex gap-2 items-center'>
                      <div className='flex-1 p-3 font-mono text-lg rounded-md bg-muted'>
                        {dashboardData?.referrals?.referralCode ||
                          'No referral code available'}
                      </div>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                          copyToClipboard(
                            dashboardData?.referrals?.referralCode || '',
                            'Referral code copied'
                          )
                        }
                      >
                        <Copy className='w-4 h-4' />
                      </Button>
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                      {[
                        {
                          label: 'Total Referrals',
                          value: dashboardData?.referrals?.totalReferrals,
                        },
                        {
                          label: 'Successful',
                          value: dashboardData?.referrals?.successfulReferrals,
                        },
                        {
                          label: 'Pending',
                          value: dashboardData?.referrals?.pendingReferrals,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className='p-3 text-center rounded-md bg-muted'
                        >
                          <div className='text-2xl font-bold'>{item.value}</div>
                          <div className='text-xs text-muted-foreground'>
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    {dashboardData?.referrals?.referralLink && (
                      <div className='flex gap-2 items-center'>
                        <div className='flex-1 p-2 text-sm truncate rounded-md bg-muted'>
                          {dashboardData.referrals.referralLink}
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            copyToClipboard(
                              dashboardData.referrals.referralLink || '',
                              'Referral link copied'
                            )
                          }
                        >
                          Copy
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )} */}

          {/* Overview and Recent Activity - Only show for verified users */}
          {isVerified && (
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className='h-[300px] w-full' />
                  ) : (
                    <StateMap
                      state='Maharashtra'
                      dist='Raigarh'
                      totalMembers={dashboardData?.totalMembersState}
                    />
                  )}
                </CardContent>
              </Card>
              <Card className='lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    {isLoading ? (
                      <Skeleton className='h-4 w-48' />
                    ) : (
                      `You made ${dashboardData?.referrals?.totalReferrals} Referrals this month.`
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className='space-y-4'>
                      <Skeleton className='h-12 w-full' />
                      <Skeleton className='h-12 w-full' />
                    </div>
                  ) : dashboardData?.wallet?.recentTransactions?.length > 0 ? (
                    dashboardData.wallet.recentTransactions.map(
                      (transaction) => (
                        <div
                          key={transaction.id}
                          className='mb-2 flex items-center justify-between rounded-md border p-2'
                        >
                          <div>
                            <p className='font-medium'>
                              {transaction.description}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div
                            className={`font-bold ${transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {transaction.type === 'CREDIT' ? '+' : '-'}₹
                            {transaction.amount}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className='py-4 text-center text-muted-foreground'>
                      No recent transactions
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Main>
    </>
  )
}
