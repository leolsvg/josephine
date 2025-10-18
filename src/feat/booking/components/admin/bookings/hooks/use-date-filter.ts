import { TIMEZONE } from "@/lib/utils/date";
import { useColumnFilters } from "./use-column-filters";

export function useDateFilter() {
  const { columnFilters, setColumnFilters } = useColumnFilters();

  const todayTemporal = Temporal.Now.zonedDateTimeISO(TIMEZONE).toPlainDate();
  const tomorrowTemporal = todayTemporal.add({ days: 1 });

  const date = columnFilters.find((f) => f.id === "date")?.value as
    | string
    | undefined;

  const isToday = date === todayTemporal.toString();
  const isTomorrow = date === tomorrowTemporal.toString();

  function setDate(newDate: string | null) {
    setColumnFilters((p) => [
      ...p.filter((f) => f.id !== "date"),
      ...(newDate ? [{ id: "date", value: newDate }] : []),
    ]);
  }

  function today() {
    setDate(todayTemporal.toString());
  }

  function tomorrow() {
    setDate(tomorrowTemporal.toString());
  }

  function prevDay() {
    if (date) {
      const prev = Temporal.PlainDate.from(date).subtract({ days: 1 });
      setDate(prev.toString());
    }
  }

  function nextDay() {
    if (date) {
      const next = Temporal.PlainDate.from(date).add({ days: 1 });
      setDate(next.toString());
    }
  }

  return {
    date,
    isToday,
    isTomorrow,
    today,
    tomorrow,
    prevDay,
    nextDay,
    setDate,
  };
}
