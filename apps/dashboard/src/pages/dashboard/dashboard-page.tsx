import CalendarDateRangePicker from '@/components/date-range-picker';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { MoveIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Dashboard from './components/dashboard';
import WidgetConfigAdd from './components/widget-config-add';
import WidgetConfigDrawer from './components/widget-config-drawer';
import { useDashboardStore } from './store/dashboard-store';

const DashboardPage: React.FC = () => {
  const widgets = useDashboardStore((state) => state.widgets);
  const dateRange = useDashboardStore((state) => state.dateRange);
  const setDateRange = useDashboardStore((state) => state.setDateRange);
  const [draggable, setDraggable] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b">
        <div className="flex h-16 px-4">
          <div className="hidden md:flex items-center space-x-4">
            <h3 className="text-2xl font-bold">Dashboard</h3>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {widgets.length !== 0 && (
              <>
                {draggable && (
                  <div className="hidden md:block text-muted-foreground">
                    Move the widgets
                  </div>
                )}
                <Toggle
                  aria-label="Toggle draggable"
                  onPressedChange={setDraggable}
                  className="ml-4 border border-gray-200"
                >
                  {draggable ? 'Done' : 'Edit'}
                  <MoveIcon className="ml-2" />
                </Toggle>
              </>
            )}
            <CalendarDateRangePicker
              noDateText="Select a date range"
              dateRange={dateRange}
              onChange={setDateRange}
            />
            <WidgetConfigAdd />
          </div>
        </div>
      </div>
      {!dateRange || (dateRange.from && dateRange.to) ? (
        <div
          className={cn('flex-grow', draggable ? 'bg-gray-100' : 'bg-gray-50')}
        >
          <Dashboard draggable={draggable} />
        </div>
      ) : (
        <div className="space-y-4 p-6">
          <div className="text-center text-muted-foreground">
            Select a date range to view widgets.
          </div>
        </div>
      )}
      <WidgetConfigDrawer />
    </div>
  );
};

export default DashboardPage;
