"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MetricCard } from "./metrics-card";
import { useBookingsDate } from "./realtime/use-booking-date";

export function Sidebar() {
  const {
    date,
    nextDay,
    prevDay,
    reset,
    today,
    tomorrow,
    isToday,
    isTomorrow,
    setDate,
  } = useBookingsDate();

  return (
    <div className="flex flex-col gap-2 w-100">
      <div className="grid grid-cols-3 gap-2">
        <Button
          type="button"
          variant={isToday ? "default" : "outline"}
          onClick={today}
        >
          Aujourd'hui
        </Button>
        <Button
          type="button"
          variant={isTomorrow ? "default" : "outline"}
          onClick={tomorrow}
        >
          Demain
        </Button>
        <Button
          type="button"
          variant={date === null ? "default" : "outline"}
          onClick={reset}
        >
          Afficher tout
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={prevDay}
          disabled={!date}
          className="justify-between"
        >
          <ChevronLeft />
          <span>Jour précédent</span>
          <div />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={nextDay}
          disabled={!date}
          className="justify-between"
        >
          <div />
          <span>Jour suivant</span>
          <ChevronRight />
        </Button>
      </div>
      <div className="flex justify-center">
        <Calendar
          fixedWeeks
          mode="single"
          selected={date ?? undefined}
          onSelect={(date) => setDate(date ?? null)}
          className="md:[--cell-size:--spacing(12)]"
        />
      </div>
    </div>
  );
}
