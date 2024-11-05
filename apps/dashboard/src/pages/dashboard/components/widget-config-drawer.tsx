import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CopyIcon } from "@radix-ui/react-icons";
import { BarChart3, LineChart, PieChart } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useDashboardStore } from "../store/dashboard-store";
import {
  ChartWidgetConfig,
  TileWidgetConfig,
  WidgetConfig,
} from "../store/widget-config";
import { INITIAL_DATA, useWidgetStore } from "../store/widget-store";
import WidgetSeries from "./widget-series";

type WidgetForm = Omit<TileWidgetConfig, "type"> &
  Omit<ChartWidgetConfig, "type"> & { type: "chart" | "tile" };

const FormFieldError: React.FC<{ error?: string }> = ({ error }) =>
  error ? <div className="text-red-800 text-sm">{error}</div> : null;

const toWidgetConfig = (widgetForm: WidgetForm): WidgetConfig => {
  let normalizedWidget: WidgetConfig;
  switch (widgetForm.type) {
    case "chart":
      normalizedWidget = {
        ...widgetForm,
        config: {
          chartType: widgetForm.config.chartType,
          yAxisName: widgetForm.config.yAxisName,
          color: widgetForm.config.color,
          lineStyle: widgetForm.config.lineStyle,
          barStyle: widgetForm.config.barStyle,
        },
      } as ChartWidgetConfig;
      break;
    case "tile":
      normalizedWidget = {
        ...widgetForm,
        config: {
          color: widgetForm.config.color || "#000000",
          description: widgetForm.config.description || "",
        },
      } as TileWidgetConfig;
      break;
    default:
      throw new Error("Invalid widget type");
  }
  return normalizedWidget;
};

const WidgetConfigDrawer: React.FC = () => {
  const widget = useWidgetStore((state) => state.data);
  const clear = useWidgetStore((state) => state.clear);
  const { addChart, updateChart } = useDashboardStore();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<WidgetForm>({
    values: widget
      ? {
          ...widget,
          config: {
            chartType: "line",
            yAxisName: "",
            description: "",
            ...widget.config,
          },
        }
      : (INITIAL_DATA as WidgetForm),
  });

  const widgetType = watch("type");
  const chartType = watch("config.chartType");
  const dataSource = watch("dataSource");

  const onSubmit = (widgetForm: WidgetForm) => {
    const widgetConfig = toWidgetConfig(widgetForm);
    if (widgetForm.id === "new") {
      addChart(widgetConfig);
    } else {
      updateChart(widgetConfig);
    }
    clear();
  };

  return (
    <Drawer direction="right" open={!!widget} onClose={clear}>
      <DrawerContent className="top-0 right-0 left-auto mt-0 w-full md:w-[740px] rounded-none">
        <form name="form" onSubmit={handleSubmit(onSubmit)}>
          {widget && (
            <div className="mx-auto w-full p-5 overflow-y-scroll overflow-x-hidden h-screen">
              <DrawerHeader>
                <DrawerTitle>
                  {widget.id === "new" ? "Add Widget" : "Edit Widget"}
                </DrawerTitle>
                <DrawerDescription>
                  Configure a new widget here.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Controller
                      name="dataSource"
                      control={control}
                      rules={{
                        required: "Data source is required",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Label htmlFor="dataSource">Data Series</Label>
                          <WidgetSeries
                            onValueChange={field.onChange}
                            value={field.value}
                          />
                          <FormFieldError error={error?.message} />
                        </>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Title is required" }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="title">Title</Label>
                            {dataSource && (
                              <CopyIcon
                                className="cursor-pointer hover:text-primary-500"
                                onClick={() => field.onChange(dataSource.title)}
                              />
                            )}
                          </div>
                          <Input {...field} placeholder="Title" />
                          <FormFieldError error={error?.message} />
                        </>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="frequency"
                      control={control}
                      rules={{
                        required: "Frequency is required",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Time Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="d">Daily</SelectItem>
                              <SelectItem value="w">Weekly</SelectItem>
                              <SelectItem value="m">Monthly</SelectItem>
                              <SelectItem value="q">Quarterly</SelectItem>
                              <SelectItem value="a">Annual</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormFieldError error={error?.message} />
                        </>
                      )}
                    />
                  </div>
                  <Separator />
                  <div className="flex gap-x-4">
                    <div className="flex-1 space-y-2">
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Widget type is required" }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <Label htmlFor="config.type">Widget Type</Label>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger id="type">
                                <SelectValue placeholder="Widget Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="chart">Chart</SelectItem>
                                <SelectItem value="tile">Tile</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormFieldError error={error?.message} />
                          </>
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Controller
                        name="config.color"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Label htmlFor="type">Color</Label>
                            <Input type="color" {...field} />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <Separator />
                  {widgetType === "chart" && (
                    <>
                      <div className="space-y-2">
                        <Controller
                          name="config.yAxisName"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <Label htmlFor="type">Y Axis</Label>
                              <Input {...field} placeholder="Y Axis Name" />
                              <FormFieldError error={error?.message} />
                            </>
                          )}
                        />
                      </div>

                      <div className="flex gap-x-4">
                        <div className="flex-1 space-y-2">
                          <Controller
                            name="config.chartType"
                            control={control}
                            rules={{ required: "Chart type is required" }}
                            render={({ field }) => (
                              <>
                                <Label htmlFor="type">Chart type</Label>
                                <div className="space-y-2">
                                  <ToggleGroup
                                    type="single"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="justify-start"
                                  >
                                    <ToggleGroupItem
                                      value="line"
                                      aria-label="Line Chart"
                                      className="p-2"
                                    >
                                      <LineChart className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value="bar"
                                      aria-label="Bar Chart"
                                      className="p-2"
                                    >
                                      <BarChart3 className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      disabled
                                      value="pie"
                                      aria-label="Pie Chart"
                                      className="p-2"
                                    >
                                      <PieChart className="h-4 w-4" />
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </div>
                              </>
                            )}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          {chartType === "line" && (
                            <Controller
                              name="config.lineStyle"
                              control={control}
                              render={({ field }) => (
                                <>
                                  <Label htmlFor="config.lineStyle">
                                    Line Style
                                  </Label>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Line" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="solid">
                                        Solid
                                      </SelectItem>
                                      <SelectItem value="dashed">
                                        Dashed
                                      </SelectItem>
                                      <SelectItem value="dotted">
                                        Dotted
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {widgetType === "tile" && (
                    <div className="space-y-2">
                      <Controller
                        name="config.description"
                        control={control}
                        rules={{ required: "Description is required" }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="description">Description</Label>
                              {dataSource && (
                                <CopyIcon
                                  className="cursor-pointer hover:text-primary-500"
                                  onClick={() =>
                                    field.onChange(dataSource.title)
                                  }
                                />
                              )}
                            </div>
                            <Input type="text" {...field} />
                            <FormFieldError error={error?.message} />
                          </>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <DrawerFooter>
                <Button type="submit" disabled={!isDirty}>
                  {widget.id === "new" ? "Add" : "Update"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default WidgetConfigDrawer;
