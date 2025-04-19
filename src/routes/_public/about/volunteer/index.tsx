import { createFileRoute } from '@tanstack/react-router'
import Volunteer from '@/pages/about/volunteer/index.tsx'

export const Route = createFileRoute('/_public/about/volunteer/')({
  component: Volunteer,
})
