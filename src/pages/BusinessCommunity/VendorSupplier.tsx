import HeaderComponent from '@/components/HeaderComponent';
import Layout from '@/layout/Layout';
import { ActivitySquare, Building2, ChevronRight, HandshakeIcon, Medal, UserCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const VendorSupplier = () => {
    const navigate = useNavigate()
    return (
        <Layout>
            <HeaderComponent
                heading="Vendor & Suppliers"
                text="Vendor & Suppliers"
                breadcrumbLinks={[
                    { label: "Home", href: "/" },
                    { label: "Business Community", href: "/" },
                    { label: "Vendor & Suppliers", href: "/business-community/vendor-suppliers" }
                ]}
                imgUrl={"null"}
            />

            <section className="py-16 relative">

                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e85a32]/10 text-[#e85a32] mb-6">
                                <HandshakeIcon className="h-5 w-5" />
                                <span className="font-medium"> Vendors and Suppliers</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 dark:text-white">
                                Essential Partners in Bharatiya Popular Party's Mission
                            </h1>
                            <div className="text-md flex flex-col gap-3 text-gray-700 dark:text-gray-300">
                                <div>
                                    At Bharatiya Popular Party, we are committed to create an ecosystem of collaboration where both members and vendors grow together. Bharatiya Popular Party is committed to facilitate an exchange of needs and services, benefiting both sides in meaningful ways.
                                </div>
                                <div>
                                    We at Bharatiya Popular Party, recognize that our vendors and suppliers are the backbone of our ability to support the community. These trusted partners play a critical role in ensuring that our members receive the services and assistance they need—quickly, efficiently, and at reasonable rates.
                                </div>
                                <div>
                                    In times of urgency, our registered vendors and suppliers are committed to provide priority service to our community members. Whether it's medical care, home services, or other essential needs, our vendors will be equipped to respond promptly and professionally.
                                </div>
                            </div>
                            <button className="mt-8 px-6 py-3 bg-[#e85a32] text-white rounded-lg hover:bg-[#e85a32]/90 transition-colors flex items-center gap-2"
                                onClick={() => navigate('/auth/business-community-join')}
                            >
                                Join Now
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            <div className="aspect-square rounded-full bg-[#e85a32]/10 animate-pulse" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <HandshakeIcon className="h-36 w-36 text-[#e85a32]" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="group hover:bg-[#e85a32]/5 p-6 rounded-xl transition-colors">
                            <ActivitySquare className="h-12 w-12 text-[#e85a32] mb-4" />
                            <h2 className="text-xl font-bold mb-3 dark:text-white">Priority Medical Services</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                One of the key areas where our vendors provide exceptional support is in medical services. In the event of a medical emergency or urgent health need, our registered medical service providers—including hospitals, clinics, and healthcare professionals—will give our members top priority.
                            </p>
                        </div>

                        <div className="group hover:bg-[#e85a32]/5 p-6 rounded-xl transition-colors">
                            <Building2 className="h-12 w-12 text-[#e85a32] mb-4" />
                            <h2 className="text-xl font-bold mb-3 dark:text-white">Vendor Benefits</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                As a registered vendor or supplier, you gain access to a dedicated network of members seeking your services. This creates a unique business opportunity—expanding your reach while helping the community. You'll have the chance to build trust with members and gain recognition and business both.
                            </p>
                        </div>

                        <div className="group hover:bg-[#e85a32]/5 p-6 rounded-xl transition-colors">
                            <UserCheck className="h-12 w-12 text-[#e85a32] mb-4" />
                            <h2 className="text-xl font-bold mb-3 dark:text-white">Member Benefits</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                When you join our community, you gain access to a network of trusted vendors and service providers who can fulfill your urgent needs. By being part of this ecosystem, you are guaranteed timely support and immediate fulfillment of your needs, all at reasonable rates.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#e85a32]/10 to-transparent p-8 rounded-2xl mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <Medal className="h-8 w-8 text-[#e85a32]" />
                            <h2 className="text-2xl font-bold dark:text-white">A Win-Win for All:</h2>
                        </div>
                        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#e85a32]" />
                                <span><span className="font-bold">Members</span> get immediate access to urgent services from trusted providers.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#e85a32]" />
                                <span><span className="font-bold">Vendors and suppliers</span> expand their business network and increase visibility within the community.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border-t pt-8 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Together, we are building a community where <span className="font-bold">everyone benefits</span>—a place where needs are met, businesses grow, and community flourish.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
                            Join Bharatiya Popular Party in creating a stronger, more connected community.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default VendorSupplier;
