import Transactions from '@/features/wallet/Transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/wallet/transactions/')({
  component: Transactions,
})


