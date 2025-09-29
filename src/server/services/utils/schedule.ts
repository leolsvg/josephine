import { TIMEZONE } from "@/lib/utils";
import type { Exception, TimeRange, Weekly } from "@/server/db/types";
import { isDateInRange } from "./date";

/**
 * Get the effective opening periods for a given date.
 * Combines weekly schedule and exceptions.
 *
 * @param date - The target date
 * @param weekly - Weekly schedule (array of periods per weekday)
 * @param exceptions - Array of exceptions (closures or custom periods)
 * @returns Array of periods with `start` and `end` as HM strings
 */
export function effectiveScheduleForDate(
  date: Temporal.PlainDate,
  weekly: Weekly,
  exceptions: Exception[],
): TimeRange[] {
  const matching = exceptions.filter((ex) => isDateInRange(date, ex));
  if (matching.length > 0) {
    const exception = matching[matching.length - 1]; // last one wins
    return exception.periods; // empty = closed
  }

  const dayIndex = date.dayOfWeek % 7; // Temporal: Sunday=7, we want 0..6
  return weekly[dayIndex] ?? [];
}

export function timesForTimeRange(
  timeRange: TimeRange,
  duration: Temporal.DurationLike = {
    minutes: 15,
  },
) {
  const slots: Temporal.PlainTime[] = [];
  let current = timeRange.start;
  while (Temporal.PlainTime.compare(timeRange.end, current) === 1) {
    slots.push(current);
    current = current.add(duration);
  }
  return slots;
}

function isPast(time: Temporal.PlainDate) {
  const now = Temporal.Now.plainDateISO(TIMEZONE);
  return Temporal.PlainDate.compare(time, now) < 0;
}

/**
 * Generate time slots for given periods.
 *
 * @param timeRanges - Precomputed periods from generateEffectiveSchedule
 * @returns Array of slot arrays (one array per period)
 */
export function timesGroupsForTimeRanges(timeRanges: TimeRange[]) {
  return timeRanges.map((p) => timesForTimeRange(p));
}

export function timesGroupsForDate(
  date: Date,
  weekly: Weekly,
  exceptions: Exception[],
) {
  const plainDate = Temporal.Instant.fromEpochMilliseconds(date.getTime())
    .toZonedDateTimeISO(TIMEZONE)
    .toPlainDate();
  const periods = effectiveScheduleForDate(plainDate, weekly, exceptions);
  const u = isToday(plainDate) ? futureTimeRanges(periods) : periods;
  return timesGroupsForTimeRanges(u);
}

// .filter((p) =>
//     Temporal.PlainTime.from(p.start) > Temporal.Now.plainTimeISO(TIMEZONE)
// )

export function isDateOpen(
  date: Date,
  weekly: Weekly,
  exceptions: Exception[],
): boolean {
  const plainDate = Temporal.Instant.fromEpochMilliseconds(date.getTime())
    .toZonedDateTimeISO(TIMEZONE)
    .toPlainDate();
  if (isPast(plainDate)) return false;
  const periods = effectiveScheduleForDate(plainDate, weekly, exceptions);
  return periods.length > 0;
}

export function isDateTimeOpen(
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
  weekly: Weekly,
  exceptions: Exception[],
): boolean {
  const periods = effectiveScheduleForDate(date, weekly, exceptions);
  return futureTimeRanges(periods).some(
    ({ start, end }) =>
      Temporal.PlainTime.compare(time, start) >= 0 &&
      Temporal.PlainTime.compare(time, end) === -1,
  );
}

function isToday(date: Temporal.PlainDate) {
  return (
    Temporal.PlainDate.compare(Temporal.Now.plainDateISO(TIMEZONE), date) === 0
  );
}

function futureTimeRanges(timeRanges: TimeRange[]) {
  return timeRanges.filter(
    (p) => Temporal.PlainTime.compare(Temporal.Now.plainTimeISO(), p.start) < 0,
  );
}
