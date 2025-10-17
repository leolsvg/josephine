import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { menusTable } from "@/server/db/schema";

export function getMenus(d: DB) {
  return safeDrizzleQuery(d.select().from(menusTable));
}
