import Donate from '@/features/donate'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/donate/')({
  component: Donate,
})


