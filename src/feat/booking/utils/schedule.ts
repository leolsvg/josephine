import type { Exception, TimeRange, Weekly } from "@/feat/booking/db/types";
import { isDateInRange, isPast, isToday, TIMEZONE } from "@/lib/utils/date";

/**
 * Get the effective opening time ranges for a given date.
 * Combines weekly schedule and exceptions.
 *
 * @param date - The target date
 * @param weekly - Weekly schedule (array of time range per weekday)
 * @param exceptions - Array of exception
 * @returns Array of time ranges with `start` and `end` as HM strings
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

/**
 * Generate discrete time slots within a given time range.
 *
 * @param timeRange - The time range to split into slots
 * @param duration - Duration of each slot (default 15 minutes)
 * @returns Array of Temporal.PlainTime representing start times of each slot
 */
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

/**
 * Generate arrays of time slots for multiple time ranges.
 *
 * @param timeRanges - Array of TimeRange objects
 * @returns Array of arrays of Temporal.PlainTime slots (one array per time range)
 */
export function timesGroupsForTimeRanges(timeRanges: TimeRange[]) {
  return timeRanges.map((p) => timesForTimeRange(p));
}

/**
 * Generate arrays of time slots for a specific date (intended for direct usage by the date time picker).
 *
 *
 * @param date - JavaScript Date object
 * @param weekly - Weekly schedule
 * @param exceptions - Array of exceptions
 * @returns Array of arrays of Temporal.PlainTime slots, only future service slots if the date is today.
 */
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

/**
 * Check if a given date is open (has at least one time range) and is not in the past (intended for direct usage by the date time picker).
 *
 * @param date - JavaScript Date object
 * @param weekly - Weekly schedule
 * @param exceptions - Array of exceptions
 * @returns `true` if the date has any active periods, otherwise `false`
 */
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

/**
 * Check if a specific time is within any of the active periods (for server side validation).
 * Only future periods are considered.
 *
 * @param date - Temporal.PlainDate to check
 * @param time - Temporal.PlainTime to check
 * @param effective - Array of TimeRange objects for the day
 * @returns `true` if the time falls within any future period, otherwise `false`
 */
export function isDateTimeOpen(
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
  effective: TimeRange[],
): boolean {
  const ranges = isToday(date) ? futureTimeRanges(effective) : effective;
  return ranges.some(
    ({ start, end }) =>
      Temporal.PlainTime.compare(time, start) >= 0 &&
      Temporal.PlainTime.compare(time, end) === -1,
  );
}

/**
 * Filter out past time ranges.
 *
 * @param timeRanges - Array of TimeRange objects
 * @returns Array of TimeRange objects that start in the future
 */
function futureTimeRanges(timeRanges: TimeRange[]) {
  return timeRanges.filter(
    (p) => Temporal.PlainTime.compare(Temporal.Now.plainTimeISO(), p.start) < 0,
  );
}
