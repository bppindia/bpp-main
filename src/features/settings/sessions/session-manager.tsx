import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { Session } from '@/types/api'
import { Laptop, Smartphone, Tablet, Monitor } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const SessionManager = () => {
  const { getActiveSessions, revokeSession, revokeAllOtherSessions } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)
  const [revokingSession, setRevokingSession] = useState<string | null>(null)
  const [revokingAll, setRevokingAll] = useState(false)

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true)
      const activeSessions = await getActiveSessions()
      setSessions(activeSessions || [])
    } catch (_error) {
      toast.error('Failed to load active sessions')
      setSessions([])
    } finally {
      setLoading(false)
    }
  }, [getActiveSessions])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  const handleRevokeSession = async (sessionId: string) => {
    try {
      setRevokingSession(sessionId)
      await revokeSession(sessionId)
      await fetchSessions()
      toast.success('Session revoked successfully')
    } catch (_error) {
      toast.error('Failed to revoke session')
    } finally {
      setRevokingSession(null)
    }
  }

  const handleRevokeAllOtherSessions = async () => {
    try {
      setRevokingAll(true)
      await revokeAllOtherSessions()
      await fetchSessions()
      toast.success('All other sessions revoked successfully')
    } catch (_error) {
      toast.error('Failed to revoke all other sessions')
    } finally {
      setRevokingAll(false)
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile':
        return <Smartphone className='h-5 w-5' />
      case 'tablet':
        return <Tablet className='h-5 w-5' />
      case 'desktop':
        return <Monitor className='h-5 w-5' />
      default:
        return <Laptop className='h-5 w-5' />
    }
  }

  // Skeleton loading component
  const SessionSkeleton = () => (
    <div className='flex items-center justify-between rounded-lg border p-4'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-48' />
          <Skeleton className='h-3 w-32' />
          <Skeleton className='h-3 w-40' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
      <Skeleton className='h-9 w-20' />
    </div>
  )

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          Active Sessions
        </h2>
        <Button
          variant='outline'
          onClick={handleRevokeAllOtherSessions}
          disabled={revokingAll || sessions.length <= 1}
        >
          {revokingAll ? 'Revoking...' : 'Revoke All Other Sessions'}
        </Button>
      </div>

      {loading ? (
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <SessionSkeleton key={i} />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <p className='text-center text-muted-foreground'>No active sessions</p>
      ) : (
        <div className='space-y-4'>
          {sessions.map((session) => (
            <div
              key={session._id}
              className='flex items-center justify-between rounded-lg border p-4'
            >
              <div className='flex items-center space-x-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                  {getDeviceIcon(session.deviceType)}
                </div>
                <div>
                  <p className='font-medium'>
                    {session.deviceType} - {session.location}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Last active: {format(new Date(session.lastActiveAt), 'PPp')}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Expires: {format(new Date(session.expiresAt), 'PPp')}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    IP: {session.ipAddress}
                  </p>
                </div>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleRevokeSession(session._id)}
                disabled={revokingSession === session._id}
              >
                {revokingSession === session._id ? 'Revoking...' : 'Revoke'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SessionManager
