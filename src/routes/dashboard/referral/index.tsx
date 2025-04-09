import Referral from '@/features/referral'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/referral/')({
  component: Referral,
})

