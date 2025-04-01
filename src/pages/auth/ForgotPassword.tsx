import bppLogo from '@/assets/images/logos/Bpp.png';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPassword = () => {
    // Form states
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactInfo, setContactInfo] = useState({ type: '', value: '' });

    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Error states
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate()

    // Validation functions
    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            setEmailError('Invalid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePhone = (value: string) => {
        const phoneRegex = /^\+91\d{10}$/;
        if (value && !phoneRegex.test(value)) {
            setPhoneError('Invalid phone number');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const validateOtp = (value: string) => {
        if (!value || value.length !== 4) {
            setOtpError('OTP must be 4 digits');
            return false;
        }
        setOtpError('');
        return true;
    };

    const validatePasswords = () => {
        let isValid = true;

        if (!newPassword) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirm Password is required');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    // Handle initial form submit (email/phone)
    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate inputs
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);

        if (!email && !phone) {
            setEmailError('Either email or phone is required');
            setPhoneError('Either email or phone is required');
            return;
        }

        if ((email && !isEmailValid) || (phone && !isPhoneValid)) {
            return;
        }

        try {
            const payload = email ? { email } : { phone };

            const response = await fetch('https://api.bppindia.com:3000/api/v1/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to send OTP');

            setContactInfo({
                type: email ? 'email' : 'phone',
                value: email || phone,
            });
            setStep(2);
            toast.success('OTP sent successfully');
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
            console.error(error);
        }
    };

    // Handle password reset form submit
    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const isOtpValid = validateOtp(otp);
        const arePasswordsValid = validatePasswords();

        if (!isOtpValid || !arePasswordsValid) {
            return;
        }

        try {
            const payload = {
                otp,
                newPassword,
                [contactInfo.type]: contactInfo.value,
            };

            const response = await fetch('https://api.bppindia.com:3000/api/v1/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to reset password');

            // Show success message
            toast.success('Password reset successfully');

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000); // 3 seconds delay
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
                        <form onSubmit={handleInitialSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input
                                    type="email"
                                    name='email'
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                />
                                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
                            </div>
                            <p className="text-center my-2">OR</p>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <Input
                                    placeholder="+91 Phone number"
                                    value={phone}
                                    name='phone'
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        validatePhone(e.target.value);
                                    }}
                                />
                                {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                            </div>
                            <Button type="submit" className="w-full mt-4">
                                Send OTP
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetSubmit} className="space-y-4">
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {contactInfo.type === 'email' ? 'Email' : 'Phone'}
                                    </label>
                                    <Input
                                        value={contactInfo.value}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">OTP</label>
                                    <Input
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        type="text"
                                        name='otp'
                                        inputMode="numeric"
                                        value={otp}
                                        onChange={(e) => {
                                            setOtp(e.target.value);
                                            validateOtp(e.target.value);
                                        }}
                                    />
                                    {otpError && <p className="text-sm text-red-500 mt-1">{otpError}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">New Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            name='newPassword'
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                if (confirmPassword) validatePasswords();
                                            }}
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
                                    {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            name='confirmPassword'
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                if (newPassword) validatePasswords();
                                            }}
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
                                    {confirmPasswordError && <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>}
                                </div>
                            </div>
                            <Button type="submit" className="w-full mt-4">
                                Reset Password
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
            <Toaster />
        </section>
    );
};

export default ResetPassword;