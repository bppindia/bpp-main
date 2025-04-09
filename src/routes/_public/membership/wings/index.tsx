import { createFileRoute } from '@tanstack/react-router'
import WingsPage from '@/pages/Membership/wings'

export const Route = createFileRoute('/_public/membership/wings/')({
  component: WingsPage,
})
