import appQr from '@/assets/appQR.svg';
import laptopImg from '@/assets/mockups/laptop.png';
import phoneImg from '@/assets/mockups/phone.png';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import { FaAndroid } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { Input } from '../ui/input';
import NumberTicker from '../ui/number-ticker';
import { useTranslation } from 'react-i18next';

const DownloadSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('homePage');

    return (
        <div className="w-full bg-background dark:bg-gray-900 transition-colors">
            <div className="p-6 md:p-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Image Section */}
                    <div>
                        <div
                            className="mx-auto rounded-3xl overflow-hidden dark:border-gray-700"
                            style={{ height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <img
                                src={phoneImg}
                                alt="bpp phone"
                                id="previewImage"
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                        <Tabs
                            defaultValue="mobile"
                            className="w-full md:w-[380px] mx-auto mt-4"
                            onValueChange={(value) => {
                                const previewImage = document.getElementById('previewImage') as HTMLImageElement;
                                if (value === 'desktop') {
                                    previewImage.src = laptopImg;
                                } else {
                                    previewImage.src = phoneImg;
                                }
                            }}
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="mobile"> {t('DownloadQr.section1')}</TabsTrigger>
                                <TabsTrigger value="desktop"> {t('DownloadQr.section2')}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Right Column - Download Section */}
                    <div className="flex flex-col space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                    <NumberTicker
                                        initialValue={103786}
                                        incrementOptions={[2, 3, 4]}
                                        delay={3}
                                        className="text-blue-600 dark:text-white"
                                    />
                                    {' '} {t('DownloadQr.header')}
                                </h1>
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                    {t('DownloadQr.subheader')}
                                </h2>
                            </div>
                        </div>

                        <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            {t('DownloadQr.heading')}
                        </h1>

                        {/* QR Code */}
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border p-2">
                                <img src={appQr} alt="App QR Code" className="max-w-full max-h-full" />
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <p className="text-gray-600 font-bold text-sm dark:text-gray-400">
                                    {t('DownloadQr.scanTxt')}
                                </p>
                                <div className='flex flex-row md:flex-row gap-2'>
                                    <Button
                                        onClick={() => window.location.href = 'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'}
                                        className="flex items-center gap-3 justify-center p-4 bg-[#2196f3] hover:bg-[#1e40af] text-white"
                                    >
                                        <FaAndroid className="w-6 h-6 text-white" />
                                        <p className="text-left">{t('DownloadQr.buttonTxt')}</p>
                                    </Button>
                                    <Button
                                        className="flex items-center gap-3 justify-center p-4 bg-[#2196f3] hover:bg-[#1e40af] text-white" onClick={() => navigate('/download-app')}
                                    >
                                        <ArrowRightIcon className="w-6 h-6 text-white" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* How it works Button */}
                        <div
                            className={cn(
                                "group inline-block max-w-sm rounded-full border border-black/5 bg-neutral-100 text-base text-black font-bold transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                            )}
                            onClick={() => navigate('/community-contribution/how-it-works')}
                        >
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                <span className="text-sm font-bold">{t('DownloadQr.contribution')}</span>
                                <ArrowRightIcon className="ml-1 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                            </AnimatedShinyText>
                        </div>

                        {/* Signup Input */}
                        <div className="max-w-md">
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder={t('DownloadQr.placeholder')}
                                    className="flex-1"
                                />
                                <Button onClick={() => navigate('/auth/signup')} className="bg-blue-600 hover:bg-blue-900 text-white">
                                    {t('DownloadQr.button')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadSection;
