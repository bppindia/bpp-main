import Membership from '@/features/membership'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/membership/')({
  component: Membership,
})

