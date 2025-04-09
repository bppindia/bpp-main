import MultiStepForm from '@/pages/auth/signupForm'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/sign-up')({
  component: MultiStepForm,
})
