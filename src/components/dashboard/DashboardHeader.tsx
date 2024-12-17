import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    CircleFadingArrowUp,
    LogOut,
    UserRoundPen,
    Users,
    Wallet
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
    const navigate = useNavigate()
    return (
        <Card className="w-full mb-6 border-0">
            <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    {/* Left Section: Dashboard Title and User Details */}
                    <div className="space-y-2">
                        <div className="text-lg text-gray-600">
                            Welcome back, <span className="font-medium">Swapnil</span>!
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-semibold text-gray-800">
                                    Swapnil Kishor Mahadik
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                                >
                                    <UserRoundPen className="h-4 w-4 text-gray-600" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-medium text-gray-600">Primary Member</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                                >
                                    <CircleFadingArrowUp className="h-4 w-4 text-gray-600" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section: Action Buttons */}
                    <div className="flex flex-col space-y-3">
                        <div>
                            <Button
                                variant="default"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Community Contribution
                            </Button>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="default"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => navigate('/dashboard/donate')}
                            >
                                Donate
                            </Button>
                            <Button
                                variant="default"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => navigate('/dashboard/votes')}
                            >
                                Votes
                            </Button>
                        </div>
                    </div>

                    {/* Right Section: Balance, Logout, and Membership Details */}
                    <div className="flex flex-col items-end space-y-4">
                        <div className="flex items-center gap-4">
                            <Wallet className="h-5 w-5 text-gray-700" />
                            <span className="text-sm font-medium text-gray-700">
                                Balance
                            </span>
                            ₹ 0
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg"
                            >
                                <LogOut className="h-5 w-5 text-gray-700" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                <Users className="h-4 w-4" />
                                <span className="text-sm font-medium">Membership No: 001</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">Valid until: Mar 26, 2028</span>
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className="text-sm px-4 py-1 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            0 Referrals
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardHeader;