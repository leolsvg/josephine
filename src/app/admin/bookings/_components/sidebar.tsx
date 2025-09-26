"use client";

import {
  Calendar1,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Suspense } from "react";
import { fr } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TIMEZONE } from "@/lib/utils";
import { useColumnFilters } from "./data-table/hooks/use-column-filters";
import { useDateFilter } from "./data-table/hooks/use-date-filter";
import { useTimeFilter } from "./data-table/hooks/use-time-filter";
import { StatusPieChart } from "./status-pie-chart";

export function Sidebar() {
  const { reset } = useColumnFilters();
  const { dinner, lunch, meal, allMeals } = useTimeFilter();
  const {
    date,
    nextDay,
    prevDay,
    allDays,
    today,
    tomorrow,
    isToday,
    isTomorrow,
    setDate,
  } = useDateFilter();
  return (
    <div className="flex flex-col gap-2 md:w-100 w-full">
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
          variant={!date ? "default" : "outline"}
          onClick={allDays}
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
      <div className="grid grid-cols-3 gap-2">
        <Button
          type="button"
          variant={meal === "lunch" ? "default" : "outline"}
          onClick={lunch}
        >
          <Sun />
          <span>Midi</span>
        </Button>
        <Button
          type="button"
          variant={meal === "dinner" ? "default" : "outline"}
          onClick={dinner}
        >
          <Moon />
          <span>Soir</span>
        </Button>
        <Button
          type="button"
          variant={!meal ? "default" : "outline"}
          onClick={allMeals}
        >
          <Calendar1 />
          Jour
        </Button>
      </div>
      <Button type="button" onClick={reset} variant="ghost">
        <X />
        <span>Reset</span>
      </Button>
      <div className="flex justify-center">
        <Calendar
          locale={fr}
          timeZone={TIMEZONE}
          month={
            date
              ? new Date(
                  Temporal.PlainDate.from(date).toZonedDateTime(TIMEZONE)
                    .epochMilliseconds,
                )
              : undefined
          }
          mode="single"
          showOutsideDays={false}
          selected={
            date
              ? new Date(
                  Temporal.PlainDate.from(date).toZonedDateTime(TIMEZONE)
                    .epochMilliseconds,
                )
              : undefined
          }
          onSelect={(date) =>
            setDate(
              date
                ? Temporal.Instant.fromEpochMilliseconds(date.getTime())
                    .toZonedDateTimeISO(TIMEZONE)
                    .toPlainDate()
                    .toString()
                : null,
            )
          }
          className="[--cell-size:--spacing(12)]"
        />
      </div>

      <Suspense>
        <StatusPieChart />
      </Suspense>
    </div>
  );
}
