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
import { Camera } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
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
                                    // onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <div className="space-y-1.5">
                                <h1 className="text-2xl font-bold">Swapnil Mahadik</h1>
                                <p className="text-gray-500 dark:text-gray-400">Primary Member</p>
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
                                            <Input id="firstName" defaultValue="" />
                                        </div>
                                        <div>
                                            <Label htmlFor="middleName">Middle Name</Label>
                                            <Input id="middleName" defaultValue="" />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue="" />
                                        </div>

                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                            <Input id="dateOfBirth" defaultValue="" />
                                        </div>
                                        <div>
                                            <Label htmlFor="age">age</Label>
                                            <Input id="age" defaultValue="" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="gender">gender</Label>
                                        <Input id="gender" defaultValue="" />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>

                           {/* New Address Update Card */}
                           <Card>
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
                        </Card>

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
                                            placeholder="john.doe@example.com"
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
                                                placeholder="Enter your phone number"
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
                                                placeholder="Enter your 12-digit Aadhar number"
                                                pattern="[0-9]{12}"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="voter-id">Voter ID Number</Label>
                                            <Input
                                                id="voter-id"
                                                placeholder="Enter your Voter ID"
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
                                        <Switch id="email-notifications" defaultChecked />
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
                                        <Select defaultValue="light">
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
                                                <SelectItem value="es">Español</SelectItem>
                                                <SelectItem value="fr">Français</SelectItem>
                                                <SelectItem value="de">Deutsch</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="ml-auto">Save Preferences</Button>
                                </CardFooter>
                            </Card>
                    </div>
                  

<Separator/>    
<div className='font-bold text-3xl'>Update your Professional profile</div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Professional information</CardTitle>
                                <CardDescription>Update your profile information.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    {/* Basic Information */}
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

                                    {/* Expertise Section */}
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

                                    {/* Education Details */}
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

                                    {/* Upload Supporting Documents */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="documents">Upload Supporting Documents</Label>
                                        <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                    </div>

                                    {/* Social Media Links */}
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

                                    {/* Professional Skills */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="skills">Professional Skills</Label>
                                        <Textarea id="skills" rows={3} placeholder="List your key professional skills (e.g., Team Management, Python, Data Analysis)" />
                                    </div>

                                    {/* References/Recommendations */}
                                    {/* <div className="grid gap-2">
                                        <Label htmlFor="references">References/Recommendations</Label>
                                        <Textarea id="references" rows={3} placeholder="Provide professional references or recommendations" />
                                    </div> */}
                                </form>
                            </CardContent>
                            <CardFooter className="border-t p-6">
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                </div>
            </ContentLayout>
        </DashboardLayout>
    )
}

export default ProfilePage;