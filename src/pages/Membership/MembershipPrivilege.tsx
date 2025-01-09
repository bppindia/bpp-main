import HeaderComponent from '@/components/HeaderComponent';
import Layout from '@/layout/Layout';
import { Users, Vote, UserPlus, FileText, Users2, ScrollText, Network, Award, Layout as LayoutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

const MembershipPrivilege = () => {
    const navigate = useNavigate()
    const privileges = [
        {
            title: "Right to Vote",
            description: "Every member shall have the right to vote in party elections. Voting rights are applicable as per the rules outlined in the constitution, and each member is entitled to one vote.",
            icon: Vote
        },
        {
            title: "Right to Stand for Election",
            description: "Members who fulfill the eligibility criteria specified in the Bharatiya Popular Party constitution have the right to stand for election to any party position or office subject to the party's bylaws and election processes.",
            icon: UserPlus
        },
        {
            title: "Access to Party Information",
            description: "Members shall have access to policies, meeting minutes, plans, and annual reports.",
            icon: FileText
        },
        {
            title: "Participation in Party Activities",
            description: "Members are encouraged to participate in all party activities, including meetings, campaigns, seminars, and community outreach programs.",
            icon: Users2
        },
        {
            title: "Right to Propose Resolutions and Amendments",
            description: "Members may propose resolutions and amendments to the party's policies, organizational structures, and constitution.",
            icon: ScrollText
        },
        {
            title: "Networking and Collaboration",
            description: "Members shall have opportunities to network with professionals and organizations, both locally and internationally, to promote the party's vision, expand influence, and foster collaborations.",
            icon: Network
        },
        {
            title: "Recognition and Rewards",
            description: "Members who demonstrate outstanding dedication, leadership, or contribution to the party's activities shall be recognized through awards, titles, or other forms of acknowledgment.",
            icon: Award
        },
        {
            title: "Access to Party Platforms",
            description: "Members shall have access to platforms for voting, sharing views and ideas, and contributing on key political, economic, and social issues.",
            icon: LayoutIcon
        }
    ];

    return (
        <Layout>
            <HeaderComponent
                heading="Membership Privilege"
                text="Rights and privileges of Bharatiya Popular Party members"
                breadcrumbLinks={[
                    { label: "Home", href: "/" },
                    { label: "Membership", href: "/membership" },
                    { label: "Membership Privilege", href: "/membership/privilege" }
                ]}
                imgUrl={"null"}
            />

            <section className="py-8 max-w-7xl mx-auto sm:py-12 bg-background dark:bg-slate-900 relative overflow-hidden">
                {/* Background Pattern - adjusted for dark mode */}
                <div className="absolute inset-0 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZTg1YTMyIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-50 dark:opacity-30" />

                <div className="container px-4 mx-auto max-w-7xl relative">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-[#e85a32] flex items-center justify-center shadow-lg">
                            <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-md sm:text-xl md:text-3xl font-bold tracking-tight text-foreground dark:text-white">
                                Membership Privileges
                            </h1>
                            <p className="text-md sm:text-lg text-muted-foreground dark:text-gray-300 mt-2">
                                Empowering Active Participation
                            </p>
                        </div>
                    </div>

                    <Separator className="my-8 sm:my-12 bg-[#e85a32]/20 dark:bg-[#e85a32]/30" />

                    <div className="space-y-8 sm:space-y-16">
                        {privileges.map((privilege, index) => (
                            <div key={index} 
                                className={`flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start
                                    ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}
                                    hover:transform hover:-translate-y-1 transition-all duration-300`}>
                                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl 
                                    bg-gradient-to-br from-[#e85a32] to-[#e85a32]/80 
                                    flex items-center justify-center shadow-xl flex-shrink-0
                                    ${index % 2 === 0 ? 'sm:rotate-3' : 'sm:-rotate-3'}`}>
                                    <privilege.icon className="h-7 w-7 sm:h-7 sm:w-7 text-white" />
                                </div>
                                <div className="flex-1 space-y-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm">
                                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#e85a32] dark:text-[#ff6b42] text-center sm:text-left">
                                        {privilege.title}
                                    </h2>
                                    <p className="text-md sm:text-md text-muted-foreground dark:text-gray-300 leading-relaxed text-center sm:text-left">
                                        {privilege.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 sm:mt-16 text-center space-y-6 sm:space-y-8">
                        <div className="max-w-2xl mx-auto px-4">
                            <p className="text-md sm:text-lg text-muted-foreground dark:text-gray-300">
                                By exercising these privileges, you are shaping the future of the party and contributing
                                to its mission.
                            </p>
                        </div>
                        <Button 
                            className="bg-[#e85a32] hover:bg-[#e85a32]/90 text-white 
                                px-8 sm:px-12 py-4 sm:py-4 rounded-md 
                                text-sm sm:text-md font-semibold 
                                w-full sm:w-auto" 
                            size="lg" 
                            onClick={()=> navigate('/auth/signup')}
                            >
                            Join Now
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default MembershipPrivilege;