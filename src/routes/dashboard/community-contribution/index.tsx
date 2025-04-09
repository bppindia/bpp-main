import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/community-contribution/')({
  component: ComingSoon,
})
