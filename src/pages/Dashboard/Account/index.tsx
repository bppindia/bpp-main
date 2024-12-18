import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DashboardLayout from '@/layout/DashboardLayout'
import { Link } from 'react-router-dom'

const AccountSettingsPage = () => {
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
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard/donate">Donate</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Make Donation</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <main className="flex-1 py-6 px-4 md:px-6 lg:py-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Account Setting</h1>
                                <p className="text-muted-foreground"></p>
                            </div>
                        </div>
                    <section>
                        <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div>
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" placeholder="Enter your current password" type="password" />
                                    </div>
                                    <div>
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" placeholder="Enter your new password" type="password" />
                                    </div>
                                    <div>
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" placeholder="Confirm your new password" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="ml-auto">Save Changes</Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Change Pin</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div>
                                        <Label htmlFor="current-pin">Current Pin</Label>
                                        <Input id="current-pin" placeholder="Enter your current pin" type="pin" />
                                    </div>
                                    <div>
                                        <Label htmlFor="new-pin">New Pin</Label>
                                        <Input id="new-pin" placeholder="Enter your new pin" type="pin" />
                                    </div>
                                    <div>
                                        <Label htmlFor="confirm-pin">Confirm Pin</Label>
                                        <Input id="confirm-pin" placeholder="Confirm your new pin" type="pin" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="ml-auto">Save Changes</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold my-4">Activity History</h2>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Details</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>2023-04-15</TableCell>
                                            <TableCell>Logged in</TableCell>
                                            <TableCell>Logged in from 192.168.1.100</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2023-04-12</TableCell>
                                            <TableCell>Updated profile</TableCell>
                                            <TableCell>Changed email and password</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2023-04-05</TableCell>
                                            <TableCell>Logged out</TableCell>
                                            <TableCell>Logged out from all devices</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2023-03-28</TableCell>
                                            <TableCell>Deleted account</TableCell>
                                            <TableCell>Deleted account and all associated data</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>
                </main>
                {/* <PayDialog /> */}
            </ContentLayout>
        </DashboardLayout>
    )
}

export default AccountSettingsPage;