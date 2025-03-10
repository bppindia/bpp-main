import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  CircleFadingArrowUp,
  Gift,
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
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-indigo-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Users className="h-5 w-5 text-blue-600 dark:text-indigo-400" />
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Info */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {`${userData?.firstName || ''} ${userData?.middleName || ''} ${userData?.lastName || ''}`}
                </div>
                <div className="text-gray-600 dark:text-gray-300 flex flex-wrap items-center gap-2">
                  <span>{userData?.role || 'N/A'}</span>
                  <Badge variant="secondary" className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    Membership ID: {String(userData?.id).padStart(3, '0')}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-blue-50 dark:hover:bg-indigo-900 text-blue-600 dark:text-indigo-400 transition-all duration-200"
                  aria-label="Edit Profile"
                >
                  <UserRoundPen className="h-4 w-4" />
                </Button>
                <Badge className="bg-blue-50 dark:bg-indigo-900 text-blue-700 dark:text-indigo-300 hover:bg-blue-100 dark:hover:bg-indigo-800 border-0">
                  {userData?.referralCount || 0} Referrals
                </Badge>
              </div>
            </div>

            {/* Validity Section */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-indigo-400" />
              <span>
                Valid until: <strong>{userData?.validUntil || 'Not set'}</strong>
              </span>
            </div>

            {/* Referral Code Section */}
            <div className="flex items-center justify-between bg-blue-50 dark:bg-indigo-900 p-3 rounded-lg">
              <div className="text-sm text-gray-700 dark:text-indigo-200">
                Referral Code: <strong className="text-gray-800 dark:text-white">{userData?.referralCode || 'N/A'}</strong>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 dark:text-indigo-300 border-blue-200 dark:border-indigo-700 hover:bg-blue-100 dark:hover:bg-indigo-800 transition-all duration-200"
                onClick={() => navigator.clipboard.writeText(userData?.referralCode || '')}
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-indigo-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-indigo-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="default"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 rounded-lg"
              onClick={() => navigate('/dashboard/community-contribution')}
            >
              <Gift className="h-4 w-4" />
              Community Contribution
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg"
                onClick={() => navigate('/dashboard/donate')}
              >
                <Gift className="h-4 w-4 mr-2" />
                Donate
              </Button>
              <Button
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg"
                onClick={() => navigate('/dashboard/votes')}
              >
                <Vote className="h-4 w-4 mr-2" />
                Votes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-indigo-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Wallet className="h-5 w-5 text-blue-600 dark:text-indigo-400" />
              Balance Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Current Balance</span>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">₹ 0</span>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="outline"
                className="w-full border-blue-200 dark:border-indigo-700 hover:bg-blue-50 dark:hover:bg-indigo-900 hover:border-blue-300 dark:hover:border-indigo-600 text-blue-600 dark:text-indigo-300 transition-all duration-300 flex items-center justify-center gap-2 rounded-lg"
              >
                <CircleFadingArrowUp className="h-4 w-4" />
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