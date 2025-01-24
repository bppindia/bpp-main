import bppcard from '@/assets/images/BPPcard.png'
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DashboardLayout from "@/layout/DashboardLayout"
import { QrCode } from "lucide-react"
import { Link } from "react-router-dom"

const Membership = () => {
    const certificateUrl = bppcard;
    const certificatePreviewUrl = bppcard;
    return (
        <DashboardLayout>
            <ContentLayout title="Dashboard">
                {/* <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to="/dashboard/membership">Membership</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-4 w-full">
                    <Card className="w-full h-[500px] p-4">

                        <CardContent className="h-[calc(500px-4rem)]">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <QrCode className="h-16 w-16" />
                                <p>Scan the QR code to access your membership certificate.</p>
                            </div>
                            <div className="flex pt-12 flex-col items-center justify-center space-y-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <img
                                            src={certificatePreviewUrl}
                                            alt="Certificate Preview"
                                            className="w-full h-[200px] object-contain rounded-md blur-sm hover:blur-none cursor-pointer transition-all"
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>Your Membership Certificate</DialogTitle>
                                            <DialogDescription>
                                                <img
                                                    src={certificatePreviewUrl}
                                                    alt="Certificate Preview"
                                                    className="w-full h-[400px] object-contain rounded-md"
                                                />
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="secondary">
                                                <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                                                    Download
                                                </a>
                                            </Button>
                                            <Button variant="destructive">Close</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <p>Click the image to preview your certificate.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-full overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Community Contribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 h-[calc(100%-4rem)] overflow-auto">
                            <div className="grid items-start gap-6 md:grid-cols-1">
                                <div className="items-center space-y-2">
                                    <div className="w-full p-4 border rounded-lg">
                                        <code className="font-mono">https://placehold.co/800x700</code>
                                    </div>
                                    <Button size="sm">Copy Link</Button>
                                </div>
                                <div className="items-center space-y-2">
                                    <div className="w-full p-4 border rounded-lg">
                                        <img src="/placeholder.svg" width="150" height="150" alt="QR Code" className="aspect-square" />
                                    </div>
                                    <Button size="sm">Download QR Code</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 my-3 gap-4 w-full">
                    <div>
                    </div>
                </div>
            </ContentLayout>
            {/* <PayDialog /> */}
        </DashboardLayout>
    )
}

export default Membership