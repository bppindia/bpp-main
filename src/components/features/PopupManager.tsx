import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { usePopup } from '@/context/popup-context';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const PopupManager: React.FC = () => {
    const { user, updateVerification } = useAuth();
    const { showVerificationPopup, setShowVerificationPopup, showPaymentPopup, setShowPaymentPopup } = usePopup();
    const navigate = useNavigate();

    // Show verification popup if user is unverified on mount
    useEffect(() => {
        if (user && !user.isVerified && !showVerificationPopup) {
            setShowVerificationPopup(true);
        }
    }, []);

    // Simulate verification and payment (replace with real API calls)
    const handleVerify = () => {
        setTimeout(() => {
            updateVerification(true);
            setShowVerificationPopup(false);
            setShowPaymentPopup(true); // Show payment popup after verification
            toast.success('Account verified!');
        }, 1000);
    };

    const handlePayment = () => {
        setTimeout(() => {
            setShowPaymentPopup(false);
            toast.success('Payment of 5 INR completed!');
        }, 1000);
    };

    return (
        <>
            {/* Verification Popup */}
            <Dialog open={showVerificationPopup} onOpenChange={setShowVerificationPopup}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Verification Pending</DialogTitle>
                        <DialogDescription>
                            Your account is not yet verified. Please complete the verification process to unlock all dashboard features.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => navigate('/dashboard/profile')}>
                            Go to Profile
                        </Button>
                        <Button onClick={handleVerify}>Verify Now</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Payment Popup */}
            <Dialog open={showPaymentPopup} onOpenChange={setShowPaymentPopup}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Complete Your Membership</DialogTitle>
                        <DialogDescription>
                            Your account is now verified! Please make a payment of 5 INR to activate your membership.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPaymentPopup(false)}>
                            Later
                        </Button>
                        <Button onClick={handlePayment}>Pay Now</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PopupManager;