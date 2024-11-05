import { fetchFREDSeriesData } from "@/api/fred-api";
import Chart, { type ChartData } from "@/components/chart";
import Error from "@/components/error";
import Tile from "@/components/tile";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDashboardStore } from "../store/dashboard-store";
import { WidgetConfig } from "../store/widget-config";
import Widget from "./widget";

interface DashboardWidgetProps {
  widget: WidgetConfig;
  actions?: boolean;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  widget,
  actions = false,
}) => {
  const dateRange = useDashboardStore((state) => state.dateRange);
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "fredData",
      widget!.dataSource!.id,
      widget.type,
      widget.frequency,
      dateRange,
    ],
    queryFn: async () => {
      const res = await fetchFREDSeriesData(
        widget.dataSource!.id,
        widget.frequency,
        dateRange,
      );
      switch (widget.type) {
        case "tile": {
          const total = Math.ceil(res.reduce((acc, d) => acc + d.value, 0));
          return total;
        }
        case "chart":
          return res.map((d) => ({
            name: d.date,
            value: d.value,
          }));
      }
    },
    enabled: !!widget.dataSource?.id,
  });

  const renderedWidget = useMemo(() => {
    if (error) return <Error error={error?.message} />;
    switch (widget.type) {
      case "tile":
        return (
          <Tile loading={isLoading} data={data as number} {...widget.config} />
        );
      case "chart":
        return (
          <Chart
            height={460}
            loading={isLoading}
            data={data as ChartData[]}
            {...widget.config}
          />
        );
    }
  }, [data, error, isLoading, widget]);

  return (
    <Widget actions={actions} widget={widget}>
      {renderedWidget}
    </Widget>
  );
};

export default DashboardWidget;
