// src/pages/dashboard/components/ReferralStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface ReferralStatsProps {
  total: number;
  earnings: number;
}

export default function ReferralStats({ total, earnings }: ReferralStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Referrals</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">Total Referrals</p>
        <p className="text-sm mt-1">Referrals: {earnings.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}