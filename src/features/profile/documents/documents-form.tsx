import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileService } from '@/services/profile.service'
import type { User } from '@/types/auth'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ImageUpload } from '@/features/profile/components/image-upload'

interface DocumentWithUpdateCount {
  number?: string
  front?: string
  back?: string
  updateCount?: number
}

interface UserWithDocumentUpdates extends User {
  aadhaar?: DocumentWithUpdateCount
  voter?: DocumentWithUpdateCount
}

const DocumentsFormSchema = z.object({
  aadhaar: z
    .object({
      number: z
        .string()
        .regex(/^\d{12}$/, { message: 'Aadhaar number must be 12 digits.' })
        .optional(),
      front: z.string().optional(),
      back: z.string().optional(),
      updateCount: z.number().optional(),
    })
    .optional(),
  voter: z
    .object({
      number: z.string().optional(),
      front: z.string().optional(),
      back: z.string().optional(),
      updateCount: z.number().optional(),
    })
    .optional(),
})

type DocumentsFormValues = z.infer<typeof DocumentsFormSchema>

export default function DocumentsForm() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const form = useForm<DocumentsFormValues>({
    resolver: zodResolver(DocumentsFormSchema),
    defaultValues: {
      aadhaar: user?.aadhaar ?? undefined,
      voter: user?.voter ?? undefined,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        aadhaar: user.aadhaar ?? undefined,
        voter: user.voter ?? undefined,
      })
      setLoading(false)
    }
  }, [user, form])

  const handleUpdate: SubmitHandler<DocumentsFormValues> = async (data) => {
    try {
      setLoading(true)

      const userData = user as UserWithDocumentUpdates

      if (
        JSON.stringify(data.aadhaar) !== JSON.stringify(userData?.aadhaar) &&
        (userData?.aadhaar?.updateCount ?? 0) < 2
      ) {
        const response = await profileService.requestUpdate({
          updates: { aadhaar: data.aadhaar },
          type: 'SENSITIVE',
        })

        if (response.data.success) {
          toast.success('Aadhaar update request sent for approval')
        }
      } else if ((userData?.aadhaar?.updateCount ?? 0) >= 2) {
        toast.error('Aadhaar details can only be updated twice')
      }

      if (
        JSON.stringify(data.voter) !== JSON.stringify(userData?.voter) &&
        (userData?.voter?.updateCount ?? 0) < 2
      ) {
        const response = await profileService.requestUpdate({
          updates: { voter: data.voter },
          type: 'SENSITIVE',
        })

        if (response.data.success) {
          toast.success('Voter ID update request sent for approval')
        }
      } else if ((userData?.voter?.updateCount ?? 0) >= 2) {
        toast.error('Voter ID details can only be updated twice')
      }

      if (
        JSON.stringify(data.aadhaar) === JSON.stringify(userData?.aadhaar) &&
        JSON.stringify(data.voter) === JSON.stringify(userData?.voter)
      ) {
        toast.info('No changes detected in documents')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message || 'Failed to update documents'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className='text-center text-muted-foreground'>
          Loading document details...
        </div>
      ) : (
        <Form {...form}>
          <form
            id='documents-form'
            onSubmit={form.handleSubmit(handleUpdate)}
            className='space-y-8'
          >
            <div className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Aadhaar Card</h2>
                <p className='text-sm text-muted-foreground'>
                  Update your Aadhaar card details and upload images (max 2
                  updates allowed)
                </p>
              </div>
              <Separator />
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='aadhaar.number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={
                            ((user as UserWithDocumentUpdates)?.aadhaar
                              ?.updateCount ?? 0) >= 2
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Aadhaar changes require admin approval (Update count:{' '}
                        {(user as UserWithDocumentUpdates)?.aadhaar
                          ?.updateCount ?? 0}
                        /2)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='aadhaar.front'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Front Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            onRemove={() => field.onChange('')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='aadhaar.back'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Back Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            onRemove={() => field.onChange('')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator className='my-6' />

            <div className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Voter ID Card</h2>
                <p className='text-sm text-muted-foreground'>
                  Update your Voter ID card details and upload images (max 2
                  updates allowed)
                </p>
              </div>
              <Separator />
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='voter.number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voter ID Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={
                            ((user as UserWithDocumentUpdates)?.voter
                              ?.updateCount ?? 0) >= 2
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Voter ID changes require admin approval (Update count:{' '}
                        {(user as UserWithDocumentUpdates)?.voter
                          ?.updateCount ?? 0}
                        /2)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='voter.front'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Front Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            onRemove={() => field.onChange('')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='voter.back'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Back Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            onRemove={() => field.onChange('')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator className='my-6' />

            <div className='flex justify-end'>
              <Button type='submit' disabled={loading}>
                Update documents
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
