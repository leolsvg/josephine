"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fr } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TIMEZONE } from "@/lib/utils";
import { useBookingsDate } from "./realtime/use-booking-date";

export function Sidebar() {
  const {
    date,
    nextDay,
    prevDay,
    all,
    today,
    tomorrow,
    isToday,
    isTomorrow,
    setDate,
  } = useBookingsDate();
  const [month, setMonth] = useState<Date>();
  useEffect(() => {
    if (date)
      setMonth(
        new Date(
          Temporal.PlainDate.from(date).toZonedDateTime(TIMEZONE)
            .epochMilliseconds,
        ),
      );
  }, [date]);
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
          variant={!date ? "default" : "outline"}
          onClick={all}
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
          locale={fr}
          timeZone={TIMEZONE}
          month={month}
          onMonthChange={setMonth}
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
          className="md:[--cell-size:--spacing(12)]"
        />
      </div>
    </div>
  );
}
