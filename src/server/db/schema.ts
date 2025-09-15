import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgPolicy,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { anonRole } from "drizzle-orm/supabase";

export const menuCategory = pgEnum("menu-category", [
  "fromage",
  "entree",
  "plat",
  "dessert",
  "partager",
]);

export const menuService = pgEnum("menu-service", ["soir", "midi"]);

export const bookingsTable = pgTable(
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
