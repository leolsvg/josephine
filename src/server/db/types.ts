import type {
  InferEnum,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import {
  type bookingsTable,
  type menuCategoryEnum,
  type menuServiceEnum,
  type menusTable,
  settingsTable,
  type statusEnum,
  statuses,
} from "./schema";

export type TBooking = InferSelectModel<typeof bookingsTable>;
export type TSettings = InferSelectModel<typeof settingsTable>;
export type TMenu = InferSelectModel<typeof menusTable>;
export type TMenuCategory = InferEnum<typeof menuCategoryEnum>;
export type TMenuService = InferEnum<typeof menuServiceEnum>;
export type TStatus = InferEnum<typeof statusEnum>;
export const SSettings = createInsertSchema(settingsTable).omit({
  id: true,
});
export const SRealtimeBooking = z.object({
  id: z.number(),
  date: z.string(),
  createdAt: z.string(),
  email: z.string(),
  guests: z.number(),
  name: z.string(),
  notes: z.string(),
  phone: z.string(),
  status: z.literal(statuses),
  table: z.number(),
  time: z.string(),
  updatedAt: z.string(),
});
export type TPutBooking = InferInsertModel<typeof bookingsTable>;

export type TimeRange = { start: Temporal.PlainTime; end: Temporal.PlainTime };
export type DateRange = {
  from: Temporal.PlainDate;
  to: Temporal.PlainDate | null;
};
export type Weekly = TimeRange[][]; // 0..6 => Sunday..Saturday;
export type Exception = {
  periods: TimeRange[]; // empty = closed
  note: string | null;
} & DateRange;
