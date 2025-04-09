import { createFileRoute } from '@tanstack/react-router'
import ComingSoon from '@/components/coming-soon'

export const Route = createFileRoute('/dashboard/business-community/')({
  component: ComingSoon,
})
