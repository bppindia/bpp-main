import { createFileRoute } from '@tanstack/react-router'
import UpliftmentOfFarmersPage from '@/pages/about/goals/upliftment-of-farmers/index.tsx'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/upliftment-of-farmers/'
)({
  component: UpliftmentOfFarmersPage,
})
