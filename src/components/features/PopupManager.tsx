// src/components/features/PopupManager.tsx
import { postData } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/popup-context";
import { cn } from "@/lib/utils";
import { Users, CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import bppLogo from '@/assets/logo/bppLogo.svg'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const paymentSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  transactionId: z.string().min(1, "Transaction ID is required"),
  screenshot: z.instanceof(File, { message: "Payment screenshot is required" }).refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "File size must be less than 5MB"
  ),
});

export const PopupManager: React.FC = () => {
  const { user, fetchUserData, updateUser } = useAuth();
  const { showVerificationPopup, setShowVerificationPopup, showPaymentPopup, setShowPaymentPopup, paymentSubmitted, setPaymentSubmitted } = usePopup();
  const navigate = useNavigate();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    accountName: "",
    bankName: "",
    ifscCode: "",
    transactionId: "",
    screenshot: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch user data on mount or when user changes
  useEffect(() => {
    if (user?._id) {
      fetchUserData(); // Refresh user data to ensure latest status
    }
  }, [user?._id, fetchUserData]);

  // Control popup visibility based on user state
  useEffect(() => {
    if (!user) return;

    // Show verification popup if account is still processing
    if (!user.isVerified || user.status === "PROCESSING") {
      setShowVerificationPopup(true);
      setShowPaymentPopup(true);
    }
    // Show payment popup if account is approved but payment is pending
    else if (user.isVerified && user.status === "APPROVED" && user.role === "MEMBER" && !paymentSubmitted) {
      setShowVerificationPopup(false);
      setShowPaymentPopup(true);
    }
    // Hide both popups if payment is submitted or membership is active
    else {
      setShowVerificationPopup(false);
      setShowPaymentPopup(false);
    }
  }, [user, showVerificationPopup, showPaymentPopup, paymentSubmitted, setShowVerificationPopup, setShowPaymentPopup]);

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPaymentData((prev) => ({ ...prev, screenshot: file }));
  };

  const handlePaymentSubmit = async () => {
    try {
      const validatedData = paymentSchema.parse(paymentData);
      setErrors({});

      const formData = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await postData(`/users/${user?._id}/submit-membership-payment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPaymentSubmitted(true);
      setShowPaymentPopup(false);
      setShowPaymentForm(false);
      toast.success("Payment submitted for approval! You'll be notified once approved.");
      
      // Refresh user data after payment submission
      await fetchUserData();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
      } else {
        toast.error(error.message || "Failed to submit payment");
      }
    }
  };

  return (
    <>
      {/* Verification Popup */}
      <Dialog open={showVerificationPopup} onOpenChange={setShowVerificationPopup}>
        <DialogContent className="sm:max-w-[425px] rounded-lg bg-gradient-to-br from-blue-50 to-white shadow-xl border border-blue-200">
          <DialogHeader className="pt-6 pb-4 px-6">
            <div className="flex items-center justify-center mb-4">
              <img src={bppLogo} alt="BPP Logo" className="w-[120px] object-contain rounded-lg" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-blue-800">
              Welcome to <span className="text-blue-600">Bharatiya Popular Party!</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 font-medium">
              Account Verification Pending
            </DialogDescription>
          </DialogHeader>
          <div className="px-6">
            <DialogDescription className="text-center text-gray-700 leading-relaxed">
              Your account is under verification, which may take up to 48 hours. We'll notify you via email or SMS once it’s approved!
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Popup */}
      <Dialog open={showPaymentPopup} onOpenChange={setShowPaymentPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center">Complete Your Membership</DialogTitle>
            <DialogDescription className="text-center">
              {showPaymentForm
                ? "Please provide payment details to activate your Primary Membership (5 INR)."
                : "Your account is approved! Pay Rs.5.00 to become a Primary Member."}
            </DialogDescription>
          </DialogHeader>
          {showPaymentForm ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountName">Account Name <span className="text-red-500">*</span></Label>
                <Input
                  id="accountName"
                  name="accountName"
                  placeholder="Account Name"
                  value={paymentData.accountName}
                  onChange={handlePaymentInputChange}
                />
                {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName}</p>}
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name <span className="text-red-500">*</span></Label>
                <Input
                  id="bankName"
                  name="bankName"
                  placeholder="Bank Name"
                  value={paymentData.bankName}
                  onChange={handlePaymentInputChange}
                />
                {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code <span className="text-red-500">*</span></Label>
                <Input
                  id="ifscCode"
                  name="ifscCode"
                  placeholder="IFSC Code"
                  value={paymentData.ifscCode}
                  onChange={handlePaymentInputChange}
                />
                {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
              </div>
              <div>
                <Label htmlFor="transactionId">Transaction ID <span className="text-red-500">*</span></Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  placeholder="Transaction ID"
                  value={paymentData.transactionId}
                  onChange={handlePaymentInputChange}
                />
                {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
              </div>
              <div>
                <Label htmlFor="screenshot">Payment Screenshot <span className="text-red-500">*</span></Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
              </div>
            </div>
          ) : null}
          <DialogFooter className="mt-4">
            {!showPaymentForm ? (
              <>
                <Button variant="outline" onClick={() => setShowPaymentPopup(false)}>
                  Later
                </Button>
                <Button onClick={() => setShowPaymentForm(true)}>Pay Now</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                  Back
                </Button>
                <Button onClick={handlePaymentSubmit}>Submit Payment</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupManager;