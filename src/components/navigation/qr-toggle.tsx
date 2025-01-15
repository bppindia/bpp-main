import appQr from '@/assets/appQR.svg';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRToggle = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Button
                variant="ghost"
                className="p-2"
            >
                <Download size={18} />
            </Button>

            {isHovered && (
                <Card className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4  bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-200 ease-in-out z-50">
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={appQr}
                            alt="QR Code"
                            className="w-40 h-40"
                        />
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                            Scan to Download App
                            <br />
                            Android
                        </p>
                        <Button size='sm' className="bg-[#e85a32] hover:bg-[#e85a32] text-white text-xs rounded-full"
                            onClick={() => navigate('/download-app')}>
                            More Download Options
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default QRToggle;