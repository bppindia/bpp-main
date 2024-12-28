import bppFlag from '@/assets/images/logos/bppflag.png'
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
import { Camera, ClipboardCopy, Edit2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'


interface EditableCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    onSave: () => void;
}

const EditableCard: React.FC<EditableCardProps> = ({ title, description, children, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onSave();
        setIsEditing(false);
        toast.success('Changes saved successfully!');
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className='text-xl'>{title}</CardTitle>
                    {description && <CardDescription className='mt-2'>{description}</CardDescription>}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <Edit2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {React.Children.map(children, child =>
                    React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { disabled: !isEditing }) : child
                )}
            </CardContent>
            {isEditing && (
                <CardFooter className="border-t p-6">
                    <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
            )}
        </Card>
    );
};



const ProfilePage = () => {
    const { userData } = useSelector((state: any) => state.auth);
    const { setTheme } = useTheme();
    // const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png");
    const profileImage = "https://github.com/shadcn.png"

    function handleSave(): void {
        throw new Error('Function not implemented.')
    }

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
                    <header className="flex items-center justify-between">
                        {/* Left Section - Avatar and Details */}
                        <div className="flex items-center space-x-6">
                            {/* Profile Image */}
                            <div className="relative">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={profileImage} alt="Profile" />
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <label
                                    htmlFor="profile-image-upload"
                                    className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer shadow-md"
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

                            {/* User Details */}
                            <div className="space-y-2">
                                <h1 className="text-xl font-bold text-gray-800">
                                    {userData?.firstName} {userData?.lastName}
                                </h1>
                                <p className="text-sm text-gray-500">{userData?.role || 'N/A'}</p>
                                {userData?.referralCode && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">
                                            Referral Code: <span className="font-medium">{userData.referralCode}</span>
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

                        {/* Right Section - Flag */}
                        <div className="flex-shrink-0">
                            <img
                                src={bppFlag}
                                alt="BPP Flag"
                                className="w-28 h-28 object-contain"
                            />
                        </div>
                    </header>


                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {/* Existing Profile Information Card */}
                        <EditableCard
                            title="Profile Information"
                            description="Update your account's profile information"
                            onSave={handleSave}
                        >
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
                        </EditableCard>
                        {userData?.profession && (
                            <EditableCard
                                title="Professional Details"
                                description="Need to be update your Profession *"
                                onSave={handleSave}
                            >
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

                            </EditableCard>
                        )}



                        <EditableCard
                            title="Contact Information"
                            description="Update your email and phone number."
                            onSave={handleSave}
                        >
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
                        </EditableCard>


                        {/* New Voter ID and Aadhar Number Update Card */}

                        <EditableCard
                            title="Government IDs"
                            description="Update your Voter ID and Aadhar number."
                            onSave={handleSave}
                        >
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div>
                                            <Label htmlFor="aadhar-number">Aadhar Number</Label>
                                            <Input
                                                id="aadhar-number"
                                                placeholder={userData?.aadhaarNumber}
                                                pattern="[0-9]{12}"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label htmlFor="documents">Upload Aadhaar Front</Label>
                                                <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                            </div>
                                            <div>
                                                <Label htmlFor="documents">Upload Aadhaar Back</Label>
                                                <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <div>
                                            <Label htmlFor="voter-id">Voter ID Number</Label>
                                            <Input
                                                id="voter-id"
                                                placeholder={userData?.voterID}
                                                pattern="[A-Z]{3}[0-9]{7}"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label htmlFor="documents">Upload Voter Front</Label>
                                                <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                            </div>
                                            <div>
                                                <Label htmlFor="documents">Upload Voter Back</Label>
                                                <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </EditableCard>


                        {/* Existing Notification Settings Card */}
                        <EditableCard
                            title="Notification Settings"
                            description="Manage your account's notification preferences."
                            onSave={handleSave}
                        >
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
                        </EditableCard>
                        <EditableCard
                            title="Preferences"
                            description="Need to be update your Profession *"
                            onSave={handleSave}
                        >
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
                        </EditableCard>
                    </div>
                </div>
            </ContentLayout>
        </DashboardLayout>
    )
}

export default ProfilePage;