'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/password-input'

// Schema for password validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(_values: z.infer<typeof formSchema>) {
    try {
      // Assuming an async reset password function
      toast.success(
        'Password reset successful. You can now log in with your new password.'
      )
    } catch (_error) {
      toast.error('Failed to reset the password. Please try again.')
    }
  }

  return (
    <section className='py-28'>
      <div className='container'></div>
      <div className='flex h-full min-h-[50vh] w-full items-center justify-center px-4'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Reset Password</CardTitle>
            <CardDescription>
              Enter your new password to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <div className='grid gap-4'>
                  {/* New Password Field */}
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='grid gap-2'>
                        <FormLabel htmlFor='password'>New Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id='password'
                            placeholder='******'
                            autoComplete='new-password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem className='grid gap-2'>
                        <FormLabel htmlFor='confirmPassword'>
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            id='confirmPassword'
                            placeholder='******'
                            autoComplete='new-password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full'>
                    Reset Password
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
