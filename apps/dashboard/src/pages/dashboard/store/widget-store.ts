import { create } from "zustand";
import { WidgetConfig } from "./widget-config";

export interface WidgetState {
  data: WidgetConfig | null;
  add: () => void;
  edit: (data: WidgetConfig) => void;
  clear: () => void;
}

export const INITIAL_DATA: WidgetConfig = {
  id: "new",
  type: "tile",
  title: "",
  frequency: "a",
  config: {
    description: "",
    color: "#000000",
  },
  dataSource: undefined,
};

export const useWidgetStore = create<WidgetState>((set) => ({
  data: null,
  add: () =>
    set({
      data: INITIAL_DATA,
    }),
  edit: (data) => {
    set(() => ({
      data,
    }));
  },
  clear: () => set({ data: null }),
}));
