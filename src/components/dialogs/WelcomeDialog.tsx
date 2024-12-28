import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WelcomeDialog = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    useEffect(() => {
        // Open dialog automatically when component renders
        setIsOpen(true);
    }, []);

    useEffect(() => {
        // Trigger confetti when dialog opens
        if (isOpen) {
            handleClick();
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-extrabold text-purple-700 text-center mb-2">
                        🎉 Congratulations!!!
                    </DialogTitle>
                    <DialogDescription className="text-lg font-medium text-gray-700 text-center">
                        You have successfully joined the Bharatiya Popular Party.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 px-2 text-gray-600">
                    <p className="text-base leading-relaxed">
                        To become a primary member and unlock access to our services, a fee of{" "}
                        <span className="font-bold text-blue-600">Rs. 5/-</span> is applicable. This will grant you access to the platform and enable you to avail benefits, including counselling on legal, professional, and educational matters.
                    </p>
                    <p className="mt-4 italic text-md text-muted-foreground">
                        Payments will be accepted very soon, once the payment gateway is set up.
                    </p>
                </div>

                <DialogFooter className="mt-6 flex justify-between">
                    <Button
                        variant="outline"
                        className="border-gray-400 text-gray-600 hover:text-gray-900"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:from-purple-700 hover:to-blue-600"
                        onClick={() => {
                            navigate("/dashboard/add-fund");
                        }}
                    >
                        Pay Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WelcomeDialog;
