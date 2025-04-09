import DonationPage from '@/features/donate/Donation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/donate/add-donation/')({
  component: DonationPage,
})


