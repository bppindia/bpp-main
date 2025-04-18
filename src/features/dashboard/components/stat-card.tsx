import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  icon: LucideIcon
  value: number
  subValue?: number
  subText?: string | ((value: number) => string)
  isLoading?: boolean
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({
  title,
  icon: Icon,
  value,
  subValue,
  subText,
  isLoading = false,
  trend = 'neutral',
}: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="mb-2 h-8 w-24" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{value.toLocaleString()}</div>
              {trend !== 'neutral' && (
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  trend === 'up' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  {trend === 'up' ? '↑' : '↓'}
                </div>
              )}
            </div>
            {subText && (
              <p className="text-xs text-muted-foreground mt-1">
                {typeof subText === 'function' ? subText(subValue || 0) : subText}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
} 