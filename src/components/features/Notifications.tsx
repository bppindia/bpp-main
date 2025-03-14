import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Bell, Check, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useNavigate } from 'react-router-dom'

type Notification = {
    id: number
    message: string
    date: string
    unread: boolean
    href: string
}

// Mock API call (replace with your actual API)
const fetchNotifications = async (): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        { id: 1, message: "New campaign launched", date: "2025-03-12", unread: true, href: "/dashboard/campaigns/123" },
        { id: 2, message: "Query #Q123 pending", date: "2025-03-11", unread: false, href: "/dashboard/queries/Q123" },
    ]
}

export const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate() 

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications()
                setNotifications(data)
            } catch (error) {
                console.error('Failed to fetch notifications:', error)
            } finally {
                setLoading(false)
            }
        }
        loadNotifications()
    }, [])

    const handleReadAll = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })))
        // Optional: await updateNotificationsReadStatus()
    }

    const handleClearAll = () => {
        setNotifications([])
        // Optional: await clearAllNotifications()
    }

    const handleClearNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id))
        // Optional: await deleteNotification(id)
    }

    const handleNotificationClick = (href: string) => {
        navigate(href) // Navigate using React Router
    }

    const hasUnread = notifications.some(n => n.unread)

    return (
        <TooltipProvider>
            <Tooltip>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                {hasUnread && (
                                    <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
                                )}
                            </Button>
                        </TooltipTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        {loading ? (
                            <DropdownMenuItem className="justify-center text-muted-foreground">
                                Loading...
                            </DropdownMenuItem>
                        ) : notifications.length === 0 ? (
                            <DropdownMenuItem className="justify-center text-muted-foreground">
                                No notifications
                            </DropdownMenuItem>
                        ) : (
                            <>
                                {notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className="flex items-center justify-between py-2 cursor-pointer"
                                        onSelect={() => handleNotificationClick(notification.href)} // Trigger navigation
                                    >
                                        <div className="flex flex-col">
                                            <span className={notification.unread ? 'font-semibold' : ''}>
                                                {notification.message}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {notification.date}
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-6 h-6"
                                            onClick={(e) => {
                                                e.stopPropagation() // Prevent navigation when clicking clear
                                                handleClearNotification(notification.id)
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="sr-only">Clear notification</span>
                                        </Button>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <div className="flex justify-between p-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleReadAll}
                                        disabled={!hasUnread}
                                    >
                                        <Check className="w-4 h-4 mr-1" />
                                        Read All
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearAll}
                                        disabled={notifications.length === 0}
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Clear All
                                    </Button>
                                </div>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <TooltipContent>
                    <p>Notifications</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}