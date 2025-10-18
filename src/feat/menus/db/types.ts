import type { InferEnum, InferSelectModel } from "drizzle-orm";
import type { menuCategoryEnum, menuServiceEnum, menusTable } from "./schema";

// Define order of categories to display
export const menuCategories = [
  "partager",
  "entree",
  "plat",
  "fromage",
  "dessert",
] as const;

export const menuServices = ["soir", "midi"] as const;

export type TMenu = InferSelectModel<typeof menusTable>;
export type TMenuCategory = InferEnum<typeof menuCategoryEnum>;
export type TMenuService = InferEnum<typeof menuServiceEnum>;
