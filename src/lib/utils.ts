import { type ClassValue, clsx } from "clsx";
import { type DateArg, format } from "date-fns";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type NavItem<T extends string = string> = {
  href: T;
  title: string;
};

export const TIMEZONE = "Europe/Paris";
export const LOCALE = "fr-FR";

export const SId = z.object({
  id: z.number(),
});

export function toYMD(date: DateArg<Date>) {
  return format(date, "yyyy-MM-dd");
}

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DayConfig = [
  { label: "Dimanche", slug: "sunday" },
  { label: "Lundi", slug: "monday" },
  { label: "Mardi", slug: "tuesday" },
  { label: "Mercredi", slug: "wednesday" },
  { label: "Jeudi", slug: "thursday" },
  { label: "Vendredi", slug: "friday" },
  { label: "Samedi", slug: "saturday" },
] as const satisfies Record<DayIndex, { label: string; slug: string }>;

export const FullDateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
});

export const DateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
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
