import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useDashboardStore } from "../store/dashboard-store";
import { WidgetConfig } from "../store/widget-config";
import { useWidgetStore } from "../store/widget-store";
import DashboardWidget from "./dashboard-widget";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface DashboardProps {
  draggable?: boolean;
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  draggable = true,
}: DashboardProps) => {
  const widgets = useDashboardStore((state) => state.widgets);
  const add = useWidgetStore((state) => state.add);
  const updateChartPosition = useDashboardStore(
    (state) => state.updateChartPosition,
  );
  const onLayoutChange = (layout: LayoutItem[]) => {
    if (!draggable) return;
    layout.forEach((item) => {
      updateChartPosition(item.i, {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      });
    });
  };

  return (
    <>
      {widgets.length === 0 && (
        <div className="space-y-4 p-6">
          <div className="col-span-full text-center text-muted-foreground">
            <span>No widgets found.</span>
            <p>
              <a href="#" className="underline" onClick={() => add()}>
                Create a widget
              </a>
            </p>
          </div>
        </div>
      )}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: widgets.map(widgetToLayoutItem) }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
        onLayoutChange={onLayoutChange}
        rowHeight={130}
        isDraggable={draggable}
        isResizable={false}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <DashboardWidget widget={widget} actions={!draggable} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
};

const widgetToLayoutItem = (widget: WidgetConfig) => ({
  i: widget.id!,
  x: widget.position?.x || 0,
  y: widget.position?.y || 0,
  w: widget.type === "tile" ? 1 : 2,
  h: widget.type === "tile" ? 1 : 4,
});

export default Dashboard;
