import ResetPassword from '@/pages/auth/ForgotPassword'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/forgot-password')({
  component: ResetPassword,
})
