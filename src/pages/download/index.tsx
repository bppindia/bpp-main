import appQr from '@/assets/appQR.svg';
import bppPhone from '@/assets/mockups/bppPhone.png';
import HeaderComponent from '@/components/HeaderComponent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/layout/Layout';
import { QrCode } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaAndroid } from 'react-icons/fa';

const DownloadAppPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showAbove, setShowAbove] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHovered && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;
            setShowAbove(spaceBelow < 200 && spaceAbove > spaceBelow);
        }
    }, [isHovered]);

    return (
        <Layout>
            <HeaderComponent
                heading="Download BPP App"
                text="Download Our BPP android app Today"
                breadcrumbLinks={[
                    { label: "Home", href: "/" },
                    { label: "Download", href: "/download-app" },
                ]}
                imgUrl={"null"}
            />

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold leading-tight">
                            Come Together to Connect,
                            <br />
                            Contribute, and Support Each Other
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Start by simply downloading the app for community contribution, right at your fingertips.
                        </p>
                        <div
                            className="relative inline-block"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            ref={buttonRef}
                        >
                            <Button
                                onClick={() => window.location.href = 'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'}
                                className="flex items-center gap-3 justify-center p-6 bg-[#2196f3] hover:bg-[#1e40af] text-white"
                            >
                                <FaAndroid className="w-8 h-8" />
                                <p>Android<br /> Download</p>
                                <QrCode className="h-6 w-6" />
                            </Button>
                            {isHovered && (
                                <Card
                                    className={`absolute ${showAbove ? 'bottom-full mb-2' : 'top-full mt-2'} p-4 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-200 ease-in-out z-50`}
                                >
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
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src={bppPhone}
                            alt="BPP Dashboard"
                            className="rounded-lg w-full"
                        />
                    </div>
                </div>
            </section>
            <Separator />
            {/* Why Use Section */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6">
                            WHY USE THIS APP ?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Bharatiya Popular Party is India’s first political party to launch an app that brings people together to support each other in their medical, legal, social and education needs.
                        </p>
                        <div className="text-center mb-8">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                We invite you to join this movement by downloading the app.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4">How You Can Help</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                By joining this app you can Contribute, Donate, and Extend necessary help to each other during emergencies or urgent situations.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Our Objectives</h3>
                            <p className="text-gray-600 text-semibold dark:text-gray-700">
                                Our objective of launching the app is to support individuals in times of need or urgencies like medical, legal, social, and educational. To achieve the objectives we have designed some goals: equal opportunities and gender equality, national integrity, good health and well-being, standing against the misuse of muscle and money power, upholding secularism, promoting employment and economic growth, and fostering justice, peace, and calm, etc.
                            </p>
                        </Card>
                    </div>

                    {/* <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-6">Our Goals</h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                "Equal opportunities and gender equality",
                                "National integrity",
                                "Good health and well-being",
                                "Standing against misuse of power",
                                "Upholding secularism",
                                "Promoting employment and economic growth",
                                "Fostering justice, peace, and calm"
                            ].map((goal, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                                    <p className="text-gray-700 dark:text-gray-300">{goal}</p>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <div className="text-center mt-12">
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
                            We are confident that together, we can make a difference. So join the app and be the part of change.
                        </p>
                        <Button
                            onClick={() => window.location.href = 'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'}
                            className="bg-[#2196f3] mx-2 hover:bg-[#1e40af] text-white"
                        >
                            Join Now
                        </Button>
                        <Button
                            onClick={() => window.location.href = 'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'}
                            className="bg-[#2196f3] mx-2 hover:bg-[#1e40af] text-white"
                        >
                            Download Now
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DownloadAppPage;