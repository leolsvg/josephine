import type {
  InferEnum,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  type bookingsTable,
  type menuCategoryEnum,
  type menuServiceEnum,
  type menusTable,
  settingsTable,
  type statusEnum,
} from "./schema";

export type TBooking = InferSelectModel<typeof bookingsTable>;
export type TMenu = InferSelectModel<typeof menusTable>;
export type TMenuCategory = InferEnum<typeof menuCategoryEnum>;
export type TMenuService = InferEnum<typeof menuServiceEnum>;
export type TStatus = InferEnum<typeof statusEnum>;
export const SSettings = createInsertSchema(settingsTable).omit({
  id: true,
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
