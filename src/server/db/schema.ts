import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  integer,
  pgEnum,
  pgPolicy,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole } from "drizzle-orm/supabase";
import type { DayIndex } from "@/lib/utils";
import type { TimeRange } from "./types";

type TDriverPeriods = { start: string; end: string }[];

const periods = customType<{
  data: TimeRange[];
  driverData: TDriverPeriods;
}>({
  dataType() {
    return "jsonb";
  },
  fromDriver(dbValue: TDriverPeriods): TimeRange[] {
    return dbValue.map((p) => ({
      start: Temporal.PlainTime.from(p.start),
      end: Temporal.PlainTime.from(p.end),
    }));
  },
  toDriver(appValue: TimeRange[]): TDriverPeriods {
    return appValue.map((p) => ({
      start: p.start.toString(),
      end: p.end.toString(),
    }));
  },
});

const temporalDate = customType<{
  data: Temporal.PlainDate;
  driverData: string;
}>({
  dataType() {
    return "date";
  },
  fromDriver(dbValue: string): Temporal.PlainDate {
    return Temporal.PlainDate.from(dbValue);
  },
  toDriver(appValue: Temporal.PlainDate): string {
    return appValue.toString();
  },
});

const temporalTime = customType<{
  data: Temporal.PlainTime;
  driverData: string;
}>({
  dataType() {
    return "time";
  },
  fromDriver(dbValue: string): Temporal.PlainTime {
    return Temporal.PlainTime.from(dbValue);
  },
  toDriver(appValue: Temporal.PlainTime): string {
    return appValue.toString();
  },
});

export const menuCategoryEnum = pgEnum("menu-category", [
  "fromage",
  "entree",
  "plat",
  "dessert",
  "partager",
]);

export const menuServiceEnum = pgEnum("menu-service", ["soir", "midi"]);

export const statuses = ["pending", "present", "absent", "canceled"] as const;

export const statusEnum = pgEnum("status", statuses);

export const menusTable = pgTable(
  "menus",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    description: text().notNull(),
    category: menuCategoryEnum().notNull(),
    price: integer().notNull(),
    service: menuServiceEnum().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  () => [
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    // For leo admin menus page, TODO : delete if replacing supabase client with drizzle
    pgPolicy("Enable all operations to authenticated users", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

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
    status: statusEnum().notNull().default("pending"),
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
