import { eq } from "drizzle-orm";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { menusTable } from "@/server/db/schema";
import type { TMenu } from "@/server/db/types";

export function deleteMenu(d: DB, id: TMenu["id"]) {
  return safeDrizzleQuery(d.delete(menusTable).where(eq(menusTable.id, id)));
}
