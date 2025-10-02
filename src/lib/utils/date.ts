import type { DateRange } from "@/server/db/types";

export const TIMEZONE = "Europe/Paris";

export const FullDateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeZone: TIMEZONE,
});

export const TimeFormat = new Intl.DateTimeFormat("fr-FR", {
  timeStyle: "short",
  timeZone: TIMEZONE,
});

export const FullDateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: TIMEZONE,
});

export const DateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeZone: TIMEZONE,
});

/** Convert JS Date → Temporal.ZonedDateTime in TIMEZONE */
export function toZdt(date: Date, timeZone = TIMEZONE): Temporal.ZonedDateTime {
  return Temporal.Instant.fromEpochMilliseconds(
    date.getTime(),
  ).toZonedDateTimeISO(timeZone);
}

/** Convert Temporal.ZonedDateTime → JS Date */
export function toDate(zdt: Temporal.ZonedDateTime): Date {
  return new Date(zdt.epochMilliseconds);
}

/** Start of day for a given Date in TIMEZONE */
export function startOfDay(date: Date): Temporal.ZonedDateTime {
  return toZdt(date).startOfDay();
}

export function isDateInRange(date: Temporal.PlainDate, range: DateRange) {
  const to = range.to ?? range.from;
  return (
    Temporal.PlainDate.compare(date, range.from) >= 0 &&
    Temporal.PlainDate.compare(date, to) <= 0
  );
}

/**
 * Check if a given date is in the past relative to the current date (not time).
 *
 * @param date - Temporal.PlainDate to check
 * @returns `true` if the date is before today, otherwise `false`
 */
export function isPast(date: Temporal.PlainDate) {
  const now = Temporal.Now.plainDateISO(TIMEZONE);
  return Temporal.PlainDate.compare(date, now) < 0;
}

/**
 * Check if a given Temporal.PlainDate is today.
 *
 * @param date - Temporal.PlainDate to check
 * @returns `true` if the date is today, otherwise `false`
 */
export function isToday(date: Temporal.PlainDate) {
  return (
    Temporal.PlainDate.compare(Temporal.Now.plainDateISO(TIMEZONE), date) === 0
  );
}
