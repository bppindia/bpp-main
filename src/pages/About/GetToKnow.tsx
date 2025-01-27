import GetToKnowImg from '@/assets/images/headerBanners/GetToKnow.png';
import bppflag from '@/assets/images/logos/bppflag.png';
import HeaderComponent from '@/components/HeaderComponent';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from '@/layout/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetToKnow = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("youth");
    return (
        <Layout>
            <HeaderComponent
                heading="Get To Know"
                text="Your Partner in Progress – Get to Know BPP"
                breadcrumbLinks={[
                    { label: "About Us", href: "/about" },
                    { label: "Get To Know BPP", href: "/about/get-to-know-bpp" }
                ]}
                imgUrl={GetToKnowImg}
            />

            <section className="py-12">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        <main className="container mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader className="p-4">
                                        <CardTitle className='text-3xl font-poppins text-gray-900 dark:text-white font-poppins'>About Us</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-gray-700 dark:text-gray-300 mb-4"><span className='font-semibold'>Bharatiya Popular Party</span> was founded in September 2024 by its <br /> <strong className='font-extrabold text-red-700'>President Shri Jaheer Bukhari,</strong> who has been actively involved in social work for over a decade. The party stands as a symbol of progress, equality and sustainable development in India, guided by the principles of democracy, socialism and secularism.</p>
                                        <p className="text-gray-700 dark:text-gray-300 mt-4">Party's symbol MIKE symbolizes the party's commitment to open communication, transparency, and the free exchange of ideas, highlighting their desire to stay connected with the public.</p>
                                    </CardContent>
                                </Card>
                                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg ">
                                    <img
                                        src={bppflag}
                                        alt="BPP Flag"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <Card className="mt-8 bg-white dark:bg-gray-800">
                                <CardHeader className="bg-[#e85b33] text-white p-4">

                                    <CardTitle>Why Choose Us</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-700 dark:text-gray-300">We are committed to shaping a brighter future for all. By prioritizing unity, sustainability, and social equity, we aim to build a society where everyone has equal opportunities for growth. We believe in community engagement and transparent governance.</p>
                                </CardContent>
                            </Card>

                            <Card className="mt-8 shadow-lg bg-white dark:bg-gray-800">
                                <CardHeader className="bg-[#e85b33] text-white p-4">

                                    <CardTitle>Key Focus Areas</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex space-x-4">
                                        <Button
                                            className={selectedTab === "youth" ? "bg-[#e85b33] text-white" : "bg-transparent text-[#e85b33] border border-[#e85b33], hover:bg-[#fc4b1a] hover:text-white"}
                                            onClick={() => setSelectedTab("youth")}
                                        >
                                            Youth
                                        </Button>
                                        <Button
                                            className={selectedTab === "economic-growth" ? "bg-[#e85b33] text-white" : "bg-transparent text-[#e85b33] border border-[#e85b33] hover:bg-[#fc4b1a] hover:text-white"}
                                            onClick={() => setSelectedTab("economic-growth")}
                                        >
                                            Economic Growth
                                        </Button>
                                        <Button
                                            className={selectedTab === "social-justice" ? "bg-[#e85b33] text-white" : "bg-transparent text-[#e85b33] border border-[#e85b33] hover:bg-[#fc4b1a] hover:text-white"}
                                            onClick={() => setSelectedTab("social-justice")}
                                        >
                                            Social Justice
                                        </Button>
                                    </div>

                                    <div className="mt-4">
                                        {selectedTab === "youth" && (
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Youth remains our priority. They are the future of the nation and are at the heart of our ideology. We are committed to creating policies that ensure better access to education and employment and encourage entrepreneurship among them.
                                            </p>
                                        )}
                                        {selectedTab === "economic-growth" && (
                                            <p className="text-gray-700 dark:text-gray-300">
                                                We believe in empowering businesses, creating job opportunities, and ensuring a fair distribution of wealth.
                                            </p>
                                        )}
                                        {selectedTab === "social-justice" && (
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Our focus is on reducing inequality and providing accessible healthcare, education, and social services for all citizens.
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader className="bg-[#e85b33] text-white p-4">

                                        <CardTitle>Did You Know?</CardTitle>
                                    </CardHeader>

                                    <CardContent className="p-6">
                                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                            <li>Bharatiya Popular Party is a very young and dynamic organisation, founded in September 2024 but has always been at the forefront of driving change in society.</li>
                                            <li>We are one of the first parties to introduce digital participation of the people, giving everyone an opportunity to be part of policy-making.</li>
                                            <li>Instead of following political agendas, we are actively helping implement policies that result in better economic growth for the nation.</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader className="bg-[#e85b33] text-white p-4">

                                        <CardTitle>Our Values</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                            <li><strong>Integrity:</strong> We believe in transparency and honesty, ensuring that every decision reflects the best interests of the people.</li>
                                            <li><strong>Equality:</strong> We strive for a fair society where everyone, regardless of their background, has the same opportunities to succeed.</li>
                                            <li><strong>Innovation:</strong> We embrace new ideas and solutions to handle community challenges. Our focus is on progress through mutual contribution.</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="mt-8 bg-white dark:bg-gray-800">
                                <CardHeader className="bg-[#e85b33] text-white p-4">

                                    <CardTitle>Resources</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                        <li><strong>Party Constitution:</strong> You can download and study our constitution, outlining our stance on key issues such as healthcare, education, and the economy.</li>
                                        <li><strong>News & Updates:</strong> By subscribing, you can stay up-to-date with the latest news on events and developments regarding our initiatives.</li>
                                        <li><strong>Volunteer Opportunities:</strong> By signing-up on our app, you can learn how you can contribute to the movement, local initiatives, campaigns, or supporting our outreach programs.</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="mt-8 bg-white dark:bg-gray-800">
                                <CardHeader className="bg-[#e85b33] text-white p-4">

                                    <CardTitle>Careers with Us</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">Join Our Team: We are always looking for educated and passionate individuals who share our commitment to change. Whether you're a professional, business holder, mentor or expert, we have opportunities for you to make a meaningful impact.</p>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">Volunteer Positions: Support our work and help shape the future by volunteering your time and skills. Whether it's managing or assisting in local initiatives, we welcome your contribution.</p>
                                    <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md" onClick={() => navigate('/auth/signup')}>Join Now</Button>
                                </CardContent>
                            </Card>
                        </main>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default GetToKnow;
