import HeaderComponent from '@/components/HeaderComponent';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/layout/Layout';
import { Mail, Phone } from 'lucide-react';

export default function Complaints() {
    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            description: "For any complaints or grievances, please write to us at bpp.headoffice@gmail.com",
            action: "Send Email",
            link: "mailto:bpp.headoffice@gmail.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Helpline",
            description: "For urgent matters, you may also contact our Helpline No. 9920200996, available 24hours.",
            action: "Call Now",
            link: "tel:9920200996"
        }
    ];

    return (
        <Layout>
            <HeaderComponent
                heading="COMPLAINTS"
                text="We value your feedback"
                breadcrumbLinks={[
                    { label: "Home", href: "/" },
                    { label: "Complaints", href: "/complaints" }
                ]}
                imgUrl={"null"}
            />
            <div className="max-w-7xl mx-auto p-6">
                {/* Main Info Card */}
                <Card className="mb-8 shadow-lg dark:bg-gray-800/50 backdrop-blur-sm border dark:border-gray-700">
                    <CardContent className="p-8">
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            We are committed to resolving all complaints in a fair, timely and transparent manner and you
                            will receive an acknowledgment of your complaint within 7 days.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We value your feedback and are dedicated to ensuring the smooth functioning.
                        </p>
                    </CardContent>
                </Card>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 gap-6">
                    {contactMethods.map((method, index) => (
                        <Card 
                            key={index}
                            className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800/50 backdrop-blur-sm border dark:border-gray-700"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-full bg-[#e85b33]/10 text-[#e85b33] group-hover:bg-[#e85b33] group-hover:text-white transition-colors duration-300">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {method.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {method.description}
                                        </p>
                                    </div>
                                </div>
                                <Button 
                                    className="w-full bg-[#e85b33] hover:bg-[#e85b33]/90"
                                    onClick={() => window.location.href = method.link}
                                >
                                    {method.action}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
}