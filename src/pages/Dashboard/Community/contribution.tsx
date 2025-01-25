import { ContentLayout } from "@/components/admin-panel/content-layout"
import communityChart from '@/assets/images/community/community_contribution.png'
import internalWorking from '@/assets/images/community/internalworking.png'
import { PopupDialog } from "@/components/dialogs/popup-dialog"
import MapChart from "@/components/maps/mapChart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/layout/DashboardLayout"
import { ActivityIcon, PlusIcon, User2Icon, UsersIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { defineStepper } from "@stepperize/react"

const Contribution = () => {
    return (
        <DashboardLayout>
            <ContentLayout title="Dashboard">
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-4 w-full">
                    <Card className="w-full h-[500px] p-4">
                        <CardContent className="h-[calc(500px-4rem)]">
                            <MapChart SelectedTab='state' state='maharashtra' dist='raigarh' />
                        </CardContent>
                    </Card>
                    <Card className="h-full overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Community Contribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 h-[calc(100%-4rem)] overflow-auto">
                            <CommunityContribution />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 my-3 gap-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Maharashtra</CardTitle>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 p-5">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                                    <UsersIcon className="h-6 w-6 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                    <p className="text-xs text-muted-foreground">+00% from last month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Primary Members</CardTitle>
                                    <ActivityIcon className="h-6 w-6 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                    <p className="text-xs text-muted-foreground">+00% from last month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">New Members This Month</CardTitle>
                                    <PlusIcon className="h-6 w-6 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                    <p className="text-xs text-muted-foreground">+00% from last month</p>
                                </CardContent>
                            </Card>

                            {/* Active Now */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                    <User2Icon className="h-6 w-6 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+0</div>
                                    <p className="text-xs text-muted-foreground">+0 since last hour</p>
                                </CardContent>
                            </Card>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <img src={internalWorking} />
                        </div>
                    </Card>
                    <div>
                    </div>
                </div>
            </ContentLayout>
            {/* <PayDialog /> */}
        </DashboardLayout>
    )
}

export default Contribution;


const steps = [
    { id: 'raiseQuery', label: 'Raise Your Query' },
    { id: 'reviewApproval', label: 'Review & Approval' },
    { id: 'votes', label: 'Votes' },
    { id: 'results', label: 'Results' },
    { id: 'executions', label: 'Executions' },
];

const { useStepper, steps: stepperSteps, utils } = defineStepper(...steps);


const CommunityContribution = () => {
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="space-y-4">
            <Stepper />

            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800">
                    Community Contribution Launch <br />
                    Announcement
                </h3>
                <p className="text-sm text-gray-700 mt-2">
                    The Community Contribution App Services will be operational soon, depending
                    upon the masses joining the party so that maximum benefit can be taken from the
                    Party’s initiative.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                    Our target is to reach to the mass by 01.01.2026. allowing a large number of citizens to be the part of movement during this one year.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                    Meanwhile, <span className="font-bold">Bharatiya Popular Party's Legal wing</span> is available for ‘Free Legal Guidance’ to its primary and active members. Because this is being provided by the party's wing so no voting is required for the purpose and can be started to avail by <span className="font-bold">01.02.2025.</span>
                </p>
            </div>

            <div>
                <div className="grid grid-cols-2 gap-2">
                    <Label className="my-2 font-bold text-blue-900 text-xl">Type of Support</Label>
                    <Label className="my-2 font-bold text-blue-900 text-xl">Category</Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Select defaultValue="select...">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BPP Support">BPP Support (Free)</SelectItem>
                            <SelectItem value="Legal Cases" disabled>Legal Cases</SelectItem>
                            <SelectItem value="Medical Cases" disabled>Medical Cases</SelectItem>
                            <SelectItem value="Social Needs" disabled>Social Needs</SelectItem>
                            <SelectItem value="Educational Cases" disabled>Educational Cases</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="select...">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Legal Assistance">Legal Assistance</SelectItem>
                            <SelectItem value="Legal Aid" disabled>Legal Aid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-md">
                    <a className="w-full mt-4 text-blue-700 cursor-pointer text-sm"
                        onClick={() => setDialogOpen(true)}>Terms and Conditions</a>
                </div>
            </div>

            <Button
                onClick={() => navigate('/dashboard/register-case')}
                className="w-full mt-4"
            >
                Get Started
            </Button>

            <PopupDialog
                isOpen={isDialogOpen}
                onOpenChange={setDialogOpen}
                url={communityChart}
                body={
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Terms of Service</h2>
                        <p>These Terms of Service (the “Terms”) are a binding contract between you and Bharatiya Popular Party,
                            (“Bharatiya Popular Party,” “we” “our”) Your use of the Services in any way means that you agree to all
                            of these Terms, and these Terms will remain in effect while you use the Services.</p>

                        <p>Please read these Terms carefully. They cover important information about Services provided to you.</p>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>The support provided is intended to assist members facing genuine concerns or issues. It is not a crowdfunding
                                initiative and should not be construed as such.</li>
                            <li>Each concern for support will be reviewed and evaluated individually by the Administrator of the Bharatiya
                                Popular Party. Approval and the nature of assistance provided may vary based on the specifics of the case.</li>
                            <li>The Bharatiya Popular party is not responsible for any failure or delays in the resolution of issues.</li>
                            <li>Members must ensure that all information provided in their application is accurate and complete. False or
                                misleading information may result in the rejection of the application or termination of support.</li>
                            <li>All personal and case-related information shared will be treated with strict confidentiality.</li>
                            <li>Members must comply with the verification process, including submitting necessary documents such as identity
                                proof and details related to the issue.</li>
                            <li>We provide your Personal Data to parties that help us provide the Services or perform functions.</li>
                            <li>The Bharatiya Popular party is not liable for any adverse outcomes or consequences resulting from the
                                assistance provided. Members are encouraged to seek independent advice where necessary.</li>
                            <li>We do not knowingly collect or solicit Personal Data about children under 18 years of age.</li>
                            <li>The Bharatiya Popular party provides support voluntarily and is not legally obligated to resolve any member’s
                                issue.</li>
                            <li>Bharatiya Popular party is also free to terminate (or suspend access to) your use of the Services or your account
                                for any reason in our discretion, including your breach of these Terms.</li>
                            <li>The organizing body reserves the right to modify or update these terms and conditions at any time. Members will
                                be notified of significant changes as necessary.</li>
                            <li>By seeking support, members acknowledge that they have read, understood, and agreed to these terms and
                                conditions.</li>
                        </ol>
                        <p>If you have any questions, comments, or concerns regarding these terms or the
                            Services, please contact us at:
                            Email: bpp.headoffice@gmail.com</p>
                    </div>
                }
            />
        </div>
    );
};

export const Stepper = () => {
    const stepper = useStepper();
    const currentIndex = utils.getIndex(stepper.current.id);

    return (
        <div className="relative space-y-4">
            <div className="relative h-3 bg-gray-200 rounded-full">
                <div className="absolute h-full bg-primary rounded-full transition-all"></div>
                <div className="absolute inset-0 flex justify-between">
                    {stepperSteps.map((step, index) => (
                        <div
                            key={step.id}
                            className="relative flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg"
                            style={{
                                left: '30px',
                                transform: "translateY(-30%) translateX(-90%)",
                            }}
                        >
                            <div
                                className={`w-full h-full flex items-center justify-center rounded-full font-medium ${index <= currentIndex
                                    ? "bg-primary text-white"
                                    : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between">
                {stepperSteps.map((step) => (
                    <span key={step.id} className="text-sm font-medium max-w-[100px]">
                        {step.label}
                    </span>
                ))}
            </div>
        </div>
    );
};
