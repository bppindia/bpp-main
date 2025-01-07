import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useState } from 'react';

const pages = {
    community: "community",
    commonMan: "commonMan",
    professionals: "professionals",
    business: "business",
};

const pageOrder = [pages.community, pages.commonMan, pages.professionals, pages.business];

interface PageWrapperProps {
    children: ReactNode;
    direction: number;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, direction }) => (
    <motion.div
        initial={{ x: 100 * direction, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100 * direction, opacity: 0 }}
        transition={{
            type: "tween",
            stiffness: 600,
            damping: 30
        }}
        className="w-full absolute"
    >
        {children}
    </motion.div>
);


const CommunityPage = ({ direction }: { direction: number }) => (
    <PageWrapper direction={direction}>
        <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">Join Our Community</h1>
                        <h2 className="text-2xl font-semibold text-gray-800">Community Contribution Program</h2>
                        <p className="text-lg text-gray-700">
                            Bharatiya Popular Party Any Indian citizen, irrespective of caste, religion, or any other discrimination, who has attained the age of 18 and is willing to contribute to the community, is welcome to join us as a member.
                        </p>
                        <p className="text-lg text-gray-700">
                            Party's community is made up of a diverse group of individuals: common citizens, professionals, and business leaders, each one of them playing a vital role in driving party's mission forward.
                        </p>
                        <Button
                            variant="destructive"
                            className="bg-[#e4003b] hover:bg-[#c8003a] mt-4"
                        >
                            Join Our Community →
                        </Button>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <img
                            src="https://placehold.co/800x600"
                            alt="Community members"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </PageWrapper>
);

const CommonManPage = ({ direction }: { direction: number }) => (
    <PageWrapper direction={direction}>
        <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">Common Man</h1>
                        <p className="text-lg text-gray-700">
                            The backbone of the party, the common man is the primary beneficiary of the party's efforts. It is for you that we fight for equitable development and opportunities. Your challenges and aspirations guide our mission, and together, we work to create a better future.
                        </p>
                        <Button
                            variant="destructive"
                            className="bg-[#e4003b] hover:bg-[#c8003a] mt-4"
                        >
                            Join Our Community →
                        </Button>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <img
                            src="https://placehold.co/800x600"
                            alt="Common citizens"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </PageWrapper>
);

const ProfessionalsPage = ({ direction }: { direction: number }) => (
    <PageWrapper direction={direction}>
        <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">Professionals</h1>
                        <p className="text-lg text-gray-700">
                            Among the common people, there are the people with specialized expertise in various sectors and a passion to serve the community. These professionals step forward to contribute their knowledge, skills, and leadership to support the party's objectives. These are the professionals who bring practical solutions to real-world issues.
                        </p>
                        <Button
                            variant="destructive"
                            className="bg-[#e4003b] hover:bg-[#c8003a] mt-4"
                        >
                            Join Our Community →
                        </Button>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <img
                            src="https://placehold.co/800x600"
                            alt="Professional members"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </PageWrapper>
);

const BusinessPage = ({ direction }: { direction: number }) => (
    <PageWrapper direction={direction}>
        <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">Business Community</h1>
                        <p className="text-lg text-gray-700">
                            Businesses members including entrepreneurs and institutional leaders, must be registered with the party and shall be committed to supporting the community by providing products and services at reasonable prices. Their role is very important in building a sustainable, growing economy that benefits everyone.
                        </p>
                        <Button
                            variant="destructive"
                            className="bg-[#e4003b] hover:bg-[#c8003a] mt-4"
                        >
                            Join Our Community →
                        </Button>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <img
                            src="https://placehold.co/800x600"
                            alt="Business community members"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </PageWrapper>
);

const CommunityContributionSection = () => {
    const [currentPage, setCurrentPage] = useState(pages.community);
    const [slideDirection, setSlideDirection] = useState(1);

    const navigateToPage = (newPage: string) => {
        const currentIndex = pageOrder.indexOf(currentPage);
        const newIndex = pageOrder.indexOf(newPage);
        const direction = newIndex > currentIndex ? 1 : -1;
        setSlideDirection(direction);
        setCurrentPage(newPage);
    };


    const renderPage = () => {
        const props = { direction: slideDirection };

        switch (currentPage) {
            case pages.community:
                return <CommunityPage key="community" {...props} />;
            case pages.commonMan:
                return <CommonManPage key="commonMan" {...props} />;
            case pages.professionals:
                return <ProfessionalsPage key="professionals" {...props} />;
            case pages.business:
                return <BusinessPage key="business" {...props} />;
            default:
                return <CommunityPage key="community" {...props} />;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="flex flex-wrap gap-4 mb-8">
                <Button
                    variant={currentPage === pages.community ? "destructive" : "secondary"}
                    className={currentPage === pages.community ? "bg-[#e4003b] hover:bg-[#c8003a]" : ""}
                    onClick={() => navigateToPage(pages.community)}
                >
                    Community Contribution
                </Button>
                <Button
                    variant={currentPage === pages.commonMan ? "destructive" : "secondary"}
                    className={currentPage === pages.commonMan ? "bg-[#e4003b] hover:bg-[#c8003a]" : ""}
                    onClick={() => navigateToPage(pages.commonMan)}
                >
                    Common Man
                </Button>
                <Button
                    variant={currentPage === pages.professionals ? "destructive" : "secondary"}
                    className={currentPage === pages.professionals ? "bg-[#e4003b] hover:bg-[#c8003a]" : ""}
                    onClick={() => navigateToPage(pages.professionals)}
                >
                    Professionals
                </Button>
                <Button
                    variant={currentPage === pages.business ? "destructive" : "secondary"}
                    className={currentPage === pages.business ? "bg-[#e4003b] hover:bg-[#c8003a]" : ""}
                    onClick={() => navigateToPage(pages.business)}
                >
                    Business Community
                </Button>
            </div>

            <div className="relative h-[600px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {renderPage()}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CommunityContributionSection;