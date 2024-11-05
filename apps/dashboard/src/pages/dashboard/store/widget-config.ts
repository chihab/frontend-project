import { ChartConfig } from "@/components/chart";
import { TileConfig } from "@/components/tile";

interface BaseWidgetConfig {
  id?: string;
  title: string;
  dataSource?: {
    id: string;
    title: string;
    description: string;
  };
  frequency: "d" | "w" | "m" | "q" | "a";
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface ChartWidgetConfig extends BaseWidgetConfig {
  type: "chart";
  config: ChartConfig;
}

export interface TileWidgetConfig extends BaseWidgetConfig {
  type: "tile";
  config: TileConfig;
}

export type WidgetConfig = ChartWidgetConfig | TileWidgetConfig;
