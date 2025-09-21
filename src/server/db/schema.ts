import { sql } from "drizzle-orm";
import {
  customType,
  date,
  integer,
  jsonb,
  pgEnum,
  pgPolicy,
  pgTable,
  smallint,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { type DayIndex, TIMEZONE } from "@/lib/utils";
import type { HM, Period } from "./types";

const customDate = customType<{
  data: Date;
  driverData: string;
}>({
  dataType() {
    return "date";
  },
  fromDriver(dbValue: string): Date {
    return new Date(
      Temporal.PlainDate.from(dbValue).toZonedDateTime(TIMEZONE)
        .epochMilliseconds,
    );
  },
  toDriver(appValue: Date): string {
    return Temporal.Instant.fromEpochMilliseconds(appValue.getTime())
      .toZonedDateTimeISO(TIMEZONE)
      .toPlainDate()
      .toString();
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

export const statusEnum = pgEnum("status", [
  "pending",
  "present",
  "absent",
  "canceled",
]);

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
    date: date().notNull(),
    time: time().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    phone: text().notNull(),
    guests: integer().notNull(),
    notes: text(),
    status: statusEnum().notNull().default("pending"),
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
  start: time().notNull().$type<HM>(),
  end: time().notNull().$type<HM>(),
}).enableRLS();

export const exceptionsTable = pgTable("exceptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  from: customDate().notNull(),
  to: customDate(), // Nullable for a single day
  periods: jsonb().$type<Period[]>().default([]).notNull(), // Closed if empty
  note: text(),
}).enableRLS();

export const settingsTable = pgTable("settings", {
  id: integer()
    .primaryKey()
    .$default(() => 1),
  maxCapacityPerSlot: integer().notNull(),
  maxCapacityPerService: integer().notNull(),
  maxGuestsPerBooking: integer().notNull(),
}).enableRLS();
