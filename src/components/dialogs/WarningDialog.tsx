import alert from "@/assets/gifs/alert.gif";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const WarningDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className="sm:max-w-[500px] pt-16 border-red-700 border-4 bg-white">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="rounded-full border-4 border-red-700 p-2 bg-white flex justify-center items-center">
                        <img src={alert} alt="Alert" className="w-20 h-20 sm:w-24 sm:h-24" />
                    </div>
                </div>
                <DialogHeader className="mt-8">
                    <DialogTitle className="text-2xl sm:text-4xl font-extrabold text-center">
                        Welcome To Bharatiya Popular Party!
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-lg font-medium text-gray-700 text-center">
                        Your Verification is Pending
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 px-2 text-gray-600">
                    <p className="text-base leading-relaxed">
                        Thank you for joining bharatiya popular party. Your verification is pending. You will be notified once your verification is done.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WarningDialog;
