import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import bppLogo from '@/assets/images/logos/Bpp.png'
import { authService } from '@/api/authService'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'

// Form validation schemas
const initialFormSchema = z
  .object({
    email: z
      .string()
      .email('Invalid email address')
      .optional()
      .or(z.literal('')),
    phone: z
      .string()
      .regex(/^\+91\d{10}$/, 'Invalid phone number')
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      // At least one field must be filled
      return Boolean(data.email?.trim() || data.phone?.trim())
    },
    {
      message: 'Either email or phone is required',
      path: ['email'], // This will show the error under the email field
    }
  )

const resetFormSchema = z
  .object({
    otp: z.string().length(4, 'OTP must be 4 digits'),
    newPassword: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    showPassword: z.boolean().default(false),
    showConfirmPassword: z.boolean().default(false),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type InitialFormData = z.infer<typeof initialFormSchema>
type ResetFormData = z.infer<typeof resetFormSchema>

const ResetPassword = () => {
  // Form states
  const [step, setStep] = useState(1)
  const [contactInfo, setContactInfo] = useState({ type: '', value: '' })

  // Timer states
  const [timer, setTimer] = useState(300) // 5 minutes in seconds
  const [showResend, setShowResend] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Form hooks
  const initialForm = useForm<InitialFormData>({
    resolver: zodResolver(initialFormSchema),
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    },
  })

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setShowResend(true)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [step, timer])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Handle initial form submit (email/phone)
  const handleInitialSubmit = async (data: InitialFormData) => {
    try {
      setLoading(true)
      // Clean up the data before sending
      const cleanData = {
        email: data.email?.trim() || undefined,
        phone: data.phone?.trim() || undefined,
      }

      const payload = cleanData.email
        ? { email: cleanData.email }
        : { phone: cleanData.phone }
      const response = await authService.forgotPassword(payload)

      if (!response.success) {
        toast.error(response.message || 'Failed to send OTP')
        return
      }

      setContactInfo({
        type: cleanData.email ? 'email' : 'phone',
        value: cleanData.email || cleanData.phone || '',
      })
      setStep(2)
      setTimer(300) // Reset timer to 5 minutes
      setShowResend(false)
      toast.success('OTP sent successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to send OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true)
      const payload =
        contactInfo.type === 'email'
          ? { email: contactInfo.value }
          : { phone: contactInfo.value }
      const response = await authService.forgotPassword(payload)

      if (!response.success) {
        toast.error(response.message || 'Failed to resend OTP')
        return
      }

      setTimer(300) // Reset timer to 5 minutes
      setShowResend(false)
      toast.success('OTP resent successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to resend OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle password reset form submit
  const handleResetSubmit = async (data: ResetFormData) => {
    try {
      setLoading(true)
      const payload = {
        otp: data.otp,
        newPassword: data.newPassword,
        [contactInfo.type]: contactInfo.value,
      }

      const response = await authService.resetPassword(payload)

      if (!response.success) {
        toast.error(response.message || 'Failed to reset password')
        return
      }

      toast.success('Password reset successfully')
      setTimeout(() => navigate({ to: '/sign-in' }), 3000)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to reset password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='mx-auto flex min-h-screen items-center justify-center bg-background px-4 py-6 sm:p-8 md:p-10'>
      <Card className='mx-auto w-full max-w-xl border-gray-300 p-4'>
        <CardHeader>
          <div className='flex items-center justify-center text-xl font-bold text-blue-800'>
            <Link to='/'>
              <img
                src={bppLogo}
                alt='BPP Logo'
                className='w-[120px] rounded-lg object-contain'
              />
            </Link>
          </div>
          <h2 className='text-center text-2xl font-black text-neutral-800 dark:text-neutral-200'>
            <div>Welcome to</div>
            <div style={{ color: '#79A5F2' }}>Bharatiya Popular Party</div>
          </h2>
          <CardTitle className='text-lg'>Reset Password</CardTitle>
          <CardDescription>
            {step === 1
              ? 'Enter your email or phone number to receive OTP'
              : 'Enter the OTP and your new password'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form
              onSubmit={initialForm.handleSubmit(handleInitialSubmit)}
              className='space-y-4'
            >
              <div>
                <label className='mb-1 block text-sm font-medium'>Email</label>
                <Input
                  type='email'
                  {...initialForm.register('email')}
                  placeholder='Enter email'
                />
                {initialForm.formState.errors.email && (
                  <p className='mt-1 text-sm text-red-500'>
                    {initialForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <p className='my-2 text-center'>OR</p>
              <div>
                <label className='mb-1 block text-sm font-medium'>Phone</label>
                <Input
                  placeholder='+91 Phone number'
                  {...initialForm.register('phone')}
                />
                {initialForm.formState.errors.phone && (
                  <p className='mt-1 text-sm text-red-500'>
                    {initialForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <Button type='submit' className='mt-4 w-full' disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={resetForm.handleSubmit(handleResetSubmit)}
              className='space-y-4'
            >
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {contactInfo.type === 'email' ? 'Email' : 'Phone'}
                  </label>
                  <Input value={contactInfo.value} disabled />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>OTP</label>
                  <Input
                    placeholder='Enter 4-digit OTP'
                    maxLength={4}
                    type='text'
                    inputMode='numeric'
                    {...resetForm.register('otp')}
                  />
                  {resetForm.formState.errors.otp && (
                    <p className='mt-1 text-sm text-red-500'>
                      {resetForm.formState.errors.otp.message}
                    </p>
                  )}
                  <div className='mt-2 flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>
                      Time remaining: {formatTime(timer)}
                    </span>
                    {showResend && (
                      <Button
                        type='button'
                        variant='link'
                        className='h-auto p-0 text-blue-600'
                        onClick={handleResendOTP}
                        disabled={loading}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    New Password
                  </label>
                  <div className='relative'>
                    <Input
                      type={
                        resetForm.watch('showPassword') ? 'text' : 'password'
                      }
                      placeholder='Enter new password'
                      {...resetForm.register('newPassword')}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() =>
                        resetForm.setValue(
                          'showPassword',
                          !resetForm.watch('showPassword')
                        )
                      }
                    >
                      {resetForm.watch('showPassword') ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                  </div>
                  {resetForm.formState.errors.newPassword && (
                    <p className='mt-1 text-sm text-red-500'>
                      {resetForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <Input
                      type={
                        resetForm.watch('showConfirmPassword')
                          ? 'text'
                          : 'password'
                      }
                      placeholder='Confirm new password'
                      {...resetForm.register('confirmPassword')}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() =>
                        resetForm.setValue(
                          'showConfirmPassword',
                          !resetForm.watch('showConfirmPassword')
                        )
                      }
                    >
                      {resetForm.watch('showConfirmPassword') ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                  </div>
                  {resetForm.formState.errors.confirmPassword && (
                    <p className='mt-1 text-sm text-red-500'>
                      {resetForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <Button type='submit' className='mt-4 w-full' disabled={loading}>
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </section>
  )
}

export default ResetPassword
