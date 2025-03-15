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
import { fetchDashboardData, fetchUserData } from './api/dashboardApi';
import CasesStats from './components/CasesStats';
import MemberStats from './components/MemberStats';
import Overview from './components/overview';
import ProfessionalsStats from './components/ProfessionalsStats';
import ReferralStats from './components/ReferralStats';
import StateMap from './components/StateMap';
import WalletStats from './components/WalletStats';

// Mock data (for testing, will be replaced by API response)
const initialUserData = {
  firstName: "Swapnil",
  lastName: "Mahadik",
  role: "Primary Member",
  id: 123,
  referralCount: 5,
  validUntil: "2025-12-31",
  referralCode: "JD2023",
  balance: 1500,
  country: "India",
  state: "Maharashtra",
  district: 'nashik',
  contributionGoal: 10000,
  contributionProgress: 7500,
  avatar: "/avatar.jpg",
};

const initialDashboardData = {
  totalMembersIndia: 1250000,
  totalMembersState: 85000, // Maharashtra
  totalProfessionalsState: 3200, 
  wallet: {
    totalContributions: 500000,
    recentTransactions: [
      { id: 1, amount: 1000, date: "2025-03-10", type: "Credit" },
      { id: 2, amount: 200, date: "2025-03-09", type: "Debit" },
    ],
  },
  cases: {
    totalCases: 150,
    pendingCases: 45,
    resolvedCases: 105,
  },
  referrals: {
    totalReferrals: 5,
    activeReferrals: 3,
    referralEarnings: 50,
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState<any>(initialUserData); // Initialize with mock data
  const [dashboardData, setDashboardData] = useState<any>(initialDashboardData); // Initialize with mock data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [user, dashboard] = await Promise.all([fetchUserData(), fetchDashboardData()]);
        setUserData(user);
        setDashboardData(dashboard);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Fallback to mock data if API fails (optional)
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <Main fixed>
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4 mt-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
            <AvatarFallback>{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Welcome, {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {userData.role} | ID: {String(userData.id).padStart(3, '0')} | {userData.state}, {userData.country}
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(userData.referralCode)}>
                Share Referral Link ({userData.referralCode})
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
          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <MemberStats
              totalIndia={dashboardData.totalMembersIndia}
              totalState={dashboardData.totalMembersState}
              state={userData.state}
            />
            <CasesStats
              total={dashboardData.cases.totalCases}
              pending={dashboardData.cases.pendingCases}
            />
            <ReferralStats
              total={dashboardData.referrals.totalReferrals}
              earnings={dashboardData.referrals.referralEarnings}
            />
            <WalletStats
              balance={userData.balance}
              totalContributions={dashboardData.wallet.totalContributions}
            />
          </div>

          {/* Map and Graphs */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <StateMap state={userData.state} dist={userData.district} totalMembers={dashboardData.totalMembersState} />
            </div>
            <div className="lg:col-span-3 space-y-4">
              <Overview contributions={dashboardData.wallet.recentTransactions} />
              <ProfessionalsStats total={dashboardData.totalProfessionalsState} state={userData.state} />
            </div>
          </div>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="wallet" className="space-y-4">
          <div>Wallet Details (Balance: ₹{userData.balance.toLocaleString()})</div>
          {/* Add more detailed wallet info here */}
        </TabsContent>
        <TabsContent value="queries" className="space-y-4">
          <div>Cases: {dashboardData.cases.totalCases}</div>
          {/* Add cases table here */}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div>Analytics Placeholder</div>
          {/* Add charts here */}
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <div>Notifications Placeholder</div>
          {/* Add notifications list here */}
        </TabsContent>
      </Tabs>
      <Separator className="shadow" />
    </Main>
  );
}