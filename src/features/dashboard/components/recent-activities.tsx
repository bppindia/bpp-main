import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardData } from '@/hooks/use-dashboard-data'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow, format } from 'date-fns'
import { LogIn, CreditCard, UserCheck, AlertCircle, Calendar, Clock, CheckCircle2, XCircle, Clock4 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface RecentActivitiesProps {
  dashboardData: DashboardData
  isLoading: boolean
}

interface Activity {
  _id: string
  activityType: string
  details: Record<string, unknown>
  status: string
  createdAt: string
}

export function RecentActivities({ dashboardData, isLoading }: RecentActivitiesProps) {
  if (isLoading) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your recent account activities and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'LOGIN':
        return <LogIn className="h-5 w-5 text-blue-500" />
      case 'ACTIVE MEMBERSHIP':
        return <CreditCard className="h-5 w-5 text-purple-500" />
      case 'PRIMARY MEMBERSHIP':
        return <UserCheck className="h-5 w-5 text-green-500" />
      case 'PAYMENT':
        return <CreditCard className="h-5 w-5 text-amber-500" />
      case 'REFERRAL':
        return <UserCheck className="h-5 w-5 text-indigo-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'PENDING':
        return <Clock4 className="h-4 w-4 text-yellow-500" />
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'FAILED':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  const formatActivityDetails = (activity: Activity) => {
    switch (activity.activityType) {
      case 'LOGIN':
        return `Logged in via ${activity.details.loginMethod as string}`
      case 'ACTIVE MEMBERSHIP':
        if (activity.details.membershipNumber) {
          return `Active Membership ${activity.details.membershipNumber as string} (${activity.details.membershipType as string})`
        } else if (activity.details.amount) {
          return `Active Membership payment of ₹${activity.details.amount as number}`
        }
        return 'Active Membership activity'
      case 'PRIMARY MEMBERSHIP':
        if (activity.details.membershipNumber) {
          return `Primary Membership ${activity.details.membershipNumber as string} (${activity.details.membershipType as string})`
        } else if (activity.details.amount) {
          return `Primary Membership payment of ₹${activity.details.amount as number}`
        }
        return 'Primary Membership activity'
      case 'PAYMENT':
        return `Payment of ₹${activity.details.amount as number} for ${activity.details.purpose as string}`
      case 'REFERRAL':
        return `Referred ${activity.details.referredName as string} (${activity.details.referredEmail as string})`
      default:
        return activity.activityType
    }
  }

  const formatActivityMetadata = (activity: Activity) => {
    const metadata = []

    if (activity.details.device) {
      metadata.push(`Device: ${activity.details.device as string}`)
    }

    if (activity.details.location) {
      metadata.push(`Location: ${activity.details.location as string}`)
    }

    if (activity.details.ipAddress) {
      metadata.push(`IP: ${activity.details.ipAddress as string}`)
    }

    return metadata.join(' • ')
  }

  // Group activities by date
  const groupActivitiesByDate = () => {
    const groups: Record<string, Activity[]> = {}

    dashboardData.recentActivities.forEach(activity => {
      const date = new Date(activity.createdAt)
      const dateKey = format(date, 'yyyy-MM-dd')

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].push(activity)
    })

    return groups
  }

  const activityGroups = groupActivitiesByDate()

  return (
    <Card className="lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your recent account activities and transactions</CardDescription>
        </div>
        <Badge variant="outline" className="font-medium">
          {dashboardData.recentActivities.length} activities
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(activityGroups).length > 0 ? (
            Object.entries(activityGroups).map(([dateKey, activities]) => (
              <div key={dateKey} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">
                    {format(new Date(dateKey), 'EEEE, MMMM d, yyyy')}
                  </h3>
                </div>
                <Separator className="my-2" />
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity._id}
                      className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="rounded-full bg-muted p-2.5">
                        {getActivityIcon(activity.activityType)}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {formatActivityDetails(activity)}
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className={`flex items-center gap-1 ${getStatusColor(activity.status)}`}>
                                  {getStatusIcon(activity.status)}
                                  <span>{activity.status}</span>
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Activity status: {activity.status}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {formatActivityMetadata(activity) && (
                          <p className="text-xs text-muted-foreground">
                            {formatActivityMetadata(activity)}
                          </p>
                        )}

                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                          </span>
                          <span className="mx-1">•</span>
                          <span>
                            {format(new Date(activity.createdAt), 'h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-medium">No recent activities</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your recent activities will appear here
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 