import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    CircleFadingArrowUp,
    Gift,
    LogOut,
    TrendingUp,
    UserRoundPen,
    Users,
    Vote,
    Wallet
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
    const { userData } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Welcome back, {userData?.firstName}!
                        </h2>
                        <p className="text-gray-600">Here's your dashboard overview</p>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-2 hover:bg-blue-50"
                        onClick={() => {/* Add logout handler */ }}
                    >
                        <LogOut className="h-5 w-5 text-gray-700" />
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Card */}
<Card className="border hover:border-blue-300 transition-all duration-200 rounded-lg shadow-sm">
  <CardHeader className="pb-2">
    <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800">
      <Users className="h-5 w-5 text-blue-600" />
      Profile Details
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* User Info */}
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="text-2xl font-semibold text-gray-900">
          {`${userData?.firstName || ''} ${userData?.middleName || ''} ${userData?.lastName || ''}`}
        </div>
        <div className="text-gray-600 flex flex-wrap items-center gap-2">
          <span>{userData?.role || 'N/A'}</span>
          <Badge variant="secondary" className="px-2 py-1">
            Membership ID: {String(userData?.id).padStart(3, '0')}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-blue-50"
          aria-label="Edit Profile"
        >
          <UserRoundPen className="h-4 w-4 text-blue-600" />
        </Button>
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
          {userData?.referralCount || 0} Referrals
        </Badge>
      </div>
    </div>

    {/* Validity Section */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Calendar className="h-4 w-4" />
      <span>
        Valid until: <strong>{userData?.validUntil || 'Not set'}</strong>
      </span>
    </div>

    {/* Referral Code Section */}
    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
      <div className="text-sm text-gray-700">
        Referral Code: <strong className="text-gray-800">{userData?.referralCode || 'N/A'}</strong>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-blue-600 border-blue-200 hover:bg-blue-100"
        onClick={() => navigator.clipboard.writeText(userData?.referralCode || '')}
      >
        Copy
      </Button>
    </div>
  </CardContent>
</Card>


                {/* Actions Card */}
                <Card className="border-2 hover:border-blue-200 transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            variant="default"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <Gift className="h-4 w-4" />
                            Community Contribution
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="default"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => navigate('/dashboard/donate')}
                            >
                                <Gift className="h-4 w-4 mr-2" />
                                Donate
                            </Button>
                            <Button
                                variant="default"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => navigate('/dashboard/votes')}
                            >
                                <Vote className="h-4 w-4 mr-2" />
                                Votes
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Balance Card */}
                <Card className="border-2 hover:border-blue-200 transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-blue-600" />
                            Balance Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Current Balance</span>
                            <span className="text-2xl font-bold text-gray-800">₹ 0</span>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                variant="outline"
                                className="w-full border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <CircleFadingArrowUp className="h-4 w-4 text-blue-600" />
                                Add Funds
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardHeader;