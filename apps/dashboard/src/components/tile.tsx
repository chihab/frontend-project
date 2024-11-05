import { Skeleton } from "@/components/ui/skeleton";
import NoData from "./no-data";

export interface TileConfig {
  description: string;
  color: string;
}

export type TileProps = TileConfig & {
  loading: boolean;
  data: number;
};

const Tile: React.FC<TileProps> = ({ loading, data, description, color }) => {
  const formattedNumber = new Intl.NumberFormat("en-US").format(data);

  if (loading) {
    return (
      <div style={{ color }}>
        <Skeleton className="w-3/4 h-[20px] rounded-md mb-2" />
        <Skeleton className="w-full h-[30px] rounded-md" />
      </div>
    );
  }

  if (!data) {
    return <NoData />;
  }
  return (
    <div style={{ color }}>
      <div className="text-2xl font-bold">{formattedNumber}</div>
      <div className="text-xs text-muted-foreground truncate">
        {description}
      </div>
    </div>
  );
};

export default Tile;
