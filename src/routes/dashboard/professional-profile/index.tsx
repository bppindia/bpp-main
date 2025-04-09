import ProfessionalProfile from '@/features/profile/professionals'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/professional-profile/')({
  component: ProfessionalProfile,
})


