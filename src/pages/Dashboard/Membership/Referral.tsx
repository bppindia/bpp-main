import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ReferralPage = () => {
    return (
        <div>
            <>
                <>
                    <main className="flex-1 px-4 py-8 bg-muted/40 md:px-6 lg:py-12">
                    <div className="container mx-auto ">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl font-bold">Referral</h1>
                                <p className="text-muted-foreground">Refer now to upgrade your account.</p>
                            </div>
                        </div>
                    <Card className="w-full max-w-3xl p-0">
                        <CardHeader className="p-6 border-b">
                            <CardTitle className="text-xl">Your Referral Code: 5d2d0a</CardTitle>
                            {/* <CardDescription>Share your referral link with friends to earn rewards.</CardDescription> */}
                        </CardHeader>
                        <CardContent className="p-6 border-t">
                            <div className="grid items-start gap-6 md:grid-cols-2">
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="w-full p-4 border rounded-lg">
                                        <code className="font-mono">https://placehold.co/800x700</code>
                                    </div>
                                    <Button size="sm">Copy Link</Button>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="w-full p-4 border rounded-lg">
                                        <img src="/placeholder.svg" width="150" height="150" alt="QR Code" className="aspect-square" />
                                    </div>
                                    <Button size="sm">Download QR Code</Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold">How it works</h3>
                            <p className="text-sm leading-6 md:text-base lg:text-[18px] xl:text-sm/relaxed text-gray-500 dark:text-gray-400">
                                When someone signs up using your link, you get 1 member, and.....
                            </p>
                        </CardContent>
                    </Card>
                    </div>
                    </main>
                </>
                {/* <PayDialog /> */}
            </>
        </div>
    )
}

export default ReferralPage;