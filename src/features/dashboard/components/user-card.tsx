import { memo } from 'react'
import { cn } from '@/lib/utils'
import { UserRole, UserStatus } from '@/utils/roleAccess'
import { useAuth } from '@/context/AuthContext'
import { DashboardData } from '@/hooks/use-dashboard-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Define user card styles based on role and status
type CardStyle = {
  bg: string
  border: string
  badgeVariant: 'secondary' | 'outline' | 'default' | 'destructive'
  badgeText: string
  badgeStyle: string
}

type UserCardStyles = {
  [UserStatus.PROCESSING]: CardStyle
  [UserStatus.APPROVED]: {
    [UserRole.MEMBER]: CardStyle
    [UserRole.PRIMARY_MEMBER]: CardStyle
    [UserRole.ACTIVE_MEMBER]: CardStyle
  }
}

const userCardStyles: UserCardStyles = {
  [UserStatus.PROCESSING]: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-700',
    badgeVariant: 'outline',
    badgeText: 'Verification Pending',
    badgeStyle:
      'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-400 dark:border-red-800',
  },
  [UserStatus.APPROVED]: {
    [UserRole.MEMBER]: {
      bg: 'bg-blue-50 dark:bg-blue-900/50',
      border: 'border-blue-200 dark:border-blue-700',
      badgeVariant: 'outline',
      badgeText: 'Verified',
      badgeStyle:
        'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-400 dark:border-green-800',
    },
    [UserRole.PRIMARY_MEMBER]: {
      bg: 'bg-blue-100 dark:bg-blue-900/50',
      border: 'border-blue-300 dark:border-blue-700',
      badgeVariant: 'outline',
      badgeText: 'Primary Member',
      badgeStyle:
        'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-800',
    },
    [UserRole.ACTIVE_MEMBER]: {
      bg: 'bg-red-100 dark:bg-red-900/50',
      border: 'border-red-300 dark:border-red-700',
      badgeVariant: 'outline',
      badgeText: 'Active Member',
      badgeStyle:
        'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-400 dark:border-purple-800',
    },
  },
} as const

interface UserCardProps {
  dashboardData: DashboardData
  isLoading: boolean
}

const UserCard = memo(({ dashboardData, isLoading }: UserCardProps) => {
  const { user: authUser } = useAuth()
  const isPrimaryMember = dashboardData.user.role === UserRole.PRIMARY_MEMBER
  const isActiveMember = dashboardData.user.role === UserRole.ACTIVE_MEMBER

  const getRemainingDays = () => {
    if (!dashboardData.membership?.expiryDate) return null
    
    const expiryDate = new Date(dashboardData.membership.expiryDate)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays > 0 ? diffDays : 0
  }

  // Get the appropriate style based on user status and role
  const getCardStyle = (): CardStyle => {
    if (dashboardData.user.status === UserStatus.PROCESSING) {
      return userCardStyles[UserStatus.PROCESSING]
    }

    if (dashboardData.user.status === UserStatus.APPROVED) {
      if (isActiveMember) {
        return userCardStyles[UserStatus.APPROVED][UserRole.ACTIVE_MEMBER]
      } else if (isPrimaryMember) {
        return userCardStyles[UserStatus.APPROVED][UserRole.PRIMARY_MEMBER]
      } else {
        return userCardStyles[UserStatus.APPROVED][UserRole.MEMBER]
      }
    }

    return userCardStyles[UserStatus.PROCESSING]
  }

  const cardStyle = getCardStyle()
  const remainingDays = getRemainingDays()

  const renderUserInfo = () => {
    if (isLoading) {
      return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {[...Array(7)].map((_, index) => (
            <div key={index} className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-6 w-32' />
            </div>
          ))}
        </div>
      )
    }

    if (
      dashboardData.user.status === UserStatus.PROCESSING ||
      !dashboardData.membership
    ) {
      return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <p className='text-sm text-muted-foreground'>Email</p>
            <p className='truncate'>{dashboardData.user.email || 'N/A'}</p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Phone</p>
            <p className='truncate'>{dashboardData.user.phone || 'N/A'}</p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Date of Birth</p>
            <p className='truncate'>
              {dashboardData.user.dateOfBirth
                ? new Date(dashboardData.user.dateOfBirth).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Occupation</p>
            <p className='truncate'>{dashboardData.user.occupation || 'N/A'}</p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>State</p>
            <p className='truncate'>
              {dashboardData.user.address.state || 'N/A'}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>District</p>
            <p className='truncate'>
              {dashboardData.user.address.district || 'N/A'}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>City/Village</p>
            <p className='truncate'>
              {dashboardData.user.address.cityOrVillage || 'N/A'}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
        <div>
          <p className='text-sm text-muted-foreground'>Membership ID</p>
          <p className='truncate font-medium'>
            {dashboardData.membership?.number || 'N/A'}
          </p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Membership Type</p>
          <p className='truncate font-medium'>
            {dashboardData.user?.role || 'N/A'}
          </p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Membership Validity</p>
          <p className='truncate font-medium'>
            {dashboardData.membership?.expiryDate
              ? new Date(
                  dashboardData.membership.expiryDate
                ).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Wallet Balance</p>
          <p className='truncate font-medium'>
            ₹{dashboardData?.wallet?.balance || 0}
          </p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Location</p>
          <p className='truncate font-medium'>
            {dashboardData?.user?.address?.state || 'N/A'} (
            {dashboardData?.user?.address?.district || 'N/A'})
          </p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Referral Code</p>
          <p className='truncate font-medium'>
            {dashboardData?.referrals?.referralCode || 'N/A'}
          </p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Total Referrals</p>
          <p className='truncate font-medium'>
            {dashboardData?.referrals?.successfulReferrals || 'N/A'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Card
        className={cn('mb-6 overflow-hidden', cardStyle.bg, cardStyle.border)}
      >
        <CardContent className='p-4 sm:p-6'>
          <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-start'>
            {isLoading ? (
              <Skeleton className='h-24 w-24 rounded-full sm:h-32 sm:w-32' />
            ) : (
              <Avatar className='h-24 w-24 shrink-0 sm:h-32 sm:w-32'>
                <AvatarImage
                  src={
                    typeof authUser?.profilePicture === 'string'
                      ? authUser.profilePicture
                      : undefined
                  }
                  alt={dashboardData.user.firstName}
                />
                <AvatarFallback>
                  {dashboardData.user.firstName.charAt(0)}
                  {dashboardData.user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}

            <div className='w-full flex-1 space-y-4'>
              <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                {isLoading ? (
                  <Skeleton className='h-8 w-48' />
                ) : (
                  <>
                    <h2 className='truncate text-xl font-bold sm:text-2xl'>
                      {dashboardData.user.title} {dashboardData.user.firstName}{' '}
                      {dashboardData.user.middleName
                        ? `${dashboardData.user.middleName} `
                        : ''}
                      {dashboardData.user.lastName}
                    </h2>
                  </>
                )}
                {!isLoading && (
                  <div className='flex flex-col items-end gap-1'>
                    <Badge
                      variant={cardStyle.badgeVariant}
                      className={cn(
                        'shrink-0 whitespace-nowrap',
                        cardStyle.badgeStyle
                      )}
                    >
                      {cardStyle.badgeText}
                    </Badge>
                    {(isPrimaryMember || isActiveMember) && remainingDays !== null && (
                      <span className='text-sm text-muted-foreground font-medium'>
                        {remainingDays} days remaining
                      </span>
                    )}
                  </div>
                )}
              </div>
              {renderUserInfo()}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
})

UserCard.displayName = 'UserCard'

export default UserCard
