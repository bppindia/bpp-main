import flowchart3 from "@/assets/charts/bpp_flowchart3.svg";
import community from '@/assets/images/headerBanners/community.png';
import HeaderComponent from "@/components/HeaderComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/layout/Layout";
import { Briefcase, ClipboardCheck, FileText, PanelLeftDashed, PhoneCall, Scale, UserCheck, Users, Wallet } from "lucide-react";

interface ServiceProps {
    title: string;
    description: string;
    icon: JSX.Element;
}


const registrationSteps: ServiceProps[] = [
    {
        title: "1. Eligibility",
        description: "Must be a member of the community and should have real concern to seek the support.",
        icon: <UserCheck />,
    },
    {
        title: "2. Categories of Concerns",
        description: "Concerns can span a wide range of topics including: Health Issues (Any medical or healthcare-related challenges), Educational: Issues related to schooling, scholarships, or educational resources. Legal Matters: Assistance or concerns regarding rights and disputes, Social Challenges: Concerns regarding economic hardship, community welfare, etc.",
        icon: <Wallet />,
    },
    {
        title: "3. Required Details",
        description: "A clear description of the concern with relevant supporting documents. (e.g., medical certificates, school records, legal documents, etc.).",
        icon: <FileText />,
    },
    {
        title: "4. Reference",
        description: "Information regarding complete contact details, prior actions taken, etc.",
        icon: <PhoneCall />,
    },
];

const verificationSteps: ServiceProps[] = [
    {
        title: "5.	Acceptance Criteria",
        description: "Concerns meeting the following criteria may be accepted:  The issue is deemed legitimate and falls under the relevant categories (health, education, legal, etc.), Supporting documents are complete and valid, the concern meets the community's needs and is in line with the Bharatiya Popular Party goals.",
        icon: <ClipboardCheck />,
    },
    {
        title: "6.	Rejection Criteria",
        description: "Concerns may be rejected for reasons such as: Incomplete or fraudulent supporting documents., the issue does not fall within the scope of the categories served by Bharatiya Popular Party, the concern does not meet the established criteria for urgency or relevance.",
        icon: <Scale />,
    },
    {
        title: "7.	Sole Discretion of Bharatiya Popular Party Administration",
        description: "The decision to accept or reject concerns will be made at the *sole discretion* of the Bharatiya Popular Party administration. Administration will have the final authority to decide whether the concern should be addressed or not.",
        icon: <PanelLeftDashed />,
    },
];

const implementationSteps: ServiceProps[] = [
    {
        title: "8. Verification fails ",
        description: "If the verification fails (e.g., documents are found to be invalid or incomplete), the concern may be rejected.",
        icon: <Users />,
    },
    {
        title: "9. Notification",
        description: "The community member will be notified if the concern is being sent for verification or if any further documentation is required.",
        icon: <Briefcase />,
    },
];


