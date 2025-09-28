import type { DateRange } from "@/server/db/types";

export function isDateInRange(date: Temporal.PlainDate, range: DateRange) {
  const to = range.to ?? range.from;
  return (
    Temporal.PlainDate.compare(date, range.from) >= 0 &&
    Temporal.PlainDate.compare(date, to) <= 0
  );
}
