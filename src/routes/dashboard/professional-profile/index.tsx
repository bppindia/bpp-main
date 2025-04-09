import { createFileRoute } from '@tanstack/react-router'
import ProfessionalProfile from '@/features/profile/professionals'

export const Route = createFileRoute('/dashboard/professional-profile/')({
  component: ProfessionalProfile,
})
