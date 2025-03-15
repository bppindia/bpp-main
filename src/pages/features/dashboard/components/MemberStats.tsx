// src/pages/dashboard/components/MemberStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface MemberStatsProps {
    totalIndia: number;
    totalState: number;
    state: string;
}

export default function MemberStats({ totalIndia, totalState, state }: MemberStatsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalState.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">in {state}</p>
                <p className="text-sm mt-1">Total India: {totalIndia.toLocaleString()}</p>
            </CardContent>
        </Card>
    );
}