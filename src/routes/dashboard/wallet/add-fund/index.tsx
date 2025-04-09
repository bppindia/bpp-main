import AddFund from '@/features/wallet/AddFund'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/wallet/add-fund/')({
  component: AddFund,
})


