import type {
  InferEnum,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { bookingsTable, type dayEnum } from "./schema";

export type TBooking = InferSelectModel<typeof bookingsTable>;
export type TDay = InferEnum<typeof dayEnum>;
export const SPutBooking = createInsertSchema(bookingsTable);
export type TPutBooking = InferInsertModel<typeof bookingsTable>;
export type HM = `${number}:${number}` | `${number}:${number}:${number}`;
export type Period = { start: HM; end: HM };
export type Dayly = { periods: Period[] };
export type Weekly = Dayly[];
export type Exception = {
  from: Date;
  to: Date | null;
  periods: Period[]; // empty = closed
  note: string | null;
};
