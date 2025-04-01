import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftIcon, CreditCardIcon } from "lucide-react"
import {  useNavigate } from "react-router-dom"

const AddFund = () => {
    const navigate = useNavigate()
    return (
        <>
            <>
        <main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold md:text-xl">Add funds to account</h1>
            </div>
            <Card className="border border-gray-200 border-dashed rounded-lg dashed dark:border-gray-800">
                <CardContent className="flex flex-col items-center gap-2 p-6">
                    <CreditCardIcon className="w-12 h-12" />
                    <CardTitle className="text-center">Pay with Credit or Debit Card</CardTitle>
                    <CardDescription className="text-center">
                        Secure payment with your Visa, Mastercard, or American Express card.
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-end p-4">
                    <Button onClick={()=> navigate('/dashboard/payment-gateway')}>Pay Rs 5.00</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardContent>
                    <div className="grid gap-4 p-6">
                        <div>
                            <CardTitle className="mb-2 text-2xl font-bold">Payment method</CardTitle>
                            <CardDescription>Add a new payment method or select an existing one.</CardDescription>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Credit or Debit Card</CardTitle>
                                        <CardDescription>Visa, Mastercard</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <div>
                                                <Label htmlFor="name">Name on card</Label>
                                                <Input id="name" placeholder="Enter your name" />
                                            </div>
                                            <div>
                                                <Label htmlFor="number">Card number</Label>
                                                <Input id="number" placeholder="Enter your card number" />
                                            </div>
                                            <div className="grid gap-4">
                                                <div>
                                                    <Label htmlFor="expiry">Expiry date</Label>
                                                    <Input id="expiry" placeholder="MM/YY" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvc">CVC</Label>
                                                    <Input id="cvc" placeholder="Enter your CVC" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Google Pay</CardTitle>
                                        <CardDescription>Scan here</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex justify-center">
                                        <img
                                            src="/placeholder.svg"
                                            width="200"
                                            height="100"
                                            alt="PayPal"
                                            className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
        </>
        </>
    )
}

export default AddFund