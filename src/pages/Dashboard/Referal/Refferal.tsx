import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext"; // Assuming you have user data in AuthContext
import DashboardLayout from "@/layout/DashboardLayout";
import { SVGProps, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { toast } from "sonner";

function Referral() {
  const { user } = useAuth(); // Get user data from AuthContext
  const [referralLink, setReferralLink] = useState("");
  const [referrals, setReferrals] = useState([
    {
      name: "John Doe",
      date: "2 days ago",
      status: "Joined",
      membershipNo: "BPP-2025-001",
      membershipType: "Life Member",
    },
    {
      name: "Jane Appleseed",Referal
      date: "1 week ago",
      status: "Pending",
      membershipNo: "Pending",
      membershipType: "Annual Member",
    },
    {
      name: "Sarah Miller",
      date: "3 weeks ago",
      status: "Joined",
      membershipNo: "BPP-2025-010",
      membershipType: "Life Member",
    },
  ]); // Mock data, replace with API call
  const [earnings, setEarnings] = useState({
    total: 3,
    pending: 1,
    paid: 2,
  }); // Mock data, replace with API call

  // Simulate fetching referral link and data (replace with actual API calls)
  useEffect(() => {
    if (user) {
      // Assuming referralCode or a unique ID is available from user
      const baseUrl = "https://bharatiyaparty.org/refer";
      const userReferralCode = user.referralCode || `${user.firstName?.toLowerCase()}${user.lastName?.toLowerCase() || ''}`;
      setReferralLink(`${baseUrl}/${userReferralCode}`);

      // TODO: Fetch actual referrals and earnings from backend API
      // Example:
      // fetchReferrals().then(data => setReferrals(data));
      // fetchEarnings().then(data => setEarnings(data));
    }
  }, [user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy link: " + err.message);
      });
  };

  return (
    <DashboardLayout>
      <ContentLayout title="Referral Program" children={undefined} />
      <main className="flex-1 px-4 py-6 md:px-6 lg:py-8">
        <div className="container mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Refer and Strengthen</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Invite supporters to join Bharatiya Popular Party and grow our community.
              </p>
            </div>
            <Button>Invite Supporters</Button>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
                <CardDescription>Share this link to invite people to join the party.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex-1 px-4 py-2 mr-4 truncate bg-gray-200 rounded-md dark:bg-gray-800">
                    {referralLink || "Generating link..."}
                  </div>
                  <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!referralLink}>
                    <CopyIcon className="w-5 h-5" />
                    <span className="sr-only">Copy referral link</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
                <CardDescription>Track supporters you've invited and their membership status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrals.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>{referral.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{referral.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Joined {referral.date}
                          </div>
                        </div>
                      </div>
                      <Badge variant={referral.status === "Joined" ? "default" : "secondary"}>
                        {referral.status}
                      </Badge>
                    </div>
                  ))}
                  {referrals.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400">No referrals yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
                <CardDescription>Measure your contribution to the party's growth.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Total Referrals</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">All-time referrals</div>
                    </div>
                    <div className="text-2xl font-bold">{earnings.total}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Pending Approvals</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Awaiting verification</div>
                    </div>
                    <div className="text-2xl font-bold">{earnings.pending}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Active Members</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Confirmed members</div>
                    </div>
                    <div className="text-2xl font-bold">{earnings.paid}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Referral History</h2>
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Membership Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Membership No</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals.length > 0 ? (
                      referrals.map((referral, index) => (
                        <TableRow key={index}>
                          <TableCell>{referral.name}</TableCell>
                          <TableCell>{referral.date}</TableCell>
                          <TableCell>{referral.membershipType}</TableCell>
                          <TableCell>
                            <Badge variant={referral.status === "Joined" ? "default" : "secondary"}>
                              {referral.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{referral.membershipNo}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center" colSpan={6}>No referral history found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold">How It Works</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <UserPlusIcon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">Invite Supporters</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share your unique referral link to invite people to join Bharatiya Popular Party.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <UsersIcon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">Build Community</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Each new member strengthens our party and amplifies our voice.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <AwardIcon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">Earn Recognition</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Top recruiters may receive party honors and special roles.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}

// Icons
function CopyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function UserPlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function AwardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

export default Referral;