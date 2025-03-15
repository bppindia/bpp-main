// src/pages/dashboard/components/ProfessionalsStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

interface ProfessionalsStatsProps {
  total: number;
  state: string;
}

export default function ProfessionalsStats({ total, state }: ProfessionalsStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Professionals</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">in {state}</p>
      </CardContent>
    </Card>
  );
}