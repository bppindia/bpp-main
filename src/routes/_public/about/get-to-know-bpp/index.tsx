import { createFileRoute } from '@tanstack/react-router'
import GetToKnow from '@/pages/about/get-to-know-bpp/index.tsx'

export const Route = createFileRoute('/_public/about/get-to-know-bpp/')({
  component: GetToKnow,
})
