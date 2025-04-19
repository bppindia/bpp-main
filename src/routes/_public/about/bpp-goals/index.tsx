import { createFileRoute } from '@tanstack/react-router'
import GoalsPage from '@/pages/about/goals/index.tsx'

export const Route = createFileRoute('/_public/about/bpp-goals/')({
  component: GoalsPage,
})
