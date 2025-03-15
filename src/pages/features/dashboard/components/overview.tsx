import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Transaction {
  id: number;
  amount: number;
  date: string;
  type: string;
}

interface OverviewProps {
  contributions: Transaction[];
}

export default function Overview({ contributions }: OverviewProps) {
  const data = contributions.map((t) => ({
    name: new Date(t.date).toLocaleDateString('en-US', { month: 'short' }),
    total: t.type === 'Credit' ? t.amount : -t.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}