import { type ClassValue, clsx } from "clsx";
import { type DateArg, format } from "date-fns";
import { twMerge } from "tailwind-merge";
import z from "zod";
import type { TDay } from "@/server/db/types";

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

export const DayConfig: Record<TDay, { label: string; index: number }> = {
  sunday: { label: "Dimanche", index: 0 },
  monday: { label: "Lundi", index: 1 },
  tuesday: { label: "Mardi", index: 2 },
  wednesday: { label: "Mercredi", index: 3 },
  thursday: { label: "Jeudi", index: 4 },
  friday: { label: "Vendredi", index: 5 },
  saturday: { label: "Samedi", index: 6 },
};

export const FullDateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
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
