// src/pages/dashboard/components/CasesStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface CasesStatsProps {
    total: number;
    pending: number;
}

export default function CasesStats({ total, pending }: CasesStatsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cases</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{total}</div>
                <p className="text-xs text-muted-foreground">Total Cases</p>
                <p className="text-sm mt-1">Pending: {pending}</p>
            </CardContent>
        </Card>
    );
}