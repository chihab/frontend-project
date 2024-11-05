import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import type { DateRange as DateRangeDayPicker } from "react-day-picker";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface DateRange {
  from: string;
  to: string;
}

interface CalendarDateRangePickerProps {
  noDateText?: string;
  dateRange?: DateRange;
  onChange(date: DateRange | undefined): void;
}

const CalendarDateRangePicker = ({
  dateRange,
  onChange,
  noDateText = "No date selected",
}: CalendarDateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<
    DateRangeDayPicker | undefined
  >(() =>
    dateRange
      ? {
          from: new Date(dateRange.from),
          to: new Date(dateRange.to),
        }
      : undefined,
  );
  const [previousDate, setPreviousDate] = useState<
    DateRangeDayPicker | undefined
  >(selectedDate);

  const handleChange = () => {
    setPreviousDate(selectedDate);
    onChange(
      selectedDate
        ? {
            from: selectedDate.from!.toISOString(),
            to: selectedDate.to!.toISOString(),
          }
        : undefined,
    );
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedDate(previousDate);
    } else {
      setPreviousDate(selectedDate);
    }
    setOpen(open);
  };

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
            )}
            onClick={() => setOpen(!open)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, "LLL dd, y")} -{" "}
                  {format(selectedDate.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDate.from, "LLL dd, y")
              )
            ) : (
              <span>{noDateText} </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Card className="w-fit">
            <CardContent className="p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={selectedDate?.from}
                selected={selectedDate}
                onSelect={setSelectedDate}
                numberOfMonths={2}
              />
            </CardContent>
            <CardFooter className="flex gap-x-2 p-2 border-t">
              <div className="flex-1 text-sm text-muted-foreground px-2">
                {selectedDate && selectedDate?.to === undefined && (
                  <span className="hidden md:block">
                    Select a date range or clear
                  </span>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Clear
                </Button>
                <Button
                  disabled={selectedDate && selectedDate?.to === undefined}
                  onClick={handleChange}
                >
                  Apply
                </Button>
              </div>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarDateRangePicker;
