import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout/Layout";
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

export default function CustomerService() {
    return (
        <Layout>
            {/* Hero Section with Search */}
            <section className="py-8 container text-center">
                <div className="max-w-7xl mx-auto space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#e85a32]">
                        How can we help you?
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Search our knowledge base or get in touch with our support team for assistance
                    </p>
                </div>
            </section>

            {/* Quick Contact Section */}
            <section className="py-12 container">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-[#e85a32] text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                        <div className="flex justify-center items-center h-16 w-16 bg-white rounded-full mx-auto mb-4">
                            <Phone className="h-8 w-8 text-[#e85a32]" />
                        </div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <p className="text-white/80 mb-4">Available Mon-Fri, 9am-6pm</p>
                        <Button variant="outline" className="w-full bg-white text-[#e85a32] font-bold">
                            +91 9920200996
                        </Button>
                    </div>
                    <div className="p-6 bg-[#e85a32] text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                        <div className="flex justify-center items-center h-16 w-16 bg-white rounded-full mx-auto mb-4">
                            <Mail className="h-8 w-8 text-[#e85a32]" />
                        </div>
                        <h3 className="font-semibold text-lg">Email Support</h3>
                        <p className="text-white/80 mb-4">Get response within 24 hours</p>
                        <Button variant="outline" className="w-full bg-white text-[#e85a32] font-bold">
                            bppheadoffice@gmail.com
                        </Button>
                    </div>
                    <div className="p-6 bg-[#e85a32] text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                        <div className="flex justify-center items-center h-16 w-16 bg-white rounded-full mx-auto mb-4">
                            <MessageSquare className="h-8 w-8 text-[#e85a32]" />
                        </div>
                        <h3 className="font-semibold text-lg">Live Chat</h3>
                        <p className="text-white/80 mb-4">Chat with our support team</p>
                        <Button variant="outline" className="w-full bg-white text-[#e85a32] font-bold">
                            Start Chat
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 container">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center h-16 w-16 bg-[#e85a32] rounded-full mx-auto mb-4">
                            <HelpCircle className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#e85a32]">Still Need Help?</h2>
                        <p className="text-muted-foreground mt-2">
                            Fill out the form below and we'll get back to you as soon as possible
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-8 shadow-lg">
                        <form className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-black dark:text-white">Name</Label>
                                    <Input id="name" required placeholder="Enter your name" className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
                                    <Input id="email" type="email" required placeholder="Enter your email" className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-black dark:text-white">Subject</Label>
                                <Input id="subject" required placeholder="Enter the subject of your question" className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-black dark:text-white">Message</Label>
                                <Textarea
                                    id="message"
                                    required
                                    placeholder="Enter your question or issue"
                                    className="min-h-[150px] bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-[#e85a32] hover:bg-[#d54f2a] text-white px-6 py-2 rounded-md font-bold "
                                size="lg"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
