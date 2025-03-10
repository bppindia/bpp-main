import { OtpStyledInput } from "@/components/features/otp-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormWrapper } from "./FormWrapper";

type OtpVerificationData = {
  otp: string;
  email?: string;
  phone?: string;
};

type OtpVerificationProps = OtpVerificationData & {
  updateFields: (fields: Partial<OtpVerificationData>) => void;
};

export function OtpVerificationForm({ otp, email, phone, updateFields }: OtpVerificationProps) {
  const [timer, setTimer] = useState(180);
  const [showResend, setShowResend] = useState(false);
  const { sendOtp } = useAuth();

  const identifier = email || (phone?.startsWith("+91") ? phone : `+91${phone || ""}`);

  const handleResendOTP = async () => {
    if (!identifier) {
      toast.error("No contact information provided");
      return;
    }

    try {
      await sendOtp(identifier);
      setTimer(180); 
      setShowResend(false);
      toast.success(`OTP resent successfully to your ${email ? "email" : "phone"}!`);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
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
    updateFields({ otp: value });
  };

  function maskEmail(email: string): string {
    const [username, domain] = email.split("@");
    if (!username || !domain) return email;
    return `${username.charAt(0)}${"*".repeat(username.length - 2)}${username.charAt(username.length - 1)}@${domain}`;
  }

  function maskPhoneNumber(phone: string): string {
    if (phone.startsWith("+91")) phone = phone.slice(3); // Remove +91 for masking
    if (phone.length < 4) return phone;
    return `${phone.slice(0, 2)}${"*".repeat(phone.length - 4)}${phone.slice(-2)}`;
  }

  return (
    <FormWrapper title="OTP Verification">
      {email && (
        <Label className="text-center">
          Enter OTP sent to your email: {maskEmail(email)}
        </Label>
      )}
      {phone && (
        <Label className="text-center">
          Enter OTP sent to your phone: {maskPhoneNumber(phone)}
        </Label>
      )}
      <div className="space-y-4">
        <OtpStyledInput
          numInputs={4}
          inputType="text"
          value={otp}
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