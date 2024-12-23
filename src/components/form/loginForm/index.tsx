import bppLogo from '@/assets/logo/bppLogo.svg';
import { LoadingButton } from '@/components/features/LoadingButton';
import {
    Card,
    CardContent,
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
import { PasswordInput } from '@/components/ui/password-input';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
    identifier: z
        .string()
        .nonempty('Email or phone number is required')
        .refine(
            (value) => /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value),
            {
                message: 'Enter a valid email or 10-digit phone number',
            }
        ),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const { watch, handleSubmit, control } = form;
    const identifierValue = watch('identifier');
    const isEmail = /\S+@\S+\.\S+/.test(identifierValue);
    const isPhone = /^\d{10}$/.test(identifierValue);

    async function onSubmit(values: LoginFormValues) {
        try {
            setIsLoading(true);
            const payload = isEmail
                ? { email: values.identifier, password: values.password }
                : { phone: values.identifier, password: values.password };

            await login(payload);

            setTimeout(() => {
                navigate('/dashboard/home');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="">
            <div className="container">
                <div className="flex flex-col justify-center h-screen gap-4">
                    <Card className="mx-auto w-full max-w-lg">
                        <CardHeader className="items-center">
                            <div className="flex items-center justify-center text-xl font-bold text-blue-800">
                                <img
                                    src={bppLogo}
                                    alt="BPP Logo"
                                    className="w-[130px] md:w-[140px] object-contain rounded-lg"
                                />
                            </div>
                            <h2 className="font-black text-2xl text-neutral-800 text-center dark:text-neutral-200">
                                <div>Welcome Back to{' '}</div>
                                <span style={{ color: '#79A5F2' }}>
                                    Bharatiya Popular Party
                                </span>
                            </h2>
                            <CardTitle className="text-md">
                                Log in with your email & phone
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid gap-4">
                                        <FormField
                                            control={control}
                                            name="identifier"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="identifier">
                                                        Email/Phone number
                                                    </FormLabel>
                                                    <div className="relative">
                                                        <FormControl>
                                                            <Input
                                                                id="identifier"
                                                                placeholder="Enter email or phone"
                                                                type="text"
                                                                autoComplete="username"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                                            {isEmail && (
                                                                <Mail
                                                                    size={16}
                                                                    strokeWidth={2}
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            {isPhone && (
                                                                <Phone
                                                                    size={16}
                                                                    strokeWidth={2}
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel htmlFor="password">
                                                            Password
                                                        </FormLabel>
                                                        <Link
                                                            to="/auth/forgot-password"
                                                            className="ml-auto hover:text-blue-950 inline-block text-sm underline"
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                    </div>
                                                    <FormControl>
                                                        <PasswordInput
                                                            id="password"
                                                            placeholder="******"
                                                            autoComplete="current-password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <LoadingButton type="submit" className="w-full" loading={isLoading}>Login</LoadingButton>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <div className="mx-auto font-semibold flex gap-1 text-sm">
                        <p>Don&apos;t have an account yet?</p>
                        <Link to="/auth/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                    <Toaster />
                </div>
            </div>
        </section>
    );
};

export default Login;
