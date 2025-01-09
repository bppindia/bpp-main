import community from '@/assets/images/headerBanners/community.png';
import HeaderComponent from "@/components/HeaderComponent";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from "@/layout/Layout";

const CommunityContribution = () => {
    return (
        <Layout>
            <HeaderComponent
                heading="Community Contribution"
                text="We can't help everyone, but everyone can help someone."
                breadcrumbLinks={[
                    { label: "Home", href: "/" },
                    { label: "Community Contribution", href: "/community-contribution/introduction" },
                ]}
                imgUrl={community}
            />
            <section className="container py-8">
                <div className="container px-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl dark:text-white">
                            Community Contribution
                        </h1>
                    </div>
                    <div className="my-2 text-gray-700 dark:text-gray-300 space-y-3">
                        <p>
                            Bharatiya Popular Party Any Indian citizen, irrespective of caste, religion, or any other discrimination, who has attained the age of 18 and is willing to contribute to the community, is welcome to join us as a member
                        </p>
                    </div>

                    {/* Section: Diverse Group */}
                    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                        <div className="relative">
                            <img
                                className="w-full rounded-md"
                                src="https://www.shutterstock.com/image-photo/diverse-people-putting-stacked-hands-600nw-1022451727.jpg"
                                alt="Image Description"

                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold tracking-tight lg:text-2xl dark:text-white">
                                Party’s community is made up of a diverse group of individuals:
                            </h2>
                            <p className="mt-3 text-md text-gray-600 dark:text-gray-400">
                                Common citizens, professionals, and business leaders, each one of them playing a vital role in driving party’s mission forward.
                            </p>
                            <div className="mt-6 space-y-6">
                                {/* Common Man */}
                                <Card className="shadow-lg">
                                    <CardHeader className="bg-[#e85b33] text-white p-4">

                                        <CardTitle className="text-md font-bold">The Common Man</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                        <p>
                                            The backbone of the party, the common man is the primary beneficiary of the party’s efforts. It is for you that we fight for equitable development and opportunities. Your challenges and aspirations guide our mission, and together, we work to create a better future.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Professionals */}
                                <Card className="shadow-lg">
                                    <CardHeader className="bg-[#e85b33] text-white p-4">

                                        <CardTitle className="text-md font-bold">Professionals</CardTitle>

                                    </CardHeader>
                                    <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                        <p>
                                            Among the common people, there are people with specialized expertise in various sectors and a passion to serve the community. These professionals step forward to contribute their knowledge, skills, and leadership to support the party’s objectives.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                        <div className="space-y-6">
                            {/* Business Leaders */}
                            <Card className="shadow-lg">
                                <CardHeader className="bg-[#e85b33] text-white p-4">
                                    <CardTitle className="text-md font-bold">Business Leaders</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                    <p>
                                        Business members including entrepreneurs and institutional leaders, must be registered with the party and shall be committed to supporting the community by providing products and services at reasonable prices.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* The Blockheads */}
                            <Card className="shadow-lg">
                                <CardHeader className="bg-[#e85b33] text-white p-4">
                                    <CardTitle className="text-md font-bold">The Blockheads</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 bg-white text-sm dark:bg-gray-800">
                                    <p>
                                        Above all, we have the Blockheads, exceptional individuals who go above and beyond in their service to the community. They are selected based on their active involvement and commitment to the party's values.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="relative">
                            <img
                                className="w-full rounded-md"
                                src="https://images.unsplash.com/photo-1523287562758-66c7fc58967f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1c2luZXNzJTIwbGVhZGVyfGVufDB8fDB8fHww"
                                alt="Image Description"
                            />
                        </div>
                    </div>

                    <div className="border-t pt-8 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            Party’s people; are all those who share a common desire to serve the communities and contribute to the betterment. This is how we are not just a party; we are better known as Community Contributors, a united force, committed to positive change, driven by service, and focused on creating a better future for all.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CommunityContribution;
