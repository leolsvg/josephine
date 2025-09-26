import { useEffect, useState } from "react";
import { fr } from "react-day-picker/locale";
import { Calendar as UICalendar } from "@/components/ui/calendar";
import { TIMEZONE } from "@/lib/utils";
import { useDateFilter } from "../data-table/hooks/use-date-filter";

export function Calendar() {
  const { date, setDate } = useDateFilter();
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
    <UICalendar
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
      className="[--cell-size:--spacing(12)]"
    />
  );
}
