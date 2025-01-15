import bppPhone from '@/assets/bppPhone.png';
import HeaderComponent from '@/components/HeaderComponent';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/Layout';
import { Download, Smartphone } from 'lucide-react';

const DownloadAppPage = () => {
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
            <section className="container mx-auto px-4 sm:px-8 md:px-12">
                <div>
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h1 className="text-4xl font-bold leading-tight">
                                    Come Together to Connect,
                                    <br />
                                    Contribute, and Support Each Other
                                </h1>
                                <p className="text-gray-400 text-md">
                                    Start by simply downloading the app for community contribution, right at your fingertips.
                                </p>

                                <div className="flex flex-wrap  gap-4">
                                    <Button
                                        variant="outline" size='sm' className='flex gap-3'
                                        onClick={() => window.location.href = 'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'}
                                    >
                                        <Smartphone className="h-8" />
                                        <div className="text-left">
                                            <div className="text-md">Android</div>
                                            <div className="text-xs text-gray-400">Version: 1.0</div>
                                        </div>
                                        <Download />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src={bppPhone}
                                    alt="Trading Interface"
                                    className="rounded-lg  w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DownloadAppPage;