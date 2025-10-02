import { type ClassValue, clsx } from "clsx";
import type { Route } from "next";
import { twMerge } from "tailwind-merge";
import z from "zod";
import type { TMenuCategory } from "@/server/db/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type NavItem = {
  href: Route;
  title: string;
};

export const LOCALE = "fr-FR";

export const SId = z.object({
  id: z.number(),
});

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

export const menuCategories = [
  "partager",
  "entree",
  "plat",
  "fromage",
  "dessert",
] as const satisfies TMenuCategory[];

export const menuSectionTitles = {
  partager: "À PARTAGER",
  entree: "ENTRÉES",
  plat: "PLATS",
  fromage: "FROMAGE",
  dessert: "DESSERTS",
} as const;
