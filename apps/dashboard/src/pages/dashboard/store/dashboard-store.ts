import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { WidgetConfig } from './widget-config';
import { DateRange } from '@/components/date-range-picker';

interface DashboardState {
  dateRange?: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  addChart: (widget: WidgetConfig) => void;
  widgets: WidgetConfig[];
  removeChart: (id: string) => void;
  updateChartPosition: (
    id: string,
    position: { x: number; y: number; w: number; h: number }
  ) => void;
  updateChart: (widget: WidgetConfig) => void;
  duplicateChart: (id: string) => void;
}

export const useDashboardStore = create(
  devtools(
    persist<DashboardState>(
      (set) => ({
        dateRange: undefined,
        widgets: [],
        setDateRange: (dateRange) =>
          set((state) => ({
            ...state,
            dateRange,
          })),
        addChart: (widget) => {
          set((state) => {
            return {
              ...state,
              widgets: [...state.widgets, { ...widget, id: uuidv4() }],
            };
          });
        },
        removeChart: (id) =>
          set((state) => ({
            ...state,
            widgets: state.widgets.filter((widget) => widget.id !== id),
          })),
        updateChartPosition: (id, position) => {
          set((state) => {
            const widgets = state.widgets.map((widget) =>
              widget.id === id ? { ...widget, position } : widget
            );
            return {
              ...state,
              widgets,
            };
          });
        },
        updateChart: (widget) =>
          set((state) => {
            const widgets = state.widgets.map((_widget) =>
              widget.id === _widget.id ? widget : _widget
            );
            return {
              ...state,
              widgets,
            };
          }),
        duplicateChart: (id) =>
          set((state) => {
            const widget = state.widgets.find((widget) => widget.id === id);
            if (!widget) return state;
            return {
              ...state,
              widgets: [...state.widgets, { ...widget, id: uuidv4() }],
            };
          }),
      }),
      {
        name: 'dashboard-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
