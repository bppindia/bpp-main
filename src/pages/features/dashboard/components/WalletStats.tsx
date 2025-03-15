// src/pages/dashboard/components/WalletStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

interface WalletStatsProps {
  balance: number;
  totalContributions: number;
}

export default function WalletStats({ balance, totalContributions }: WalletStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Balance</p>
        <p className="text-sm mt-1">Contributions: ₹{totalContributions.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}