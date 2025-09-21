"use client";

import { ChevronDownIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangePicker(
  props: React.ComponentProps<typeof Calendar> & {
    selected: DateRange | undefined;
  },
) {
  const startMonth = new Date();
  const endMonth = startMonth;
  endMonth.setFullYear(startMonth.getFullYear() + 1);
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="dates" className="px-1">
        Select your stay
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-56 justify-between font-normal"
          >
            {props.selected?.from && props.selected?.to
              ? `${props.selected.from.toLocaleDateString()} - ${props.selected.to.toLocaleDateString()}`
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            captionLayout="dropdown"
            startMonth={startMonth}
            endMonth={endMonth}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
