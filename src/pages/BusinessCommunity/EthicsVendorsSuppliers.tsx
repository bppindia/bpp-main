import HeaderComponent from "@/components/HeaderComponent";
import { Separator } from "@/components/ui/separator";
import Layout from "@/layout/Layout";
import { CheckCircle, ClipboardCheck, DollarSign, HandshakeIcon, Heart, Smile } from "lucide-react";

const EthicsVendorsSuppliers = () => {
    return (
        <Layout>
            <HeaderComponent
                heading="Ethics of Vendors and Suppliers"
                text="Ethics of Vendors and Suppliers"
                breadcrumbLinks={[
                    { label: "Business Community", href: "/" },
                    { label: "Ethics & Vendor Suppliers", href: "/business-community/ethics" },
                ]}
                imgUrl={"null"}
            />
            <section className="w-full py-8 relative dark:bg-gray-800">

                {/* Header Section */}
                <div className="container px-4 mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <HandshakeIcon className="h-8 w-8 text-[#e85a32]" />
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
                            Ethics of Vendors and Suppliers
                        </h1>
                    </div>

                    {/* Introduction */}
                    <div className="max-w-fu mb-12 text-gray-700 dark:text-gray-300 space-y-4">
                        <p>
                            At Bharatiya Popular Party, we believe that our vendors and suppliers play a crucial role in building a supportive and compassionate community. To ensure the well-being of our members and society, we uphold the highest ethical standards and trust that all our partners will act with integrity, fairness, and respect.
                        </p>
                    </div>

                    {/* Ethical Principles Section */}
                    <div className="mb-12 space-y-6">
                        <h2 className="text-2xl font-bold dark:text-white">
                            Ethical Principles for Vendors and Suppliers
                        </h2>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Principle 1 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-[#e85a32] p-4 flex items-center gap-2">
                                    <DollarSign className="h-6 w-6 text-white" />
                                    <h3 className="text-lg font-semibold text-white">Reasonable Pricing</h3>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        We trust that all vendors will charge fair and reasonable rates for their services, ensuring that our members have access to affordable solutions without financial burdens.
                                    </p>
                                </div>
                            </div>

                            {/* Principle 2 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-[#e85a32] p-4 flex items-center gap-2">
                                    <CheckCircle className="h-6 w-6 text-white" />
                                    <h3 className="text-lg font-semibold text-white">Honesty and Transparency</h3>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Vendors should always be truthful regarding their commitments and capabilities, maintaining clear communication about services, pricing, and timelines to build trust and credibility.
                                    </p>
                                </div>
                            </div>

                            {/* Principle 3 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-[#e85a32] p-4 flex items-center gap-2">
                                    <ClipboardCheck className="h-6 w-6 text-white" />
                                    <h3 className="text-lg font-semibold text-white">Sincerity in Service</h3>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Bharatiya Popular Party vendors must be dedicated to providing the best possible services with professionalism and care, ensuring that members' needs are met diligently.
                                    </p>
                                </div>
                            </div>

                            {/* Principle 4 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-[#e85a32] p-4 flex items-center gap-2">
                                    <Smile className="h-6 w-6 text-white" />
                                    <h3 className="text-lg font-semibold text-white">Cordial and Understanding Approach</h3>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Vendors are encouraged to maintain a respectful and understanding approach with members, helping create a supportive environment.
                                    </p>
                                </div>
                            </div>

                            {/* Principle 5 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-[#e85a32] p-4 flex items-center gap-2">
                                    <Heart className="h-6 w-6 text-white" />
                                    <h3 className="text-lg font-semibold text-white">Sympathy and Compassion</h3>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Vendors should show empathy and compassion, especially when assisting members facing challenging situations, creating a community of care and support.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Conclusion */}
                    <div className="border-t pt-8 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            By adhering to these ethical guidelines, Bharatiya Popular Party vendors and suppliers help create a compassionate community that benefits both businesses and individuals alike.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
                            Together, we can ensure that everyone in our network receives the support and care they deserve.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-[#e85a32] text-white font-medium rounded-lg hover:bg-[#e85a32]/90 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EthicsVendorsSuppliers;
