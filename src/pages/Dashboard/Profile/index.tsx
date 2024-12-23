import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import DashboardLayout from '@/layout/DashboardLayout'
import { useTheme } from '@/provider/theme-provider'
import { Camera, ClipboardCopy } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const ProfilePage = () => {
    const { userData } = useSelector((state: any) => state.auth);
    const { setTheme } = useTheme();
    // const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png");
    const profileImage = "https://github.com/shadcn.png"

    // const handleImageChange = (event: { target: { files: any[] } }) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfileImage(profileImage);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <DashboardLayout>
            <ContentLayout title="Dashboard">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="px-4 space-y-6 md:px-6 mt-3">
                    <header className="space-y-1.5">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={profileImage} alt="Profile" />
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <label
                                    htmlFor="profile-image-upload"
                                    className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
                                >
                                    <Camera size={16} />
                                    <input
                                        type="file"
                                        id="profile-image-upload"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            <div className="space-y-1.5">
                                <h1 className="text-2xl font-bold">{userData?.firstName} {userData?.lastName}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{userData?.role}</p>
                                {userData?.referralCode && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Referral Code: <span className="font-semibold">{userData.referralCode}</span>
                                        </span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(userData.referralCode || '');
                                                toast.success('Referral code copied to clipboard!');
                                            }}
                                            className="text-primary hover:text-primary-dark transition"
                                            title="Copy Referral Code"
                                        >
                                            <ClipboardCopy size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {/* Existing Profile Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your account's profile information.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>

                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue={userData?.firstName} />
                                        </div>
                                        <div>
                                            <Label htmlFor="middleName">Middle Name</Label>
                                            <Input id="middleName" defaultValue={userData?.middleName} />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue={userData?.lastName} />
                                        </div>

                                    </div>
                                    <div className='grid grid-cols-2  gap-2'>
                                        <div>
                                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                            <Input id="dateOfBirth" defaultValue={userData?.dateOfBirth} />
                                        </div>
                                        <div>
                                            <Label htmlFor="age">age</Label>
                                            <Input id="age" defaultValue={userData?.age} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="gender">gender</Label>
                                        <Input id="gender" defaultValue={userData?.gender} />
                                    </div>

                                    <Separator />
                                    <CardTitle className='my-2'>Address Information</CardTitle>
                                    <CardDescription>Update your current residential address.</CardDescription>
                                    <div className="grid mt-5 gap-2">
                                        <Label htmlFor="street-address">Address Line 1</Label>
                                        <Input id="street-address" placeholder={userData?.addressLine1} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="street-address">Address Line 2</Label>
                                        <Input id="street-address" placeholder={userData?.addressLine2} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder={userData?.cityOrVillage} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" placeholder={userData?.state} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postal-code">Postal Code</Label>
                                            <Input id="postal-code" placeholder={userData?.pincode} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Input id="country" placeholder="India" />
                                        </div>
                                    </div>

                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                        {userData?.profession && (

                            <Card>
                                <CardHeader>
                                    <CardTitle>Need to be update your Profession *</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Education Details</h3>
                                        <Separator className="my-4" />
                                        <form>
                                            <div className="grid grid-cols-12 gap-4">
                                                <div className="grid gap-2 col-span-8">
                                                    <Label htmlFor="university">Name of University / Institution / Organization *</Label>
                                                    <Input
                                                        id="university"
                                                        placeholder={userData?.qualification || "e.g., Harvard University, Oxford University"}
                                                    />
                                                </div>
                                                <div className="grid gap-2 col-span-4">
                                                    <Label htmlFor="passout">Passout Year</Label>
                                                    <Input
                                                        id="passout"
                                                        placeholder="e.g., 2019, 2020, 2021"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">Professional Details</h3>
                                        <Separator className="my-4" />
                                        <form className="space-y-4">
                                            <div className="grid grid-cols-12 gap-4">
                                                <div className="grid gap-2 col-span-5">
                                                    <Label>Professional Categories</Label>
                                                    <Input
                                                        id="profession"
                                                        placeholder="Select category"
                                                        disabled
                                                        value={userData?.profession}
                                                    />
                                                </div>
                                                <div className="grid gap-2 col-span-4">
                                                    <Label htmlFor="profession">Current Profession / Position</Label>
                                                    <Input
                                                        id="profession"
                                                        placeholder="e.g., Senior Surgeon, Software Engineer"
                                                    />
                                                </div>
                                                <div className="grid gap-2 col-span-3">
                                                    <Label htmlFor="experience">Years of Experience</Label>
                                                    <Input
                                                        id="experience"
                                                        placeholder="e.g., 5, 10, 15+"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="summary">Tell me your Professional Summary</Label>
                                                <Textarea
                                                    id="summary"
                                                    rows={3}
                                                    placeholder="e.g., Experienced cardiac surgeon with 10+ years of practice..."
                                                />
                                                <span className="text-xs text-muted-foreground">500/500 limit</span>
                                            </div>
                                        </form>
                                    </div>


                                    <h3 className="text-lg font-semibold">Upload Documents</h3>
                                    <Separator className="my-4" />
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="degree">Professional Degree *</Label>
                                            <Input type="file" id="degree" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="experience-cert">Experience Certificate (if any)</Label>
                                            <Input type="file" id="experience-cert" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                                        <Separator className="my-4" />
                                        <ul className="list-disc pl-5 text-sm">
                                            <li>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec venenatis metus.
                                            </li>
                                            <li>
                                                Quisque volutpat velit eu sapien auctor, in ultrices augue tincidunt.
                                            </li>
                                            <li>
                                                Ut malesuada, sem sit amet vulputate pretium, tortor enim efficitur risus, at scelerisque est metus id leo.
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t p-6">
                                    <Button onClick={() => { alert('error while saving data') }}>Save Changes</Button>
                                </CardFooter>
                            </Card>
                        )}
                        {/* 
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                                    <Separator className="my-4" />
                                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Quisque volutpat velit eu sapien auctor.</li>
                                        </ul> */}

                        {/* New Address Update Card */}
                        {/* <Card>
                            <CardHeader>
                                <CardTitle>Address Information</CardTitle>
                                <CardDescription>Update your current residential address.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="street-address">Address Line 1</Label>
                                        <Input id="street-address" placeholder="123 Main Street" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="street-address">Address Line 2</Label>
                                        <Input id="street-address" placeholder="123 Main Street" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder="Mumbai" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" placeholder="Maharashtra" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postal-code">Postal Code</Label>
                                            <Input id="postal-code" placeholder="400001" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Input id="country" placeholder="India" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Update Address</Button>
                            </CardFooter>
                        </Card> */}

                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>Update your email and phone number.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact-email">Email Address</Label>
                                        <Input
                                            id="contact-email"
                                            type="email"
                                            placeholder={userData?.email}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone-number">Phone Number</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="country-code"
                                                defaultValue="+91"
                                                className="w-20"
                                            />
                                            <Input
                                                id="phone-number"
                                                type="tel"
                                                placeholder={userData?.phone}
                                                className="flex-1"
                                            />
                                        </div>
                                    </div>

                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Update Contact</Button>
                            </CardFooter>
                        </Card>


                        {/* New Voter ID and Aadhar Number Update Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Government IDs</CardTitle>
                                <CardDescription>Update your Voter ID and Aadhar number.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label htmlFor="aadhar-number">Aadhar Number</Label>
                                            <Input
                                                id="aadhar-number"
                                                placeholder={userData?.aadhaarNumber}
                                                pattern="[0-9]{12}"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="voter-id">Voter ID Number</Label>
                                            <Input
                                                id="voter-id"
                                                placeholder={userData?.voterID}
                                                pattern="[A-Z]{3}[0-9]{7}"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="documents">Upload Supporting Documents</Label>
                                        <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="documents">Upload Supporting Documents</Label>
                                        <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Update IDs</Button>
                            </CardFooter>
                        </Card>


                        {/* Existing Notification Settings Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Manage your account's notification preferences.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Email Notifications</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive email notifications for important updates.
                                            </p>
                                        </div>
                                        <Switch id="email-notifications" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Push Notifications</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications for real-time updates.
                                            </p>
                                        </div>
                                        <Switch id="push-notifications" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">SMS Notifications</p>
                                            <p className="text-sm text-muted-foreground">Receive SMS notifications for critical alerts.</p>
                                        </div>
                                        <Switch id="sms-notifications" />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select defaultValue="light" onValueChange={(value: 'light' | 'dark' | 'system') => setTheme(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                    {/* <Separator />
                    <div className='font-bold text-3xl'>Update your Professional profile</div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Professional information</CardTitle>
                            <CardDescription>Update your profile information.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4">
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Label htmlFor="qualification">Qualification</Label>
                                        <Input id="qualification" defaultValue="Masters in Chemistry" disabled />
                                    </div>
                                    <div>
                                        <Label htmlFor="profession">Profession</Label>
                                        <Select disabled>
                                            <SelectTrigger id="profession">
                                                <SelectValue placeholder="Select your profession" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="medical">Medical</SelectItem>
                                                <SelectItem value="lawyer">Lawyer</SelectItem>
                                                <SelectItem value="engineer">Engineer</SelectItem>
                                                <SelectItem value="social-worker">Social Worker</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="position">Position</Label>
                                        <Input disabled id="position" type="text" placeholder="E.g., Manager, Team Lead" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="expertise">Select Your Expertise</Label>
                                        <Input id="expertise" placeholder="E.g., Software Development, Healthcare" />
                                    </div>
                                    <div>
                                        <Label htmlFor="current-expertise">Current Expertise</Label>
                                        <Input id="current-expertise" placeholder="E.g., React Developer, Cardiologist" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Label htmlFor="education">Education</Label>
                                        <Input id="education" placeholder="E.g., MBBS, LLB, MSW" />
                                    </div>
                                    <div>
                                        <Label htmlFor="university">University</Label>
                                        <Input id="university" placeholder="E.g., Harvard University" />
                                    </div>
                                    <div>
                                        <Label htmlFor="degree">Degree</Label>
                                        <Input id="degree" placeholder="E.g., Doctorate, Bachelor's" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="passout-year">Passout Year</Label>
                                        <Input id="passout-year" type="number" placeholder="E.g., 2020" />
                                    </div>
                                    <div>
                                        <Label htmlFor="quality">Quality</Label>
                                        <Input id="quality" placeholder="E.g., Leadership, Creativity" />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="documents">Upload Supporting Documents</Label>
                                    <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
                                        <Input id="linkedin" type="url" placeholder="E.g., https://www.linkedin.com/in/username" />
                                    </div>
                                    <div>
                                        <Label htmlFor="portfolio">Portfolio (optional)</Label>
                                        <Input id="portfolio" type="url" placeholder="E.g., https://portfolio.example.com" />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="skills">Professional Skills</Label>
                                    <Textarea id="skills" rows={3} placeholder="List your key professional skills (e.g., Team Management, Python, Data Analysis)" />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="border-t p-6">
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card> */}
                </div>
            </ContentLayout>
        </DashboardLayout>
    )
}

export default ProfilePage;