import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { menuCategories, menuServices } from "./types";

export const menuCategoryEnum = pgEnum("menu-category", menuCategories);

export const menuServiceEnum = pgEnum("menu-service", menuServices);

export const menusTable = pgTable("menus", {
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
}).enableRLS();
