import type {
  InferEnum,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import z from "zod";
import type { bookingStatusEnum, bookingsTable, settingsTable } from "./schema";

export const bookingStatuses = [
  "pending",
  "present",
  "absent",
  "canceled",
] as const;

export type TBooking = InferSelectModel<typeof bookingsTable>;
export type TSettings = InferSelectModel<typeof settingsTable>;
export type TStatus = InferEnum<typeof bookingStatusEnum>;

export const SRealtimeBooking = z.object({
  id: z.number(),
  date: z.string(),
  created_at: z.string(),
  email: z.string(),
  guests: z.number(),
  name: z.string(),
  notes: z.string().nullable(),
  phone: z.string(),
  status: z.literal(bookingStatuses),
  table: z.number().nullable(),
  time: z.string(),
  updated_at: z.string(),
});
export type TRealtimeBooking = z.infer<typeof SRealtimeBooking>;
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
