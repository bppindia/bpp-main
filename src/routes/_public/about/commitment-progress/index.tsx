import { createFileRoute } from '@tanstack/react-router'
import CommitmentToProgress from '@/pages/about/commitment-progress/index.tsx'

export const Route = createFileRoute('/_public/about/commitment-progress/')({
  component: CommitmentToProgress,
})
