import appQr from '@/assets/appQR.svg';
import bppPhone from '@/assets/mockups/bppPhone.png';
import HeaderComponent from '@/components/HeaderComponent';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/layout/Layout';
import { QrCode } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaAndroid } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
                text="Download Our BPP android App Today"
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
                            Community Contribution
                            <br />
                            Financial Support Anywhere, Anytime.
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Start by simply downloading the App for community contribution, right at your fingertips.
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
                            <p className='text-muted-foreground text-semibold text-sm text-center'>version: 1.0</p>
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
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6">
                            WHY USE THIS APP ?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Bharatiya Popular Party is India’s first political party to launch an App that brings people together to support each other in their medical, legal, social and education needs.
                        </p>
                        <div className="text-center mb-8">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                We invite you to join this movement by downloading the App.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4">How You Can Help</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                By joining this App you can Contribute, Donate, and Extend necessary help to each other during emergencies or urgent situations.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Our Objectives</h3>
                            <p className="text-gray-600 text-semibold dark:text-gray-700">
                                Our objective of launching the App is to support individuals in times of need or urgencies like medical, legal, social, and educational. To achieve the objectives we have designed some goals: equal opportunities and gender equality, national integrity, good health and well-being, standing against the misuse of muscle and money power, upholding secularism, promoting employment and economic growth, and fostering justice, peace, and calm, etc.
                            </p>
                        </Card>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                        <h3 className="text-4xl text-center font-bold mb-6">Frequently Asked Questions</h3>
                        <div className="gap-6">
                            <div className="w-full max-w-4xl mx-auto p-4">
                                <Accordion type="single" collapsible defaultValue="item-1" className="space-y-2">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-base font-medium">
                                            What is the Bharatiya Popular Party’s App?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                <span className="text-blue-500">Bharatiya Popular Party’s</span>  App provides users with detailed information about the party's ideology, leadership,  <span className="text-blue-500">vision</span>,{' '} and policies. {' '}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-base font-medium">
                                            What services does the App provide?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                App allows people to join the party, register as members, or stay updated on party’s activities. The app enables the members to ‘seek’ aid and assistance and to ‘contribute’ to the community, through its <span className="text-blue-500">‘community-contribution’</span> platform.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger className="text-base font-medium">
                                            How can I apply for financial aid through the app?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                For applying for various services or support, you need to be registered as Primary member of the party. All the primary members can seek or extend assistance through the app. Here is the link to understand the procedure:- https://bppindia.com/community-contribution/how-it-works
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-4">
                                        <AccordionTrigger className="text-base font-medium">
                                            How do I download the BPP App?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                You can download the app by scanning the QR code above or simply <a href="https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk" className="text-blue-600 underline">click here to download</a>.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-5">
                                        <AccordionTrigger className="text-base font-medium">
                                            How do I install the app on Android devices?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                After downloading the BPP App, follow these steps to install it on your Android device:
                                            </p>
                                            <ul className="list-disc list-inside text-gray-600">
                                                <li>Locate the downloaded file in your "Downloads" folder or notification panel.</li>
                                                <li>Tap the file to start the installation process.</li>
                                                <li>If prompted, enable installation from unknown sources in your device's settings.</li>
                                                <li>Follow the on-screen instructions to complete the installation.</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-6">
                                        <AccordionTrigger className="text-base font-medium">
                                            How do I reset my password?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                To reset your password, follow these steps:
                                            </p>
                                            <ol className="list-decimal list-inside text-gray-600">
                                                <li>Go to the <Link to="/auth/forgot-password" className="text-blue-600 underline">Forgot Password</Link> page.</li>
                                                <li>Enter your registered email address or phone number.</li>
                                                <li>Click <strong>"Submit"</strong> to receive a password reset link or code.</li>
                                                <li>Follow the instructions sent to your email or phone to reset your password.</li>
                                                <li>Create a new password and log in to your account.</li>
                                            </ol>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-7">
                                        <AccordionTrigger className="text-base font-medium">
                                            Can I volunteer for party activities through the app?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                Yes, you can volunteer for party activities through the app, provided all the requirements are fulfilled to be an active member.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-8">
                                        <AccordionTrigger className="text-base font-medium">
                                            How can I donate to the party using the app?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                Using the ‘Payment gateway’ at the Party’s app, you can make payment of your membership fees, annual contribution to ‘community-contribution’ and any donation that you want to give to the party.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-9">
                                        <AccordionTrigger className="text-base font-medium">
                                            How do I change my personal information in the app?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                To change your personal information, follow these steps:
                                            </p>
                                            <ol className="list-decimal list-inside text-gray-600">
                                                <li>Log in to your dashboard by visiting <Link to="/auth/login" className="text-blue-600 underline">login</Link>.</li>
                                                <li>Once logged in, navigate to the <strong>Profile</strong> section on the left-hand menu.</li>
                                                <li>Update your profile details as needed and save your changes.</li>
                                            </ol>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="text-center mt-8">
                        <p className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                            Start enrolling today
                        </p>
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
                            We are confident that together, we can make a difference. So join the App and be the part of change.
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