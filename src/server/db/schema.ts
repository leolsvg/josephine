import { sql } from "drizzle-orm";
import {
  date,
  integer,
  jsonb,
  pgEnum,
  pgPolicy,
  pgTable,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import type { Period } from "./types";

export const menuCategory = pgEnum("menu-category", [
  "fromage",
  "entree",
  "plat",
  "dessert",
  "partager",
]);

export const menuService = pgEnum("menu-service", ["soir", "midi"]);

export const statusEnum = pgEnum("status", [
  "pending",
  "present",
  "absent",
  "canceled",
]);

export const dayEnum = pgEnum("day", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const menusTable = pgTable(
  "menus",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    description: text().notNull(),
    category: menuCategory().notNull(),
    price: integer().notNull(),
    service: menuService().notNull(),
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
  day: dayEnum().notNull(),
  start: time().notNull(),
  end: time().notNull(),
}).enableRLS();

export const exceptionsTable = pgTable("exceptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  from: date().notNull(),
  to: date(), // Nullable for a single day
  periods: jsonb().$type<Period[]>().default([]), // Closed if empty
  note: text(),
}).enableRLS();
