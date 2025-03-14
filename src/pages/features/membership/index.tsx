import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HeaderNav } from '@/components/layout/dashboard/header-nav';
import { Main } from '@/components/layout/dashboard/main';
import { QrCode } from 'lucide-react';
import bppcard from '@/assets/images/BPPcard.png';

// Mock API calls (replace with real endpoints)
const fetchMembershipData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        certificateUrl: bppcard,
        referralCode: '5d2d0a',
        referralLink: 'https://placehold.co/800x700',
        membershipStatus: 'Primary',
    };
};

const renewMembership = async (plan: 'Primary' | 'Active') => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Membership renewed to ${plan}`);
};

export default function Membership() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [membershipData, setMembershipData] = useState({
        certificateUrl: '',
        referralCode: '',
        referralLink: '',
        membershipStatus: '',
    });

    // Fetch membership data on mount
    useEffect(() => {
        const loadMembership = async () => {
            try {
                const data = await fetchMembershipData();
                setMembershipData(data);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load membership data.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };
        loadMembership();
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(membershipData.referralLink);
        toast({
            title: 'Link Copied',
            description: 'Referral link copied to clipboard.',
        });
    };

    const handleRenew = async (plan: 'Primary' | 'Active') => {
        try {
            await renewMembership(plan);
            setMembershipData(prev => ({ ...prev, membershipStatus: plan }));
            toast({
                title: 'Membership Renewed',
                description: `Your membership has been upgraded to ${plan}.`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to renew membership.',
                variant: 'destructive',
            });
        }
    };

    return (
        <>
            <Main fixed>
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Membership</h1>
                            <p className="text-sm text-muted-foreground">Manage your political party membership details.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted-foreground">Loading membership details...</div>
                    ) : (
                        <div className="mx-auto space-y-8">
                            {/* Membership Certificate */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">Membership Certificate</h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <QrCode className="w-24 h-24" />
                                        <p className="text-sm text-center">Scan the QR code to access your membership certificate.</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <img
                                                    src={membershipData.certificateUrl}
                                                    alt="Certificate Preview"
                                                    className="w-full h-[200px] object-contain rounded-md blur-sm hover:blur-none cursor-pointer transition-all"
                                                />
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[600px]">
                                                <DialogHeader>
                                                    <DialogTitle>Your Membership Certificate</DialogTitle>
                                                    <DialogDescription>
                                                        <img
                                                            src={membershipData.certificateUrl}
                                                            alt="Certificate Preview"
                                                            className="w-full h-[400px] object-contain rounded-md"
                                                        />
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="flex justify-end space-x-2">
                                                    <Button variant="secondary">
                                                        <a href={membershipData.certificateUrl} target="_blank" rel="noopener noreferrer">
                                                            Download
                                                        </a>
                                                    </Button>
                                                    <Button variant="destructive">Close</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <p className="text-sm text-center">Click the image to preview your certificate.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Referral */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">Referral</h2>
                                <div className="space-y-4">
                                    <p className="text-sm">Your Referral Code: <span className="font-mono font-bold">{membershipData.referralCode}</span></p>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="flex flex-col items-center space-y-2">
                                            <div className="w-full p-4 border rounded-lg">
                                                <code className="font-mono text-sm break-all">{membershipData.referralLink}</code>
                                            </div>
                                            <Button size="sm" onClick={handleCopyLink}>Copy Link</Button>
                                        </div>
                                        <div className="flex flex-col items-center space-y-2">
                                            <div className="w-full p-4 border rounded-lg">
                                                <img src="/placeholder.svg" width="150" height="150" alt="QR Code" className="aspect-square" />
                                            </div>
                                            <Button size="sm">Download QR Code</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">How it works</h3>
                                        <p className="text-sm text-muted-foreground">
                                            When someone signs up using your link, you get 1 member added to your referral count.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Renewals */}
                            <section>
                                <h2 className="mb-4 text-lg font-semibold">Upgrade Your Membership</h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold">Primary</h3>
                                            <p className="text-sm text-muted-foreground">For Common Man</p>
                                        </div>
                                        <p className="text-2xl font-bold">Rs 5/2yr</p>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                No referral required
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                For Common Man
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                24/7 Support
                                            </li>
                                        </ul>
                                        <Button className="w-full" onClick={() => handleRenew('Primary')}>
                                            Choose Plan
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold">Active</h3>
                                            <p className="text-sm text-muted-foreground">For Professionals</p>
                                        </div>
                                        <p className="text-2xl font-bold">Rs 250/2yr</p>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                Minimum 10 Referrals Required
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                For Professionals
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                Priority Support
                                            </li>
                                        </ul>
                                        <Button className="w-full" onClick={() => handleRenew('Active')}>
                                            Choose Plan
                                        </Button>
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