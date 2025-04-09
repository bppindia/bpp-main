import { Main } from '@/components/layout/dashboard/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Header } from '@/components/layout/dashboard/header';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { ProfileDropdown } from '@/components/profile-dropdown';

// Mock transaction data (replace with API call later)
type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    status: 'completed' | 'pending' | 'failed';
};

const mockTransactions: Transaction[] = [
    { id: 'TXN001', date: '2025-03-14', description: 'Donation from John Doe', amount: 5000, type: 'credit', status: 'completed' },
    { id: 'TXN002', date: '2025-03-13', description: 'Campaign Ad Spend', amount: -2000, type: 'debit', status: 'completed' },
    { id: 'TXN003', date: '2025-03-12', description: 'Fundraiser Event', amount: 10000, type: 'credit', status: 'pending' },
    { id: 'TXN004', date: '2025-03-11', description: 'Office Supplies', amount: -1500, type: 'debit', status: 'completed' },
];

// Mock wallet data (replace with API call later)
const walletData = {
    currentBalance: 13500, // Rs
    totalAmountRaised: 25000, // Rs
};

const Wallet = () => {
    const navigate = useNavigate();
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    // Limit transactions to 3 by default, show all when toggled
    const displayedTransactions = showAllTransactions
        ? mockTransactions
        : mockTransactions.slice(0, 3);

    return (
        <>
            <Header fixed>
                <Search />
                <div className="flex items-center ml-auto space-x-4">
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>
            <Main >
                <div className="flex flex-col gap-6 justify-between items-start mb-6 md:flex-row md:items-center">
                    <div className="w-full">
                        {/* Balance and Total Amount */}
                        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Balance</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center">
                                    <div className="text-4xl font-bold">Rs {walletData.currentBalance.toLocaleString()}</div>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => navigate({ to: '/dashboard/wallet/add-fund' })}
                                            variant="outline"
                                            size="sm"
                                        >
                                            Add Fund
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Amount Raised</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold">Rs {walletData.totalAmountRaised.toLocaleString()}</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Transactions */}
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {mockTransactions.length === 0 ? (
                                    <p className="text-muted-foreground">No transactions yet.</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {displayedTransactions.map((txn) => (
                                                <TableRow key={txn.id}>
                                                    <TableCell>{txn.date}</TableCell>
                                                    <TableCell>{txn.description}</TableCell>
                                                    <TableCell
                                                        className={txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}
                                                    >
                                                        {txn.type === 'credit' ? '+' : '-'} Rs {Math.abs(txn.amount).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={txn.type === 'credit' ? 'default' : 'destructive'}>
                                                            {txn.type}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                txn.status === 'completed'
                                                                    ? 'default'
                                                                    : txn.status === 'pending'
                                                                        ? 'outline'
                                                                        : 'destructive'
                                                            }
                                                        >
                                                            {txn.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                {mockTransactions.length > 3 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowAllTransactions(!showAllTransactions)}
                                    >
                                        {showAllTransactions ? (
                                            <>
                                                Show Less <ChevronUp className="ml-1 w-4 h-4" />
                                            </>
                                        ) : (
                                            <>
                                                Show More <ChevronDown className="ml-1 w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                )}
                                <Link
                                    to="/dashboard/wallet/transactions"
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    View all transactions
                                </Link>
                            </CardFooter>
                        </Card>

                        {/* Additional Features (Optional) */}
                        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Methods</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">No payment methods added yet.</p>
                                </CardContent>
                                <CardFooter>
                                    <Link
                                        to="/dashboard/wallet"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        Add new payment method
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <Button variant="outline" onClick={() => navigate({ to: '/dashboard/donate' })}>
                                        Start a Donation Campaign
                                    </Button>
                                    <Button variant="outline" onClick={() => navigate({ to: '/dashboard/wallet/transactions' })}>
                                        Generate Financial Report
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
};

export default Wallet;