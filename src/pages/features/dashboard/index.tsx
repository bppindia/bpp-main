// src/pages/dashboard/index.tsx
import { Main } from '@/components/layout/dashboard/main';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchDashboardData } from './api/dashboardApi';
import CasesStats from './components/CasesStats';
import MemberStats from './components/MemberStats';
import Overview from './components/overview';
import ProfessionalsStats from './components/ProfessionalsStats';
import ReferralStats from './components/ReferralStats';
import StateMap from './components/StateMap';
import WalletStats from './components/WalletStats';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, fetchUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchUserData(); // Refresh user data
        const dashboard = await fetchDashboardData();
        setDashboardData(dashboard);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchUserData]);

  if (loading || !user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <Main fixed>
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4 mt-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar || "/avatar.jpg"} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Welcome, {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.role} | ID: {user.membership} | {user.address?.state}, India
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Generate Report</DropdownMenuItem>
              <DropdownMenuItem>Download Report</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.referralCode || '')}>
                Share Referral Link ({user.referralCode || 'N/A'})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => navigate('/dashboard/add-fund')}>Contribute Now</Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MemberStats
              totalIndia={dashboardData?.totalMembersIndia || 0}
              totalState={dashboardData?.totalMembersState || 0}
              state={user.address?.state || 'Unknown'}
            />
            <CasesStats
              total={dashboardData?.cases?.totalCases || 0}
              pending={dashboardData?.cases?.pendingCases || 0}
            />
            <ReferralStats
              total={dashboardData?.referrals?.totalReferrals || 0}
              earnings={dashboardData?.referrals?.referralEarnings || 0}
            />
            <WalletStats
              balance={dashboardData?.wallet?.balance || 0}
              totalContributions={dashboardData?.wallet?.totalContributions || 0}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <StateMap
                state={user.address?.state || 'Unknown'}
                dist={user.address?.district || 'Unknown'}
                totalMembers={dashboardData?.totalMembersState || 0}
              />
            </div>
            <div className="space-y-4 lg:col-span-3">
              <Overview contributions={dashboardData?.wallet?.recentTransactions || []} />
              <ProfessionalsStats
                total={dashboardData?.totalProfessionalsState || 0}
                state={user.address?.state || 'Unknown'}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <div>Wallet Details (Balance: ₹{dashboardData?.wallet?.balance?.toLocaleString() || 0})</div>
        </TabsContent>
        <TabsContent value="queries" className="space-y-4">
          <div>Cases: {dashboardData?.cases?.totalCases || 0}</div>
        </TabsContent>
      </Tabs>
      <Separator className="shadow" />
    </Main>
  );
}