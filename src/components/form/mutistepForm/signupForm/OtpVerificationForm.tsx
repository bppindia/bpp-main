import { OtpStyledInput } from "@/components/features/otp-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormWrapper } from "./FormWrapper";

type OtpVerificationData = {
    otpNumber: string;
    email?: string;
    phone?: string;
};

type OtpVerificationProps = OtpVerificationData & {
    updateFields: (fields: Partial<OtpVerificationData>) => void;
};

export function OtpVerificationForm({ otpNumber, email, phone, updateFields }: OtpVerificationProps) {
    const [timer, setTimer] = useState(120);
    const [showResend, setShowResend] = useState(false);
    const { sendOtp } = useAuth();

    const handleResendOTP = async () => {
        try {
            if (email) {
                await sendOtp(email, 'email'); // Send email OTP
            } else if (phone) {
                const formattedPhoneNumber = `+91${phone}`;
                await sendOtp(formattedPhoneNumber, 'phoneNumber'); // Send phone OTP
            }
            setTimer(120);
            setShowResend(false);
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again.");
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setShowResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleOtpComplete = (value: string) => {
        updateFields({ otpNumber: value });
    };

    function maskEmail(email: string): string {
        const [username, domain] = email.split('@');
        if (!username || !domain) return email;
        return `${username.charAt(0)}${'*'.repeat(username.length - 2)}${username.charAt(username.length - 1)}@${domain}`;
    }

    function maskPhoneNumber(phone: string): string {
        if (phone.length < 4) return phone;
        return `${phone.slice(0, 2)}${'*'.repeat(phone.length - 4)}${phone.slice(-2)}`;
    }

    return (
        <FormWrapper title="OTP Verification">
            {email && (
                <Label className="text-center">
                    Enter OTP sent to your email:{" "}
                    {maskEmail(email)}
                </Label>
            )}
            {phone && (
                <Label className="text-center">
                    Enter OTP sent to your phone:{" "}
                    {maskPhoneNumber(phone)}
                </Label>
            )}
            <div className="space-y-4">
                <OtpStyledInput
                    numInputs={6}
                    inputType="number"
                    value={otpNumber}
                    onChange={handleOtpComplete}
                />
                <div className="text-sm text-center text-gray-500">
                    Time remaining: {formatTime(timer)}
                </div>
                {showResend && (
                    <Button
                        type="button"
                        variant="link"
                        className="w-full text-blue-600"
                        onClick={handleResendOTP}
                    >
                        Resend OTP
                    </Button>
                )}
            </div>
        </FormWrapper>
    );
}
