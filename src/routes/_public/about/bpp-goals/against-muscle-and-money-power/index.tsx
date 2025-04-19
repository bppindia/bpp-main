import { createFileRoute } from '@tanstack/react-router'
import MuscleAndMoneyPowerPage from '@/pages/about/goals/against-muscle-and-money-power/index.tsx'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/against-muscle-and-money-power/'
)({
  component: MuscleAndMoneyPowerPage,
})
