import GoalsPage from '@/features/goals'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/goal/')({
  component: GoalsPage,
})


