import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileService } from '@/services/profile.service'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ImageUpload } from '@/features/profile/components/image-upload'

type Title = 'Mr' | 'Ms' | 'Mrs' | 'Dr' | 'CA' | 'CS' | 'Adv'
type Gender = 'male' | 'female' | 'other'

const PersonalFormSchema = z.object({
  profilePicture: z.string().optional(),
  title: z.enum(['Mr', 'Ms', 'Mrs', 'Dr', 'CA', 'CS', 'Adv']).optional(),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format.',
  }),
  age: z.number().min(18, { message: 'Age must be at least 18.' }).max(120),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
})

type PersonalFormValues = z.infer<typeof PersonalFormSchema>

export default function PersonalForm() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(true)

  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(PersonalFormSchema),
    defaultValues: {
      profilePicture: user?.profilePicture?.toString() ?? '',
      title: user?.title as Title | undefined,
      firstName: user?.firstName ?? '',
      middleName: user?.middleName ?? '',
      lastName: user?.lastName ?? '',
      dateOfBirth: user?.dateOfBirth ?? '',
      age: user?.age ?? 18,
      gender: (user?.gender as Gender) ?? 'male',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        profilePicture: user.profilePicture?.toString() ?? '',
        title: user.title as Title | undefined,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        age: user.age,
        gender: user.gender as Gender,
      })
      setLoading(false)
    }
  }, [user, form])

  const handleUpdate: SubmitHandler<PersonalFormValues> = async (data) => {
    try {
      setLoading(true)

      // Handle profile picture (NON_SENSITIVE, no approval required)
      if (data.profilePicture !== user?.profilePicture) {
        const response = await profileService.requestUpdate({
          updates: { profilePicture: data.profilePicture },
          type: 'NON_SENSITIVE',
        })

        if (response.data.success && response.data.data) {
          // Update user in context (assuming backend returns updated user)
          updateUser({ ...user!, profilePicture: data.profilePicture })
          toast.success('Profile picture updated successfully')
        }
      }

      // Handle personal details (SENSITIVE, requires approval)
      const personalData = {
        title: data.title,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        gender: data.gender,
      }

      if (
        JSON.stringify(personalData) !==
        JSON.stringify({
          title: user?.title,
          firstName: user?.firstName,
          middleName: user?.middleName,
          lastName: user?.lastName,
          dateOfBirth: user?.dateOfBirth,
          age: user?.age,
          gender: user?.gender,
        })
      ) {
        const response = await profileService.requestUpdate({
          updates: { personal: personalData },
          type: 'SENSITIVE',
        })

        if (response.data.success) {
          toast.success('Personal details update request sent for approval')
        }
      } else {
        toast.info('No changes detected in personal details')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message ||
          'Failed to update personal details'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className='text-center text-muted-foreground'>
          Loading personal details...
        </div>
      ) : (
        <Form {...form}>
          <form
            id='personal-form'
            onSubmit={form.handleSubmit(handleUpdate)}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Profile Picture</h2>
                <p className='text-sm text-muted-foreground'>
                  Upload or update your profile picture (no approval required)
                </p>
              </div>
              <FormField
                control={form.control}
                name='profilePicture'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className='flex items-center gap-4'>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange('')}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className='my-6' />

            <div className='space-y-4'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Personal Details</h2>
                <p className='text-sm text-muted-foreground'>
                  Update your personal information (requires admin approval, can
                  only be updated every 3 months)
                </p>
              </div>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!!user?.title}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select title' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Mr'>Mr</SelectItem>
                          <SelectItem value='Ms'>Ms</SelectItem>
                          <SelectItem value='Mrs'>Mrs</SelectItem>
                          <SelectItem value='Dr'>Dr</SelectItem>
                          <SelectItem value='CA'>CA</SelectItem>
                          <SelectItem value='CS'>CS</SelectItem>
                          <SelectItem value='Adv'>Adv</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='middleName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='age'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select gender' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className='my-6' />

            <div className='flex justify-end'>
              <Button type='submit' disabled={loading}>
                Update personal details
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
