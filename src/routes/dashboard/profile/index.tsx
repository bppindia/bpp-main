import { createFileRoute } from '@tanstack/react-router'
import Profile from '@/features/profile'

export const Route = createFileRoute('/dashboard/profile/')({
  component: Profile,
})
