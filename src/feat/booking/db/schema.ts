import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgPolicy,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import type { DayIndex } from "@/lib/utils";
import { periods, temporalDate, temporalTime } from "./driver";
import { bookingStatuses } from "./types";

export const bookingStatusEnum = pgEnum("status", bookingStatuses);

export const bookingsTable = pgTable(
  "bookings",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    date: temporalDate().notNull(),
    time: temporalTime().notNull(),
    name: text().notNull(),
    email: text(),
    phone: text(),
    guests: integer().notNull(),
    notes: text(),
    status: bookingStatusEnum().notNull().default("pending"),
    table: integer(), // Nullable until seating
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  () => [
    // There is a bug if using db:push the policy will not have check and using statements but it will work with db:generate + db:migrate
    pgPolicy("For realtime enable all operations to authenticated users", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

export const weeklyTable = pgTable("weekly", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  day: smallint().notNull().$type<DayIndex>(),
  start: temporalTime().notNull(),
  end: temporalTime().notNull(),
}).enableRLS();

export const exceptionsTable = pgTable("exceptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  from: temporalDate().notNull(),
  to: temporalDate(), // Nullable for a single day
  periods: periods().default([]).notNull(), // Closed if empty
  note: text(),
}).enableRLS();

export const settingsTable = pgTable("settings", {
  id: integer()
    .primaryKey()
    .$default(() => 1),
  maxCapacityPerSlot: integer().notNull(),
  maxCapacityPerService: integer().notNull(),
  maxGuestsPerBooking: integer().notNull(),
  bookingEnabled: boolean().notNull().default(true),
}).enableRLS();
