import EmploymentAndEconomicGrowth from '@/pages/about/goals/employment-and-economic-growth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/employment-and-economic-growth/',
)({
  component: EmploymentAndEconomicGrowth,
})

