// opening-utils.ts

import {
  addDays,
  addMinutes,
  formatISO,
  isBefore,
  isPast,
  isWithinInterval,
  set,
  startOfDay,
} from "date-fns";
import type { HM, Period } from "@/server/db/types";

export type Weekly = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  start: HM;
  end: HM;
};

export type Exception = {
  from: Date;
  to: Date | null;
  periods: Period[]; // empty = closed
  note: string | null;
};

export function isDateOpen(
  date: Date,
  weekly: Weekly[],
  exceptions: Exception[],
) {
  if (isBefore(startOfDay(date), startOfDay(new Date()))) return false; // isPast use now instead of startOfDay
  return getPeriodsForDate(date, weekly, exceptions).length > 0;
}

export function isOpen(date: Date, weekly: Weekly[], exceptions: Exception[]) {
  // Past times should be considered closed
  if (isPast(date)) return false;

  const periods = getPeriodsForDate(date, weekly, exceptions);
  if (periods.length === 0) return false;

  return intervalsFromPeriods(date, periods).some(
    ({ start, end }) => date >= start && date < end,
  );
}

export const atHM = (date: Date, hm: HM) => {
  const [h, m, s = 0] = hm.split(":").map(Number);
  return set(date, { hours: h, minutes: m, seconds: s, milliseconds: 0 });
};

const intervalsFromPeriods = (date: Date, periods: Period[]) =>
  periods.map(({ start, end }) => {
    const s = atHM(date, start);
    const eSame = atHM(date, end);
    const e = eSame <= s ? addDays(eSame, 1) : eSame; // cross-midnight
    return { start: s, end: e };
  });

const findExceptionForDate = (exceptions: Exception[], date: Date) =>
  exceptions.findLast((e) => {
    const from = startOfDay(e.from);
    const to = startOfDay(e.to ?? e.from); // null => same day
    const endInclusive = addDays(to, 1); // [from, to+1) for inclusive dates
    return isWithinInterval(date, { start: from, end: endInclusive });
  });

const weeklyPeriodsForDate = (weekly: Weekly[], date: Date): Period[] =>
  weekly
    .filter((w) => w.day === date.getDay())
    .sort((a, b) => String(a.start).localeCompare(String(b.start)))
    .map(({ start, end }) => ({ start, end }));

export function getPeriodsForDate(
  date: Date,
  weekly: Weekly[],
  exceptions: Exception[],
): Period[] {
  const exception = findExceptionForDate(exceptions, date);
  if (exception) return exception.periods; // [] = closed, non-empty = whitelist
  return weeklyPeriodsForDate(weekly, date);
}

/** Round `dt` up to the next multiple of `minutes`. */
const ceilToInterval = (dt: Date, minutes: number) => {
  const ms = minutes * 60_000;
  const t = dt.getTime();
  const rounded = Math.ceil(t / ms) * ms;
  return new Date(rounded);
};

/**
 * Generate slots for a given `date` based on opening hours.
 * - Skips passed slots (relative to `now`, default = current time)
 * - Returns flat array of [startISO, endISO]
 */
export function generateSlots(
  date: Date,
  weekly: Weekly[],
  exceptions: Exception[],
  { slotMinutes = 15, now = new Date() }: { slotMinutes: number; now?: Date },
): string[][] {
  // skip if date is strictly before today (not equal)
  if (
    startOfDay(date).getTime() < startOfDay(now).getTime() &&
    date.toDateString() !== now.toDateString()
  ) {
    return [];
  }

  const periods = getPeriodsForDate(date, weekly, exceptions);
  if (!periods.length) return [];

  const slots: string[][] = [];

  for (const { start, end } of intervalsFromPeriods(date, periods)) {
    let cursor =
      now >= start && now < end ? ceilToInterval(now, slotMinutes) : start;

    while (true) {
      const next = addMinutes(cursor, slotMinutes);
      if (next > end) break; // half-open [start,end)
      if (cursor >= now) {
        slots.push([formatISO(cursor), formatISO(next)]);
      }
      cursor = next;
    }
  }

  return slots;
}
