import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { HeaderNav } from '@/components/layout/dashboard/header-nav';
import { Main } from '@/components/layout/dashboard/main';
import { useEffect, useState } from 'react';

// Zod schema
const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format.' }),
  age: z.number().min(18, { message: 'Age must be at least 18.' }).max(120),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Please select a gender.' }),
  addressLine1: z.string().min(5, { message: 'Address Line 1 is required.' }),
  addressLine2: z.string().optional(),
  cityOrVillage: z.string().min(2, { message: 'City or village is required.' }),
  state: z.string().min(2, { message: 'State is required.' }),
  pincode: z.string().regex(/^\d{6}$/, { message: 'Pincode must be 6 digits.' }),
  country: z.string().default('India'),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Phone number must be 10 digits.' }),
  bio: z.string().min(4, { message: 'Bio must be at least 4 characters.' }).max(160),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Default values
const defaultValues: Partial<ProfileFormValues> = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  age: 18,
  gender: 'male',
  addressLine1: '',
  cityOrVillage: '',
  state: '',
  pincode: '',
  country: 'India',
  email: '',
  phone: '',
  bio: 'I am a supporter of the party.',
  urls: [{ value: '' }],
};

// Mock API calls (replace with real endpoints)
const fetchProfile = async (): Promise<ProfileFormValues> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    age: 33,
    gender: 'male',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    cityOrVillage: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
    email: 'john.doe@example.com',
    phone: '9876543210',
    bio: 'I am a dedicated party member.',
    urls: [{ value: 'https://johndoe.com' }],
  };
};

const updateProfile = async (data: ProfileFormValues): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Profile updated:', data);
};

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        form.reset(profileData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load profile data.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile(data);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Main fixed>
        <div className="w-full mx-auto">
          <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold">Profile Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your profile information for the political party.</p>
            </div>
            <Button
              type="submit"
              form="profile-form"
              disabled={form.formState.isSubmitting || loading}
              className="w-full sm:w-auto"
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Update Profile'}
            </Button>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground">Loading profile...</div>
          ) : (
            <Form {...form}>
              <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <section>
                  <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="firstName"
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
                      name="middleName"
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
                      name="lastName"
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
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value, 10))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Address Information */}
                <section>
                  <h2 className="mb-4 text-lg font-semibold">Address Information</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cityOrVillage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City/Village</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormDescription>
                            You can manage verified emails in <Link to="/settings/email" className="text-blue-600 hover:underline">email settings</Link>.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input value="+91" disabled className="w-16" />
                              <Input {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Bio and URLs */}
                <section>
                  <h2 className="mb-4 text-lg font-semibold">Bio and Social Links</h2>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            You can <span className="font-medium">@mention</span> other users and organizations.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <FormField
                          control={form.control}
                          key={field.id}
                          name={`urls.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={cn(index !== 0 && 'sr-only')}>
                                URLs
                              </FormLabel>
                              <FormDescription className={cn(index !== 0 && 'sr-only')}>
                                Add links to your website, blog, or social media profiles.
                              </FormDescription>
                              <FormControl>
                                <Input {...field} placeholder="https://example.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ value: '' })}
                      >
                        Add URL
                      </Button>
                    </div>
                  </div>
                </section>
              </form>
            </Form>
          )}
        </div>
      </Main>
    </>
  );
}