const HowItWorks = () => {
    return (
        <Layout>
            <HeaderComponent
                heading="Community Contribution"
                text="We can't help everyone, but everyone can help someone."
                breadcrumbLinks={[
                    { label: "Home", href: "/" },
                    { label: "How It Works", href: "/community-contribution/how-it-works" }
                ]}
                imgUrl={community}
            />
            <section className="container py-8">
                <div className="container px-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl dark:text-white">
                            How Community Contribution Works
                        </h1>
                    </div>
                    <div className="my-2 text-gray-700 dark:text-gray-300 space-y-3">
                        <p>
                            Community development and support will be driven by three main groups: the Common Man, Professionals, and Business Leaders. Together, these individuals create a system that addresses and solves community issues in a collaborative manner.
                        </p>
                        <p>
                            <span className="font-semibold">'Community-Contribution'</span> services will be available starting <span className="font-semibold">January 1st, 2026.</span>
                        </p>
                    </div>

                    {/* Registration Section */}
                    <div className="grid md:grid-cols-2 gap-8 my-12">
                        <div>
                            <div>
                                <h2 className="text-xl font-extrabold tracking-tight lg:text-2xl dark:text-white mb-4">
                                    Register your Case
                                </h2>
                                <p className="mt-3 text-md text-gray-600 dark:text-gray-400 mb-6">
                                    Every member of the community, or the primary member who has any concern to address can upload that on the App.
                                </p>
                                <div className="space-y-6">
                                    {registrationSteps.map(({ icon, title, description }) => (
                                        <Card key={title} className="shadow-lg">
                                            <CardHeader className="bg-[#e85b33] text-white p-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-white/20 p-2 rounded-full">
                                                        {icon}
                                                    </span>
                                                    <CardTitle className="text-md font-bold">{title}</CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                                <p>{description}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3 mt-8">
                                <h2 className="text-xl font-extrabold tracking-tight lg:text-2xl dark:text-white mb-4">
                                    Review by the Administration
                                </h2>
                                <p className="mt-3 text-md text-gray-600 dark:text-gray-400 mb-6">
                                    The concern will be addresses and review by the Bharatiya Popular Party administration, that consist off State heads, district heads and rural, or block heads. Administration will assess and accept or reject the case on the basis of urgency, relevance and verification.
                                </p>
                                {verificationSteps.map(({ icon, title, description }) => (
                                    <Card key={title} className="shadow-lg">
                                        <CardHeader className="bg-[#e85b33] text-white p-4">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-white/20 p-2 rounded-full">
                                                    {icon}
                                                </span>
                                                <CardTitle className="text-md font-bold">{title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                            <p>{description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={flowchart3}
                                className="w-full rounded-md"
                                alt="Registration process"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                        <div className="space-y-6">
                            <h2 className="text-xl font-extrabold tracking-tight lg:text-2xl dark:text-white mb-4">
                                Verification Process
                            </h2>
                            <p className="mt-3 text-md text-gray-600 dark:text-gray-400 mb-6">
                                Submitted concern will go through the verification process. If any supporting documents or details appear to be unclear, inaccurate, or insufficient, the concern may undergo further verification.
                            </p>
                            {implementationSteps.map(({ icon, title, description }) => (
                                <Card key={title} className="shadow-lg">
                                    <CardHeader className="bg-[#e85b33] text-white p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-white/20 p-2 rounded-full">
                                                {icon}
                                            </span>
                                            <CardTitle className="text-md font-bold">{title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                        <p>{description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="relative">
                            <img
                                src="https://placehold.co/800x560"
                                className="w-full rounded-md"
                                alt="Verification process"
                            />
                        </div>
                    </div>

                    {/* Additional sections with consistent styling */}
                    <div className="space-y-8">
                        {[
                            {
                                title: "Raising an Appeal",
                                content: "If a concern is rejected, the person who submitted it has the right to appeal the decision. The appeal can be based on providing additional information or clarifying any misinterpretations of the original submission."
                            },
                            {
                                title: "Review of Appeal",
                                content: "The appeal will be reviewed by a higher body within the Bharatiya Popular Party. The final decision on the appeal will be communicated to the concerned member. This decision will be final and binding."
                            },
                            {
                                title: "Voting",
                                content: "Upon acceptance of the case, this will go to the pool for Voting. A criteria of 60/40 proportion will be followed. This means the 60% of community OATs should favour the requirement posted by the individual (or recipient)."
                            },
                            {
                                title: "Professional Response",
                                content: "Once a concern is approved, relevant Professional according to the specialised area, will address the concern. Based on App analysis professional will assess the situation and provide the necessary guidance, support, and solutions. Fees charges by the professional should be reasonable as this is a pure community service."
                            },
                            {
                                title: "Administration for the approval",
                                content: "once the professional gives the acceptance to serve the concern, this will finally go for administration approval."
                            },
                            {
                                title: "Upon the final review by the administration",
                                content: "Professional will review, comment, refer to business or serve the concern."
                            },
                            {
                                title: "Community Fund Utilization",
                                content: "Once the service is provided, payment will be made directly to the business or service provider, ensuring transparency and smooth transactions. The community fund will be used to make such payment to the professionals, businesses and to purchase services like medical care, scholarships, education, consultancy, etc."
                            },
                        ].map(({ title, content }) => (
                            <Card key={title} className="shadow-lg">
                                <CardHeader className="bg-[#e85b33] text-white p-4">
                                    <CardTitle className="text-md font-bold">{title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                    <p>{content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HowItWorks;