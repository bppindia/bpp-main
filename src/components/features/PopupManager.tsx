import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { usePopup } from '@/context/popup-context';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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


    const handlePayment = () => {
        setTimeout(() => {
            setShowPaymentPopup(false);
            toast.success('Payment of 5 INR completed!');
        }, 1000);
    };

    return (
        <>
            <Dialog open={showVerificationPopup} onOpenChange={setShowVerificationPopup}>
                <DialogContent className="sm:max-w-[425px] rounded-lg bg-gradient-to-br from-blue-50 to-white shadow-xl border border-blue-200">
                    <DialogHeader className="pt-6 pb-4 px-6">
                        <div className="flex items-center justify-center mb-4">
                            <Users className="h-10 w-10 text-blue-600" /> {/* Replace with your BPP logo */}
                        </div>
                        <DialogTitle className="text-2xl font-bold text-center text-blue-800">
                            Welcome to <span className="text-blue-600">Bharatiya Popular Party!</span>
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-600 font-medium">
                            Your Verification is Pending
                        </DialogDescription>
                    </DialogHeader>
                    <div className="px-6">
                        <DialogDescription className="text-center text-gray-700 leading-relaxed">
                            Thank you for joining the <span className="font-semibold text-blue-600">Bharatiya Popular Party</span>.
                            Your verification is currently pending. We'll notify you once it’s complete—stay tuned!
                        </DialogDescription>
                    </div>
                    <DialogFooter className="px-6 py-6 flex justify-center">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/dashboard/profile')}
                            className={cn(
                                "w-full sm:w-auto bg-blue-600 text-white border-none hover:bg-blue-700",
                                "transition-all duration-200 ease-in-out transform hover:scale-105"
                            )}
                        >
                            Go to Profile
                        </Button>
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