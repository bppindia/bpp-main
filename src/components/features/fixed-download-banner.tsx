import bppLogo from '@/assets/logo/bppLogo.svg';
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const FixedDownload = () => {
    const [showBanner, setShowBanner] = useState(false);

    // Check if the banner should be shown
    useEffect(() => {
        const isClosed = localStorage.getItem("fixedDownloadClosed");
        if (!isClosed && window.innerWidth <= 1024) { // Show for devices with width <= 1024px (tablet/mobile)
            setShowBanner(true);
        }
    }, []);

    const handleClose = () => {
        setShowBanner(false);
        localStorage.setItem("fixedDownloadClosed", "true"); // Persist the closed state in localStorage
    };

    if (!showBanner) return null; // Do not render if the banner is not visible

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <img
                                src={bppLogo}
                                alt="QR Code"
                                className="w-16 h-16"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-xs">Download BPP App</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Scan QR code or click to download</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => window.location.href = 'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'}
                            className="flex items-center gap-2 bg-[#2196f3] hover:bg-[#1e40af] text-white"
                        >
                            <span>Download</span>
                        </Button>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FixedDownload;
