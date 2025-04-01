import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast'; // Assuming you're using your toast hook
import { useAuth } from '@/context/AuthContext'; // Assuming AuthContext provides user data
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Main } from '@/components/layout/dashboard/main';
import { SVGProps } from 'react';

// Interface for referral data
interface Referral {
    name: string;
    date: string;
    status: 'Joined' | 'Pending';
    membershipNo: string;
    membershipType: 'Life Member' | 'Annual Member';
}

interface Earnings {
    total: number;
    pending: number;
    paid: number;
}

// Mock API calls (replace with real endpoints)
const fetchReferralData = async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return {
        referralLink: `https://bppindia.com/refer/${userId}`,
        referrals: [
            { name: 'John Doe', date: '2 days ago', status: 'Joined' as 'Joined', membershipNo: 'BPP-2025-001', membershipType: 'Life Member' as 'Life Member' },
            { name: 'Jane Appleseed', date: '1 week ago', status: 'Pending' as 'Pending', membershipNo: 'Pending', membershipType: 'Annual Member' as 'Annual Member' },
            { name: 'Sarah Miller', date: '3 weeks ago', status: 'Joined' as 'Joined', membershipNo: 'BPP-2025-010', membershipType: 'Life Member' as 'Life Member' },
        ],
        earnings: { total: 3, pending: 1, paid: 2 },
    };
};

export default function Referral() {
    const { user } = useAuth(); // Fetch user from AuthContext
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [referralLink, setReferralLink] = useState('');
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [earnings, setEarnings] = useState<Earnings>({ total: 0, pending: 0, paid: 0 });

    // Fetch referral data on mount
    useEffect(() => {
        const loadReferralData = async () => {
            if (!user) {
                toast({ title: 'Error', description: 'User not authenticated.', variant: 'destructive' });
                navigate('/login');
                return;
            }

            try {
                const data = await fetchReferralData(String(user.id)); // Ensure user ID is a string
                setReferralLink(data.referralLink);
                setReferrals(data.referrals);
                setEarnings(data.earnings);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load referral data.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };
        loadReferralData();
    }, [user, navigate]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => toast({ title: 'Success', description: 'Referral link copied to clipboard!' }))
            .catch(() => toast({ title: 'Error', description: 'Failed to copy link.', variant: 'destructive' }));
    };

    return (
        <>
            <Main fixed>
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Referrals</h1>
                            <p className="text-sm text-muted-foreground">
                                Invite supporters to join Bharatiya Popular Party and grow our community.
                            </p>
                        </div>
                        <Button className="w-full sm:w-auto">Invite Supporters</Button>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted-foreground">Loading referral data...</div>
                    ) : (
                        <div className="mx-auto space-y-8">
                            {/* Referral Link */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">Your Referral Link</h2>
                                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    <div className="w-full px-4 py-2 truncate bg-gray-200 rounded-md sm:flex-1 dark:bg-gray-800">
                                        {referralLink || 'Generating link...'}
                                    </div>
                                    <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!referralLink}>
                                        <CopyIcon className="w-5 h-5" />
                                        <span className="sr-only">Copy referral link</span>
                                    </Button>
                                </div>
                            </section>

                            {/* Your Referrals and Impact */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">Your Referrals & Impact</h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {/* Referrals List */}
                                    <div className="space-y-4">
                                        {referrals.map((referral, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarImage src="/placeholder-user.jpg" />
                                                        <AvatarFallback>{referral.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{referral.name}</div>
                                                        <div className="text-sm text-muted-foreground">Joined {referral.date}</div>
                                                    </div>
                                                </div>
                                                <Badge variant={referral.status === 'Joined' ? 'default' : 'secondary'}>
                                                    {referral.status}
                                                </Badge>
                                            </div>
                                        ))}
                                        {referrals.length === 0 && (
                                            <p className="text-muted-foreground">No referrals yet.</p>
                                        )}
                                    </div>

                                    {/* Impact Stats */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">Total Referrals</div>
                                                <div className="text-sm text-muted-foreground">All-time referrals</div>
                                            </div>
                                            <div className="text-2xl font-bold">{earnings.total}</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">Pending Approvals</div>
                                                <div className="text-sm text-muted-foreground">Awaiting verification</div>
                                            </div>
                                            <div className="text-2xl font-bold">{earnings.pending}</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">Active Members</div>
                                                <div className="text-sm text-muted-foreground">Confirmed members</div>
                                            </div>
                                            <div className="text-2xl font-bold">{earnings.paid}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Referral History */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">Referral History</h2>
                                <div className="overflow-x-auto border rounded-lg">
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
                                                            <Badge variant={referral.status === 'Joined' ? 'default' : 'secondary'}>
                                                                {referral.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>{referral.membershipNo}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                        No referral history found
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </section>

                            {/* How It Works */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">How It Works</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <UserPlusIcon className="w-10 h-10 text-primary" />
                                        <h3 className="text-lg font-semibold">Invite Supporters</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Share your unique referral link to invite people to join Bharatiya Popular Party.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <UsersIcon className="w-10 h-10 text-primary" />
                                        <h3 className="text-lg font-semibold">Build Community</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Each new member strengthens our party and amplifies our voice.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <AwardIcon className="w-10 h-10 text-primary" />
                                        <h3 className="text-lg font-semibold">Earn Recognition</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Top recruiters may receive party honors and special roles.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </Main>
        </>
    );
}

// Icons (unchanged from your code)
function CopyIcon(props: SVGProps<SVGSVGElement>) {
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

function UserPlusIcon(props: SVGProps<SVGSVGElement>) {
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

function UsersIcon(props: SVGProps<SVGSVGElement>) {
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

function AwardIcon(props: SVGProps<SVGSVGElement>) {
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