import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CopyIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { useDashboardStore } from "../store/dashboard-store";
import { WidgetConfig } from "../store/widget-config";
import { useWidgetStore } from "../store/widget-store";

const Widget = ({
  widget,
  children,
  actions,
}: {
  widget: WidgetConfig;
  children: ReactNode;
  actions: boolean;
}) => {
  const removeChart = useDashboardStore((state) => state.removeChart);
  const duplicateChart = useDashboardStore((state) => state.duplicateChart);
  const edit = useWidgetStore((state) => state.edit);
  return (
    <Card
      className={cn(
        actions ? "group relative" : "cursor-move hover:shadow-lg",
        widget.type === "tile" ? "h-[130px]" : "h-[550px]",
      )}
    >
      <CardHeader className="flex flex-row space-y-1 pb-2">
        <CardTitle
          style={{ color: widget.config.color }}
          className="text-sm font-medium overflow-hidden truncate"
        >
          {widget.title}
        </CardTitle>
        {actions && (
          <div className="absolute top-2 right-2 flex space-x-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Pencil1Icon onClick={() => edit(widget)} />
            <CopyIcon onClick={() => duplicateChart(widget.id!)} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <TrashIcon />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => removeChart(widget.id!)}>
                    Yes, delete widget
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Widget;
