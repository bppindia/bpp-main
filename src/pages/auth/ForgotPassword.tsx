import bppLogo from '@/assets/images/logos/Bpp.png';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Schema for form validation
const emailSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    phone: z.string().regex(/^\+91\d{10}$/, 'Invalid phone number').optional(),
}).refine((data) => data.email || data.phone, {
    message: "Either email or phone is required"
});

const resetSchema = z.object({
    otp: z.string().length(4, 'OTP must be 4 digits'),
    newPassword: z.string(),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [contactInfo, setContactInfo] = useState({ type: '', value: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialForm = useForm<{ email?: string; phone?: string }>({
        resolver: zodResolver(emailSchema)
    });

    const resetForm = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            otp: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const handleInitialSubmit = async (values: { email?: string; phone?: string }) => {
        try {
            const formData = new FormData();
            if (values.email) {
                formData.append('email', values.email);
            } else if (values.phone) {
                formData.append('phone', values.phone);
            }

            const response = await fetch('https://api.bppindia.com:8443/api/v1/forgot-password', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to send OTP');

            setContactInfo({
                type: values.email ? 'email' : 'phone',
                value: (values.email || values.phone)!
            });
            setStep(2);
            toast.success('OTP sent successfully');
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
            console.error(error);
        }
    };

    interface ResetFormValues {
        otp: string;
        newPassword: string;
        confirmPassword: string;
    }

    const handleResetSubmit = async (values: ResetFormValues) => {
        try {
            // Construct URL with query parameters
            const queryParams = new URLSearchParams();
            queryParams.append('otp', values.otp);
            queryParams.append('newPassword', values.newPassword);

            // Add either email or phone parameter
            if (contactInfo.type === 'email') {
                queryParams.append('email', contactInfo.value);
            } else {
                queryParams.append('phone', contactInfo.value);
            }

            const url = `https://api.bppindia.com:8443/api/v1/reset-password?${queryParams.toString()}`;

            const response = await fetch(url, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('Failed to reset password');

            toast.success('Password reset successfully');
            // Redirect to login or show success message
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
            console.error(error);
        }
    };

    return (
        <section className="flex items-center justify-center h-screen mx-auto rounded-none md:rounded-3xl md:p-8 py-10">
            <Card className="mx-auto p-4 border-gray-300 w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center justify-center text-xl font-bold text-blue-800">
                        <img
                            src={bppLogo}
                            alt=""
                            className="w-[120px] object-contain rounded-lg"
                        />
                    </div>
                    <h2 className="text-2xl font-black text-center text-neutral-800 dark:text-neutral-200">
                        <div>Welcome to</div>
                        <div style={{ color: '#79A5F2' }}>Bharatiya Popular Party</div>
                    </h2>
                    <CardTitle className="text-lg">Reset Password</CardTitle>
                    <CardDescription>
                        {step === 1 ?
                            'Enter your email or phone number to receive OTP' :
                            'Enter the OTP and your new password'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 ? (
                        <Form {...initialForm}>
                            <form onSubmit={initialForm.handleSubmit(handleInitialSubmit)} className="space-y-4">
                                <FormField
                                    control={initialForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter email"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-center my-2">OR</p>
                                <FormField
                                    control={initialForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+91 Phone number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full mt-4">
                                    Send OTP
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...resetForm}>
                            <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} className="space-y-4">
                                <FormItem>
                                    <FormLabel>{contactInfo.type === 'email' ? 'Email' : 'Phone'}</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={contactInfo.value}
                                            disabled
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormField
                                    control={resetForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>OTP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter 4-digit OTP"
                                                    maxLength={4}
                                                    type="text"
                                                    inputMode="numeric"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={resetForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter new password"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={resetForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm new password"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full mt-4">
                                    Reset Password
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default ResetPassword;
