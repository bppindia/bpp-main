import { createFileRoute } from '@tanstack/react-router'
import QualityEducationPage from '@/pages/about/goals/quality-education/index.tsx'
export const Route = createFileRoute(
  '/_public/about/bpp-goals/quality-education/',
)({
  component: QualityEducationPage,
})

