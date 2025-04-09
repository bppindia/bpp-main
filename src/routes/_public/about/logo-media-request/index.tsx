import { createFileRoute } from '@tanstack/react-router'
import LogoMediaRequest from '@/pages/about/LogoMediaRequest'

export const Route = createFileRoute('/_public/about/logo-media-request/')({
  component: LogoMediaRequest,
})
