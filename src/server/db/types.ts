import type {
  InferEnum,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import {
  bookingsTable,
  type dayEnum,
  type menuCategoryEnum,
  type menuServiceEnum,
} from "./schema";

export type TBooking = InferSelectModel<typeof bookingsTable>;
export type TDay = InferEnum<typeof dayEnum>;
export type TMenuCategory = InferEnum<typeof menuCategoryEnum>;
export type TMenuService = InferEnum<typeof menuServiceEnum>;
export const SPutBooking = createInsertSchema(bookingsTable);
export const SPatchBooking = createUpdateSchema(bookingsTable);
export type TPutBooking = InferInsertModel<typeof bookingsTable>;

export type HM = `${number}:${number}` | `${number}:${number}:${number}`;
export type Period = { start: HM; end: HM };
export type Dayly = { periods: Period[] };
export type Weekly = Dayly[]; // 0..6 => Sunday..Saturday;
export type Exception = {
  from: Date;
  to: Date | null;
  periods: Period[]; // empty = closed
  note: string | null;
};
