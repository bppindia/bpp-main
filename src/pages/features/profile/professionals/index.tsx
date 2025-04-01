import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
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
import { Main } from '@/components/layout/dashboard/main';
import { useEffect, useState } from 'react';

// Zod schema for professional profile
const professionalProfileSchema = z.object({
    qualification: z.string().min(2, { message: 'Qualification must be at least 2 characters.' }),
    profession: z.enum(['medical', 'lawyer', 'engineer', 'social-worker'], { required_error: 'Please select a profession.' }),
    position: z.string().min(2, { message: 'Position must be at least 2 characters.' }),
    expertise: z.string().min(2, { message: 'Expertise must be at least 2 characters.' }),
    currentExpertise: z.string().min(2, { message: 'Current expertise must be at least 2 characters.' }),
    education: z.string().min(2, { message: 'Education must be at least 2 characters.' }),
    university: z.string().min(2, { message: 'University must be at least 2 characters.' }),
    degree: z.string().min(2, { message: 'Degree must be at least 2 characters.' }),
    passoutYear: z.number().min(1900, { message: 'Passout year must be after 1900.' }).max(new Date().getFullYear()),
    quality: z.string().min(2, { message: 'Quality must be at least 2 characters.' }),
    linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL.' }).optional().or(z.literal('')),
    portfolio: z.string().url({ message: 'Please enter a valid portfolio URL.' }).optional().or(z.literal('')),
    skills: z.string().min(4, { message: 'Skills must be at least 4 characters.' }).max(500),
    references: z.string().min(4, { message: 'References must be at least 4 characters.' }).max(500),
    // Note: File upload (documents) is not included here due to complexity with react-hook-form; handle separately if needed
});

type ProfessionalProfileValues = z.infer<typeof professionalProfileSchema>;

// Default values
const defaultValues: Partial<ProfessionalProfileValues> = {
    qualification: '',
    profession: 'medical',
    position: '',
    expertise: '',
    currentExpertise: '',
    education: '',
    university: '',
    degree: '',
    passoutYear: new Date().getFullYear(),
    quality: '',
    linkedin: '',
    portfolio: '',
    skills: '',
    references: '',
};

// Mock API calls (replace with real endpoints)
const fetchProfessionalProfile = async (): Promise<ProfessionalProfileValues> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        qualification: 'Masters in Chemistry',
        profession: 'engineer',
        position: 'Senior Developer',
        expertise: 'Software Development',
        currentExpertise: 'React Developer',
        education: 'B.Tech',
        university: 'IIT Bombay',
        degree: 'Bachelor\'s',
        passoutYear: 2020,
        quality: 'Leadership',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        portfolio: 'https://johndoeportfolio.com',
        skills: 'Team Management, Python, Data Analysis',
        references: 'Recommended by Jane Smith, Senior Manager at TechCorp.',
    };
};

const updateProfessionalProfile = async (data: ProfessionalProfileValues): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Professional profile updated:', data);
};

export default function ProfessionalProfile() {
    const [loading, setLoading] = useState(true);

    const form = useForm<ProfessionalProfileValues>({
        resolver: zodResolver(professionalProfileSchema),
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profileData = await fetchProfessionalProfile();
                form.reset(profileData);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load professional profile data.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [form]);

    const onSubmit = async (data: ProfessionalProfileValues) => {
        try {
            await updateProfessionalProfile(data);
            toast({
                title: 'Professional Profile Updated',
                description: 'Your professional profile has been successfully updated.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update professional profile.',
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
                            <h1 className="text-2xl font-bold">Professional Profile Settings</h1>
                            <p className="text-sm text-muted-foreground">Manage your professional information for the political party.</p>
                        </div>
                        <Button
                            type="submit"
                            form="professional-profile-form"
                            disabled={form.formState.isSubmitting || loading}
                            className="w-full sm:w-auto"
                        >
                            {form.formState.isSubmitting ? 'Saving...' : 'Update Professional Profile'}
                        </Button>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted-foreground">Loading professional profile...</div>
                    ) : (
                        <Form {...form}>
                            <form id="professional-profile-form" onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-8">
                                {/* Basic Information */}
                                <section>
                                    <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <FormField
                                            control={form.control}
                                            name="qualification"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Qualification</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="profession"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Profession</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your profession" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="medical">Medical</SelectItem>
                                                            <SelectItem value="lawyer">Lawyer</SelectItem>
                                                            <SelectItem value="engineer">Engineer</SelectItem>
                                                            <SelectItem value="social-worker">Social Worker</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="position"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Position</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., Manager, Team Lead" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </section>

                                {/* Expertise */}
                                <section>
                                    <h2 className="mb-4 text-lg font-semibold">Expertise</h2>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="expertise"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Expertise</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., Software Development, Healthcare" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="currentExpertise"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Current Expertise</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., React Developer, Cardiologist" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </section>

                                {/* Education Details */}
                                <section>
                                    <h2 className="mb-4 text-lg font-semibold">Education Details</h2>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <FormField
                                            control={form.control}
                                            name="education"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Education</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., MBBS, LLB, MSW" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="university"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>University</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., Harvard University" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="degree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Degree</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., Doctorate, Bachelor's" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="passoutYear"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Passout Year</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                                                            placeholder="E.g., 2020"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="quality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Quality</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="E.g., Leadership, Creativity" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </section>

                                {/* Social Media Links */}
                                <section>
                                    <h2 className="mb-4 text-lg font-semibold">Social Media Links</h2>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="linkedin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>LinkedIn Profile (optional)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="url" placeholder="E.g., https://www.linkedin.com/in/username" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="portfolio"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Portfolio (optional)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="url" placeholder="E.g., https://portfolio.example.com" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </section>

                                {/* Professional Skills and References */}
                                <section>
                                    <h2 className="mb-4 text-lg font-semibold">Skills and References</h2>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="skills"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Professional Skills</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            rows={3}
                                                            placeholder="List your key professional skills (e.g., Team Management, Python, Data Analysis)"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="references"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>References/Recommendations</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            rows={3}
                                                            placeholder="Provide professional references or recommendations"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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