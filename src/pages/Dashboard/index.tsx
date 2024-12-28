"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WarningDialog from "@/components/dialogs/WarningDialog";
import WelcomeDialog from "@/components/dialogs/WelcomeDialog";
import MapChart from "@/components/maps/mapChart";
import GoalsCarousel from "@/components/test/goalsSlider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import DashboardLayout from "@/layout/DashboardLayout";
import { ResponsiveLine } from "@nivo/line";
import { ActivityIcon, PlusIcon, User2Icon, UsersIcon } from 'lucide-react';
import { ClassAttributes, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { JSX } from "react/jsx-runtime";

const DashboardPage: React.FC = () => {
  const {userData} = useSelector((state: any) => state.auth);
  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;

  return (
    <DashboardLayout>
      <ContentLayout title="Dashboard">
        <DashboardHeader />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-4 w-full">
          <Card className="w-full h-[500px] p-4">
            <CardContent className="h-[calc(500px-4rem)]">
              <MapChart SelectedTab='national' state={userData?.state || null} />
            </CardContent>
          </Card>
          <Card>
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
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="w-full aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
        <div>
          <GoalsCarousel />
        </div>
      {userData.approved? 
        <WelcomeDialog />
        : 
        <WarningDialog />
      }  

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

// const ActivityItem: React.FC<{ icon: JSX.Element, title: string, description: string, time: string }> = ({ icon, title, description, time }) => (
//   <div className="flex items-center justify-between">
//     <div className="flex items-center gap-3">
//       {icon}
//       <div>
//         <p className="font-medium">{title}</p>
//         <p className="text-xs text-muted-foreground">{description}</p>
//       </div>
//     </div>
//     <p className="text-xs text-muted-foreground">{time}</p>
//   </div>
// );

function LineChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
