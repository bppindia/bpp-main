'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'



function Dot({ className }: { className?: string }) {
  return (
    <svg
      width='6'
      height='6'
      fill='currentColor'
      viewBox='0 0 6 6'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden='true'
    >
      <circle cx='3' cy='3' r='3' />
    </svg>
  )
}

interface Notification {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  unread: boolean;
}

export const NotificationHeaderMenu = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='relative'
          aria-label='Open notifications'
        >
          <Bell size={13} strokeWidth={2} aria-hidden='true' />
          {unreadCount > 0 && (
            <Badge className='absolute -top-2 left-full min-w-5 -translate-x-1/2 rounded-full px-1'>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-1'>
        <div className='flex items-baseline justify-between gap-4 px-3 py-2'>
          <div className='text-sm font-semibold'>Notifications</div>
          {unreadCount > 0 && (
            <button
              className='text-xs font-medium hover:underline'
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role='separator'
          aria-orientation='horizontal'
          className='-mx-1 my-1 h-px bg-border'
        ></div>
        {notifications.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <Bell size={24} className='mb-2 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>No notifications yet</p>
            <p className='text-xs text-muted-foreground'>We'll notify you when something arrives</p>
          </div>
        ) : (
          notifications.map((notification: Notification) => (
            <div
              key={notification.id}
              className='rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent'
            >
              <div className='relative flex items-start pe-3'>
                <div className='flex-1 space-y-1'>
                  <button
                    className='text-left text-foreground/80 after:absolute after:inset-0'
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <span className='font-medium text-foreground hover:underline'>
                      {notification.user}
                    </span>{' '}
                    {notification.action}{' '}
                    <span className='font-medium text-foreground hover:underline'>
                      {notification.target}
                    </span>
                    .
                  </button>
                  <div className='text-xs text-muted-foreground'>
                    {notification.timestamp}
                  </div>
                </div>
                {notification.unread && (
                  <div className='absolute end-0 self-center'>
                    <span className='sr-only'>Unread</span>
                    <Dot />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  )
}
