import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HeaderNav } from "@/components/layout/dashboard/header-nav";
import { Main } from "@/components/layout/dashboard/main";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mock donation data (replace with API call later)
type Donation = {
    id: string;
    date: string;
    amount: number;
    type: "one-time" | "recurring";
    status: "completed" | "pending" | "failed";
    campaign?: string; // Optional: Link to specific campaign
};

const mockDonations: Donation[] = [
    { id: "DON001", date: "2025-03-14", amount: 5000, type: "one-time", status: "completed", campaign: "Election Fund" },
    { id: "DON002", date: "2025-03-13", amount: 1000, type: "recurring", status: "completed" },
    { id: "DON003", date: "2025-03-12", amount: 2500, type: "one-time", status: "pending", campaign: "Community Outreach" },
    { id: "DON004", date: "2025-03-11", amount: 500, type: "recurring", status: "completed" },
];

// Mock summary data (replace with API call later)
const donationSummary = {
    totalDonations: 9000, // Rs
    recurringDonations: 1500, // Rs
    oneTimeDonations: 7500, // Rs
};

const Donate = () => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAllDonations, setShowAllDonations] = useState(false);

    // Simulate API fetch (replace with real API call)
    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                // Replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
                setDonations(mockDonations);
            } catch (error) {
                console.error("Failed to fetch donations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();
    }, []);

    const displayedDonations = showAllDonations ? donations : donations.slice(0, 3);

    return (
        <>
            <Main fixed>
                <div className="flex flex-col items-start justify-between gap-6 mb-6 md:flex-row md:items-center">
                    <div className="w-full">
                    <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Donor Dashboard</h1>
                            <p className="text-muted-foreground">Support our political party by viewing your donation history and contributing more.</p>
                        </div>
                        <Button variant="outline" onClick={() => navigate("/dashboard/add-donation")}>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Make a Donation
                        </Button>
                    </div>

                    {/* Donation Summary */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Donations</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="text-4xl font-bold">Rs {donationSummary.totalDonations.toLocaleString()}</div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <ArrowUpIcon className="w-4 h-4 text-green-500" />
                                    <span>+12%</span> {/* Replace with real percentage */}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recurring Donations</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="text-4xl font-bold">Rs {donationSummary.recurringDonations.toLocaleString()}</div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <ArrowUpIcon className="w-4 h-4 text-green-500" />
                                    <span>+5%</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>One-Time Donations</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="text-4xl font-bold">Rs {donationSummary.oneTimeDonations.toLocaleString()}</div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <ArrowUpIcon className="w-4 h-4 text-green-500" />
                                    <span>+15%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Donation History */}
                    <div className="mt-8">
                        <h2 className="mb-4 text-xl font-bold">Donation History</h2>
                        <Card>
                            <CardContent className="p-0">
                                {loading ? (
                                    <div className="p-6 text-center text-muted-foreground">Loading...</div>
                                ) : donations.length === 0 ? (
                                    <div className="p-6 text-center text-muted-foreground">No donation history found.</div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Campaign</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {displayedDonations.map((donation) => (
                                                <TableRow
                                                    key={donation.id}
                                                    className="cursor-pointer hover:bg-gray-100"
                                                    onClick={() => donation.campaign && navigate(`/dashboard/campaigns/${donation.campaign.replace(/\s+/g, '-').toLowerCase()}`)}
                                                >
                                                    <TableCell>{donation.date}</TableCell>
                                                    <TableCell>Rs {donation.amount.toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={donation.type === "recurring" ? "default" : "secondary"}>
                                                            {donation.type}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{donation.campaign || "General Fund"}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                donation.status === "completed"
                                                                    ? "default"
                                                                    : donation.status === "pending"
                                                                        ? "outline"
                                                                        : "destructive"
                                                            }
                                                        >
                                                            {donation.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                            {donations.length > 3 && (
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowAllDonations(!showAllDonations)}
                                    >
                                        {showAllDonations ? (
                                            <>
                                                Show Less <ChevronUp className="w-4 h-4 ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                Show More <ChevronDown className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    </div>

                    {/* Additional Features */}
                    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Contribute to ongoing campaigns.</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" onClick={() => navigate("/dashboard/campaigns")}>
                                    View Campaigns
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Donation Receipt</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Download your donation receipts.</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" onClick={() => navigate("/dashboard/receipts")}>
                                    Get Receipts
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                </div>
            </Main>
        </>
    );
};

// Icon components (unchanged)
function ArrowUpIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
        </svg>
    );
}

function PlusIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

export default Donate;