import { useEffect, useRef, useCallback } from 'react'
import { User } from '@/types/auth'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'

interface UseWebSocketProps {
  user: User | null
  getActiveSessions: () => Promise<void>
}

export const useWebSocket = ({
  user,
  getActiveSessions,
}: UseWebSocketProps) => {
  const socketRef = useRef<Socket | null>(null)

  const connect = useCallback(() => {
    if (!user) return

    const socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      // Connect session
      socket.emit('session:connect', {
        sessionId: localStorage.getItem('sessionId'),
        userId: user._id,
      })
    })

    socket.on('session:activated', (data) => {
      toast.success('Session activated!', {
        description: `Device: ${data.deviceType}, Location: ${data.location}`,
      })
      getActiveSessions()
    })

    socket.on('session:reconnected', (data) => {
      toast.success('Session reconnected!', {
        description: `Device: ${data.deviceType}, Location: ${data.location}`,
      })
      getActiveSessions()
    })

    socket.on('session:created', () => {
      getActiveSessions()
    })

    socket.on('session:updated', () => {
      getActiveSessions()
    })

    socket.on('session:revoked', (data) => {
      if (data.sessionId === localStorage.getItem('sessionId')) {
        toast.error('Your session has been revoked')
        // Handle logout or redirect
      }
      getActiveSessions()
    })

    socket.on('sessions:revoked', () => {
      getActiveSessions()
    })

    socket.on('error', (error) => {
      toast.error(error.message || 'WebSocket connection error')
    })

    socketRef.current = socket

    // Set up heartbeat
    const heartbeatInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit('session:heartbeat', {
          sessionId: localStorage.getItem('sessionId'),
        })
      }
    }, 30000)

    // Handle tab closure
    const handleBeforeUnload = () => {
      if (socket.connected) {
        socket.emit('session:status', {
          sessionId: localStorage.getItem('sessionId'),
          status: 'offline',
        })
        socket.disconnect()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearInterval(heartbeatInterval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      socket.disconnect()
    }
  }, [user, getActiveSessions])

  useEffect(() => {
    const cleanup = connect()
    return () => {
      cleanup?.()
    }
  }, [connect])

  return socketRef.current
}
