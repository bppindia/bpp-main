import HeaderComponent from '@/components/HeaderComponent';
import RecruitmentBanner from '@/components/others/become-partCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from '@/layout/Layout';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function MembershipFaq() {
  const navigate = useNavigate()
  return (
    <Layout>
      <HeaderComponent
        heading="Membership FAQ"
        text="FAQ's"
        breadcrumbLinks={[
          { label: "Home", href: "/" },
          { label: "Membership", href: "/membership" },
          { label: "Membership FAQ", href: "/membership/faq" }
        ]}
        imgUrl={"null"} // Placeholder for header image
      />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6 mb-8">
          {/* Top Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Login</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Login to access all our member resource</p>
                <div className="flex gap-4 mt-4">
                  <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md" onClick={()=> navigate('/auth/login')}>Login <ChevronRight className="ml-2 h-4 w-4" /></Button>
                  <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md" onClick={()=> navigate('/auth/signup')}>Join Now <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md">
                  View Resources <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Your Membership FAQs</CardTitle>
              <CardDescription>
                In the Members Area you'll find everything you need to support Bharatiya Popular Party as a member – from managing your membership to campaigning tools and resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6 overflow-x-auto">
                {['Getting Involved'].map((item) => (
                  <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-full" key={item} variant={item === 'Getting Involved' ? 'default' : 'outline'} size="sm">
                    {item}
                  </Button>
                ))}
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="goals">
                  <AccordionTrigger>Understanding BPP Goals</AccordionTrigger>
                    <AccordionContent>
                    Bharatiya Popular Party is committed to its goals. <Link className='underline text-[#e85a32]' to='/about/bpp-goals'> Here is a guide to all our goals and objectives for serving the community.</Link>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skills">
                  <AccordionTrigger>Using Your Skills for Community Service</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>As an active member, you have the opportunity to serve and make a real difference in your community. Whether you are a professional or a business leader, your involvement is important.</p>

                      <h4 className="font-semibold">As a Professional:</h4>
                      <p>You can serve your community by offering your skills, knowledge, and expertise. Whether it's in education, healthcare, legal, social, or any other field, your contributions can help solve real-world challenges and improve lives.</p>

                      <h4 className="font-semibold">As a Business Leader:</h4>
                      <p>You can play a key role in supporting the community by providing quality products and services at competitive prices. By offering affordable solutions, you help drive local economic growth while supporting the needs of your fellow community members.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="new-members">
                  <AccordionTrigger>New Members</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>Welcome to the Bharatiya Popular Party. To activate your Primary Membership, please complete the payment of Rs. 5 towards the annual membership fee. This will enable you to access the Party's platform and exercise your voting rights to contribute to the community.</p>
                      <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md">Upgrade to Active Membership</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="concern">
                  <AccordionTrigger>Raise your Concern</AccordionTrigger>
                  <AccordionContent>
                    Register your case or raise a concern with the party leadership.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <RecruitmentBanner />
      </div>
    </Layout>
  );
}