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

export const dayToIndex = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
} as const;

export const dayArray = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const satisfies TDay[];

export const FullDateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
});
