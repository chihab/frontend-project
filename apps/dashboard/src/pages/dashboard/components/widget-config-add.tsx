import { Button } from "@/components/ui/button";
import { useWidgetStore } from "../store/widget-store";
import { Plus } from "lucide-react";

const WidgetConfigAdd: React.FC = () => {
  const add = useWidgetStore((state) => state.add);
  return (
    <Button
      onClick={() => add()}
      className="flex items-center sm:flex-row sm:items-center"
    >
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline ml-2">Add Widget</span>
    </Button>
  );
};

export default WidgetConfigAdd;
