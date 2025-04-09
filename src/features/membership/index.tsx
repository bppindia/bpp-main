// src/pages/membership/Membership.tsx
import { useEffect, useState } from 'react';
import { Main } from '@/components/layout/dashboard/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { QrCode, Download, Calendar, User, Award, Users, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import bppcard from '@/assets/images/BPPcard.png';
import bppLogo from '@/assets/logo/bppLogo.svg';
import { Header } from '@/components/layout/dashboard/header';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { ProfileDropdown } from '@/components/profile-dropdown';

// Mock API call
interface MembershipData {
  membershipType: 'primary' | 'active' | 'executive';
  membershipNumber: string;
  joinDate: string;
  expiryDate: string;
  certificateUrl: string;
  referralCount: number; // Added
}

const fetchMembershipData = async (): Promise<MembershipData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    membershipType: 'primary',
    membershipNumber: 'BPP123456',
    joinDate: '2024-01-01',
    expiryDate: '2026-01-01',
    certificateUrl: bppcard,
    referralCount: 5, // Mock data
  };
};

const membershipBenefits = {
  primary: {
    color: 'bg-blue-100 border-blue-300',
    badgeColor: 'from-blue-200 to-blue-400',
    title: 'Primary Membership',
    tier: 'Bronze',
    benefits: [
      'No referral required',
      'Access to basic community features',
      '24/7 support',
    ],
  },
  active: {
    color: 'bg-red-100 border-red-300',
    badgeColor: 'from-red-200 to-red-400',
    title: 'Active Membership',
    tier: 'Silver',
    benefits: [
      'Minimum 10 referrals required',
      'Priority support',
      'Exclusive access to professional events',
    ],
  },
  executive: {
    color: 'bg-orange-100 border-orange-300',
    badgeColor: 'from-orange-200 to-orange-400',
    title: 'Executive Committee',
    tier: 'Gold',
    benefits: [
      'Leadership role in party decisions',
      'Priority event invitations',
      'Enhanced networking opportunities',
    ],
  },
};

// ... (rest of the imports and setup remain unchanged)

export default function Membership() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);

  useEffect(() => {
    const loadMembership = async () => {
      try {
        const data = await fetchMembershipData();
        if (user?.membership) {
          data.membershipType = user.membership === 'primary' ? 'primary' : user.membership === 'business' ? 'active' : 'executive';
        }
        setMembershipData(data);
      } catch (_error) {
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
  }, [user]);

  const handleDownloadCertificate = () => {
    if (membershipData?.certificateUrl) {
      window.open(membershipData.certificateUrl, '_blank');
      toast({
        title: 'Download Started',
        description: 'Your certificate is being downloaded.',
      });
    }
  };

  if (loading || !membershipData) {
    return (
      <Main fixed>
        <div className="py-10 text-center text-muted-foreground">Loading membership details...</div>
      </Main>
    );
  }

  const currentMembership = membershipBenefits[membershipData.membershipType];
  const isActive = new Date(membershipData.expiryDate) > new Date();
  const daysRemaining = Math.ceil(
    (new Date(membershipData.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const totalDays = Math.ceil(
    (new Date(membershipData.expiryDate).getTime() - new Date(membershipData.joinDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const progressPercentage = Math.min((daysRemaining / totalDays) * 100, 100);

  return (
    <>
      <Header fixed>
        <Search />
        <div className="flex items-center ml-auto space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
    <Main>
      <div className="mx-auto w-full">
        <h1 className="mb-6 text-3xl font-bold">Membership Details</h1>

        {/* Enhanced Badge-like Membership Card */}
        <Card className={`${currentMembership.color} mb-8 shadow-md rounded-lg relative overflow-hidden border-2`}>
          {/* Background SVG Shade */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10"
            style={{ backgroundImage: `url(${bppLogo})` }}
          />
          <CardContent className="flex relative flex-col gap-6 items-center p-6 sm:flex-row sm:items-start">
            {/* Badge Circle */}
            <div
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-gradient-to-br ${currentMembership.badgeColor} shadow-md border-4 border-white`}
            >
              <Award className="w-12 h-12 text-white sm:w-16 sm:h-16" />
            </div>

            {/* Card Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">{currentMembership.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${isActive ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200'}`}
                >
                  {isActive ? 'Active' : 'Expired'}
                </span>
              </div>
             
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="flex justify-center items-center text-sm text-muted-foreground sm:justify-start">
                    <User className="mr-2 w-4 h-4" /> Membership Number
                  </p>
                  <p className="font-mono font-bold">{membershipData.membershipNumber}</p>
                </div>
                <div>
                  <p className="flex justify-center items-center text-sm text-muted-foreground sm:justify-start">
                    <Calendar className="mr-2 w-4 h-4" /> Joining Date
                  </p>
                  <p>{new Date(membershipData.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="flex justify-center items-center text-sm text-muted-foreground sm:justify-start">
                    <Calendar className="mr-2 w-4 h-4" /> Expiry Date
                  </p>
                  <p>{new Date(membershipData.expiryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="flex justify-center items-center text-sm text-muted-foreground sm:justify-start">
                    <Users className="mr-2 w-4 h-4" /> Referral Count
                  </p>
                  <p className="font-bold">{membershipData.referralCount}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="flex justify-center items-center text-sm text-muted-foreground sm:justify-start">
                    <Clock className="mr-2 w-4 h-4" /> Days Remaining
                  </p>
                  <div className="flex gap-2 items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${membershipData.membershipType === 'primary' ? 'bg-blue-500' : membershipData.membershipType === 'active' ? 'bg-red-500' : 'bg-orange-500'}`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{daysRemaining} days</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center mt-4 sm:flex-row sm:justify-start">
                <Button variant="outline" className="w-full sm:w-auto">
                  Renew Membership
                </Button>
                <Button variant="ghost" className="flex gap-2 items-center w-full sm:w-auto">
                  <QrCode className="w-4 h-4" /> View Certificate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership Benefits */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Benefits</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {currentMembership.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Membership Certificate */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Membership Certificate</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="flex flex-col items-center pt-6 space-y-4">
                <QrCode className="w-24 h-24" />
                <p className="text-sm text-center text-muted-foreground">
                  Scan the QR code to access your membership certificate.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={membershipData.certificateUrl}
                      alt="Certificate Preview"
                      className="object-contain w-full h-40 rounded-md blur-sm transition-all cursor-pointer hover:blur-none"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Your Membership Certificate</DialogTitle>
                      <DialogDescription>
                        <img
                          src={membershipData.certificateUrl}
                          alt="Certificate"
                          className="w-full h-[400px] object-contain rounded-md"
                        />
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <Button onClick={handleDownloadCertificate}>
                        <Download className="mr-2 w-4 h-4" /> Download
                      </Button>
                      <Button variant="destructive">Close</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button onClick={handleDownloadCertificate} variant="outline">
                  <Download className="mr-2 w-4 h-4" /> Download Certificate
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Click the image to preview your certificate.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Main>
    </>
  );
}