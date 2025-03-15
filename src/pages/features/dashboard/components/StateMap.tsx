import MapChart from '@/components/maps/mapChart';

interface StateMapProps {
  state: string;
  dist: string; 
  totalMembers: number;
}

export default function StateMap({ state, dist, totalMembers }: StateMapProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{state}</h3>
      <p className="text-sm text-muted-foreground">
        Total Members: {totalMembers.toLocaleString()}
      </p>
      <div className="flex-1 min-h-0">
        <MapChart state={state} dist={dist} />
      </div>
    </div>
  );
}