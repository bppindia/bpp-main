import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const WalletPage = () => {
    const navigate = useNavigate()

    return (
        <>
                <div className="grid gap-6 mt-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Balance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-4xl font-bold">Rs 0</div>
                            <div className='flex gap-3'>
                                <Button onClick={() => navigate('/dashboard/withdraw')} variant="outline" size="sm">
                                    Withdraw
                                </Button>
                                <Button onClick={() => navigate('/dashboard/add-fund')} variant="outline" size="sm">
                                    Add Fund
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                            </CardContent>
                            <CardFooter>
                                <Link to="/dashboard/transaction" className="text-sm font-medium text-blue-600 hover:underline">
                                    View all transactions
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Methods</CardTitle>
                            </CardHeader>
                            <CardContent>
                            </CardContent>
                            <CardFooter>
                                <Link to="#" className="text-sm font-medium text-blue-600 hover:underline">
                                    Add new payment method
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
        </>
    )
}
export default WalletPage;