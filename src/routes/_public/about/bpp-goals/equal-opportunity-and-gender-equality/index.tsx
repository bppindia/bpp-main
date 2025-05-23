import { createFileRoute } from '@tanstack/react-router'
import EqualOpportunityAndGenderEqualityPage from '@/pages/about/goals/equal-opportunity-and-gender-equality/index.tsx'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/equal-opportunity-and-gender-equality/'
)({
  component: EqualOpportunityAndGenderEqualityPage,
})
