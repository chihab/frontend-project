import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NoData from "./no-data";
import { Skeleton } from "./ui/skeleton";

export interface ChartData {
  name: string;
  value: number;
}

export interface ChartConfig {
  chartType: "line" | "bar";
  yAxisName: string;
  color: string;
  lineStyle?: "solid" | "dashed" | "dotted";
  barStyle?: "group" | "stack";
}

export type ChartProps = ChartConfig & {
  height?: number;
  loading: boolean;
  data: ChartData[];
};

const Chart: React.FC<ChartProps> = ({
  height,
  loading,
  data,
  chartType,
  yAxisName,
  color,
  lineStyle,
}) => {
  if (loading) {
    return (
      <div className="h-full w-full flex flex-col mt-4">
        <Skeleton className="h-6 w-2/3 mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-full mb-4 rounded" />
        <Skeleton className="h-6 w-1/2 mb-4 rounded" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <NoData />;
  }

  if (chartType === "bar") {
    return (
      <ResponsiveContainer height={height}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke={color} fontSize={14} tickLine={false} />
          <Tooltip />
          <YAxis
            label={
              <Text
                x={0}
                y={0}
                dx={10}
                dy={height ? height / 2 : 230}
                offset={0}
                angle={-90}
                fontSize={14}
                fill={color}
              >
                {yAxisName}
              </Text>
            }
            stroke={color}
            fontSize={14}
            tickLine={false}
          />
          <Bar dataKey="value" stroke={color} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer height={height}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis
          label={
            <Text
              x={0}
              y={0}
              dx={20}
              dy={height ? height / 2 : 230}
              offset={0}
              angle={-90}
              fill={color}
            >
              {yAxisName}
            </Text>
          }
        />
        <Tooltip />
        <Line
          dataKey="value"
          stroke={color}
          strokeDasharray={
            lineStyle === "dashed"
              ? "5 5"
              : lineStyle === "dotted"
              ? "1 1"
              : "0"
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
