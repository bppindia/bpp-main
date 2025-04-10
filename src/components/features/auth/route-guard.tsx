import { useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { toast } from 'sonner'
import { hasAccess } from '@/utils/roleAccess'
import { useAuth } from '@/context/AuthContext'

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname

    if (user && !hasAccess(user, currentPath)) {
      toast.error('You do not have permission to access this page')
      navigate({ to: '/dashboard' })
    }
  }, [user, location.pathname, navigate])

  return <>{children}</>
}
