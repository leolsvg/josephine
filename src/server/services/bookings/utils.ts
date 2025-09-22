import { startOfDay, TIMEZONE, toZdt } from "@/lib/utils";
import type { Exception, HM, Period, Weekly } from "@/server/db/types";

/**
 * Checks whether a given Date is in the past **based only on the calendar date**, ignoring the time.
 *
 * Converts the input `Date` to a Temporal.PlainDate in the specified timezone
 * and compares it with today's date in the same timezone.
 *
 * @param date - The JavaScript Date to check.
 * @param timeZone - Optional IANA timezone string (default: "Europe/Paris").
 * @returns `true` if the calendar date of `date` is strictly before today in the given timezone; otherwise `false`.
 */
export function isPast(date: Date, timeZone = TIMEZONE): boolean {
  const plainDate = Temporal.Instant.fromEpochMilliseconds(date.getTime())
    .toZonedDateTimeISO(timeZone)
    .toPlainDate();
  const today = Temporal.Now.plainDateISO(timeZone);
  return Temporal.PlainDate.compare(plainDate, today) < 0;
}

/** Date-only check: true if the calendar date has at least one opening period (and isn't in the past). */
export function isDateOpen(
  date: Date,
  weekly: Weekly,
  exceptions: Exception[],
) {
  if (isPast(date)) return false;
  return getPeriodsForDate(date, weekly, exceptions).length > 0;
}

/** Date+time check: true if the specific instant falls inside any opening period for that day. */
export function isOpen(
  dateTime: Date,
  weekly: Weekly,
  exceptions: Exception[],
) {
  const nowZdt = toZdt(new Date());
  const dtZdt = toZdt(dateTime);

  if (dtZdt.epochMilliseconds < nowZdt.epochMilliseconds) return false;

  const periods = getPeriodsForDate(dateTime, weekly, exceptions);
  if (periods.length === 0) return false;

  return intervalsFromPeriods(dateTime, periods).some(
    ({ start, end }) =>
      dtZdt.epochMilliseconds >= start.epochMilliseconds &&
      dtZdt.epochMilliseconds < end.epochMilliseconds,
  );
}

/** HH:mm or HH:mm:ss -> Temporal.ZonedDateTime at that time in TIMEZONE */
export const atHM = (date: Date, hm: HM) => {
  const [h, m, s = 0] = hm.split(":").map(Number);
  const zdt = toZdt(date);
  return zdt.with({ hour: h, minute: m, second: s, millisecond: 0 });
};

/** Build [start,end) Temporal intervals for a given calendar date. Supports cross-midnight. */
const intervalsFromPeriods = (date: Date, periods: Period[]) =>
  periods.map(({ start, end }) => {
    const s = atHM(date, start);
    const eSame = atHM(date, end);
    const e =
      eSame.epochMilliseconds <= s.epochMilliseconds
        ? eSame.add({ days: 1 })
        : eSame;
    return { start: s, end: e };
  });

/** Pick the last exception (by array order) that contains the date. */
const findExceptionForDate = (exceptions: Exception[], date: Date) =>
  exceptions.findLast((e) => {
    const from = startOfDay(e.from);
    const to = startOfDay(e.to ?? e.from);
    const endExclusive = to.add({ days: 1 });
    const d = startOfDay(date);
    return (
      d.epochMilliseconds >= from.epochMilliseconds &&
      d.epochMilliseconds < endExclusive.epochMilliseconds
    );
  });

/** Weekly periods for a given date using array index: 0=Sun..6=Sat. */
const weeklyPeriodsForDate = (weekly: Weekly, date: Date): Period[] =>
  weekly[toZdt(date).dayOfWeek % 7]?.periods ?? [];

/** Merge: exception override if present; otherwise weekly. */
export function getPeriodsForDate(
  date: Date,
  weekly: Weekly,
  exceptions: Exception[],
): Period[] {
  const exception = findExceptionForDate(exceptions, date);
  if (exception) return exception.periods;
  return weeklyPeriodsForDate(weekly, date);
}

/** Round Temporal.ZonedDateTime up to the next multiple of `minutes`. */
const ceilToInterval = (dt: Temporal.ZonedDateTime, minutes: number) => {
  const ms = minutes * 60_000;
  const rounded = Math.ceil(dt.epochMilliseconds / ms) * ms;
  return Temporal.Instant.fromEpochMilliseconds(rounded).toZonedDateTimeISO(
    TIMEZONE,
  );
};

/**
 * Generate slots for a given `date` based on opening hours.
 * - Skips passed slots (relative to `now`, default = current time)
 * - Returns array (periods) of string array (time hh:mm)
 */
export function generateSlots(
  date: Date,
  weekly: Weekly,
  exceptions: Exception[],
  { slotMinutes, now } = { slotMinutes: 15, now: new Date() },
): string[][] {
  const nowZdt = toZdt(now);

  if (
    startOfDay(date).epochMilliseconds < startOfDay(now).epochMilliseconds &&
    date.toDateString() !== now.toDateString()
  ) {
    return [];
  }

  const periods = getPeriodsForDate(date, weekly, exceptions);
  if (!periods.length) return [];

  const slots: string[][] = [];

  for (const { start, end } of intervalsFromPeriods(date, periods)) {
    let cursor =
      nowZdt.epochMilliseconds >= start.epochMilliseconds &&
      nowZdt.epochMilliseconds < end.epochMilliseconds
        ? ceilToInterval(nowZdt, slotMinutes)
        : start;

    const group: string[] = [];

    while (true) {
      const next = cursor.add({ minutes: slotMinutes });
      if (next.epochMilliseconds > end.epochMilliseconds) break;
      if (cursor.epochMilliseconds >= nowZdt.epochMilliseconds) {
        group.push(cursor.toPlainTime().toString({ smallestUnit: "minute" }));
      }
      cursor = next;
    }

    if (group.length) {
      slots.push(group);
    }
  }

  return slots;
}
