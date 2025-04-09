import { createFileRoute } from '@tanstack/react-router'
import AddFund from '@/features/wallet/AddFund'

export const Route = createFileRoute('/dashboard/wallet/add-fund/')({
  component: AddFund,
})
