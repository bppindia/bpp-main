import partyConstitution from '@/assets/pdf/PARTY CONSTITUTION.pdf';
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
  CardTitle
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layout/Layout';
import { ChevronRight, Pointer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
                  <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md" onClick={() => navigate('/auth/login')}>Login <ChevronRight className="ml-2 h-4 w-4" /></Button>
                  <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md" onClick={() => navigate('/auth/signup')}>Join Now <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-md" onClick={() => navigate('/community-contribution/introduction')}>
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
              <Accordion type="multiple" defaultValue={["Join", "Types", "professional", "Committee", "express"]} className="w-full">
                <AccordionItem value="Join">
                  <AccordionTrigger>1.	Who is eligible to join the political party?</AccordionTrigger>
                  <AccordionContent className='font-semibold'>
                    Any Indian citizen aged 18 years or above who believes in the principles of decentralization and accepts the Party's objectives and philosophy can become a member by making a written declaration or filling out an online enrollment form, provided that he is not a member of any other political party.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Types">
                  <AccordionTrigger>2.	What types of memberships are available within the party?</AccordionTrigger>
                  <AccordionContent className='font-semibold'>
                    Two types of Membership are available in the party:
                    <Tabs defaultValue="tab-1" className="w-full">
                      <ScrollArea>
                        <TabsList className="mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground w-full">
                          <TabsTrigger
                            value="tab-1"
                            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
                          >
                            Primary Membership
                          </TabsTrigger>
                          <TabsTrigger
                            value="tab-2"
                            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
                          >
                            Active Membership
                          </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                      <TabsContent value="tab-1">
                        <Card className="flex w-full flex-col justify-between text-left">
                          <CardHeader>
                            <CardTitle>
                              <p className='text-sm'> What is the process for joining the party as a Primary Member?</p>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Separator className="mb-6" />
                            <p className="text-sm ">
                              Every Member of the party can become the primary member by paying annual fess of Rs. 5/-
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="tab-2">
                        <Card className="flex w-full flex-col justify-between text-left">
                          <CardHeader>
                            <CardTitle>
                              <p className='text-sm'> What is the process for joining the party as an Active Member?</p>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Separator className="mb-6" />
                            <p className="text-sm ">
                              Any Primary Member becomes eligible for Active Membership by adding 10 new members to the party and paying a membership fee of Rs. 250/-.
                            </p>
                            <div>
                              <Separator className="my-6" />
                              <CardTitle>
                                <p className='text-sm my-3'>What privileges are available to Active Members?</p>
                              </CardTitle>
                              <Separator className="mb-6" />
                              <ul className="space-y-4">
                                <li className="flex text-sm items-center gap-2">
                                  <span>I.	Opportunity to be the part of Party-Organ as Panchayat/Municipal Ward Council</span>
                                </li>
                                <li className="flex text-sm items-center gap-2">
                                  <span>II.	Opportunity to be the part of Party-Organ as Block Council or Block Executive Committee: </span>
                                </li>
                                <li className="flex text-sm items-center gap-2">
                                  <span>III.	Opportunity to be the part of Party-Organ as District Council or District Executive Committee.</span>
                                </li>
                                <li className="flex text-sm items-center gap-2">
                                  <span>IV.	Opportunity to be the part of Party-Organ as State Council or State Executive Committee.</span>
                                </li>
                                <li className="flex text-sm items-center gap-2">
                                  <span>V.	Opportunity to be the part of Party-Organ as National Council or National Executive Committee.</span>
                                </li>
                                <li className="flex text-sm items-center gap-2">
                                  <span>VI.	Contesting for Election</span>
                                </li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="professional">
                  <AccordionTrigger>3.	How can a member enrol as ‘professional’ if he wishes to contribute to the community?</AccordionTrigger>
                  <AccordionContent className='font-semibold'>
                    He can enrol as a professional by selecting the 'Professional' category while applying for Primary Membership.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Committee">
                  <AccordionTrigger>4.	How can I upgrade to the Executive Committee or Councils at different levels of party?</AccordionTrigger>
                  <AccordionContent>
                    <Card className="flex font-semibold w-full flex-col justify-between text-left">
                      <CardHeader>
                        <CardTitle>
                          <p className='text-sm'>You can become eligible for the Executive Committee or Councils at different levels of party, based on</p>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-6" />
                        <p className="text-sm ">
                          I.	Having brought atleast 10 active members to the party.
                        </p>
                        <p className="text-sm ">
                          II.	Based on Rank Choice Voting (RCV)
                        </p>
                        <p className="text-sm ">
                          III.	Based on Qualification.
                        </p>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="express">
                  <AccordionTrigger>5.	How can I express my interest and demonstrate my eligibility for the Executive Committee or Councils at different levels of party?</AccordionTrigger>
                  <AccordionContent className='font-semibold'>
                    You can express your interest and eligibility to upgrade by sending an email to the party’s head-office with details of the active members generated for the party.
                  </AccordionContent>
                </AccordionItem>


                {/* <AccordionItem value="goals">
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
                </AccordionItem> */}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className='my-4 font-bold'>
          FOR MORE DETAILS, PLEASE{" "}
          <a
            href={partyConstitution}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            REFER TO THE PARTY’S CONSTITUTION.{" "} <Pointer className="inline-block ml-2 w-4 h-4 text-blue-600" />
          </a>
        </div>
        <RecruitmentBanner />
      </div>
    </Layout>
  );
}