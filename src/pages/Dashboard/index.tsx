"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MapChart from "@/components/maps/mapChart";
import GoalsCarousel from "@/components/test/goalsSlider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import DashboardLayout from "@/layout/DashboardLayout";
import { ActivityIcon, PlusIcon, User2Icon, UsersIcon } from 'lucide-react';
import { useSelector } from "react-redux";
import { JSX } from "react/jsx-runtime";

const DashboardPage: React.FC = () => {
  const { userData } = useSelector((state: any) => state.auth);
  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;

  return (
    <DashboardLayout>
      <ContentLayout title="Dashboard">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-4 w-full">
          {/* Removed fixed height and added responsive classes */}
          <Card className="w-full aspect-[4/3] lg:aspect-auto lg:h-[60vh] max-h-[600px] p-4">
            <CardContent className="h-full p-0">
              <MapChart SelectedTab='national' state={userData?.state || null} />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{userData?.state}</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 p-5">
              <StatCard title="Total Members" value="0" percentage="+0%" icon={<UsersIcon className="h-6 w-6 text-muted-foreground" />} />
              <StatCard title="Active Members" value="+0" percentage="+0%" icon={<ActivityIcon className="h-6 w-6 text-muted-foreground" />} />
              <StatCard title="New Members This Month" value="+0" percentage="+0%" icon={<PlusIcon className="h-6 w-6 text-muted-foreground" />} />
              <StatCard title="Active Now" value="+0" percentage="+0 since last hour" icon={<User2Icon className="h-6 w-6 text-muted-foreground" />} />
            </div>
          </Card>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  No Activity Found
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <GoalsCarousel />
        </div>
      </ContentLayout>
    </DashboardLayout>
  );
};

export default DashboardPage;

const StatCard: React.FC<{ title: string, value: string, percentage: string, icon: JSX.Element }> = ({ title, value, percentage, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{percentage}</p>
    </CardContent>
  </Card>
);

