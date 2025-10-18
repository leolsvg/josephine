import { eq } from "drizzle-orm";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { menusTable } from "@/server/db/schema";
import type { TMenuService } from "../../db/types";

export function getMenusByService(d: DB, service: TMenuService) {
  return safeDrizzleQuery(
    d.select().from(menusTable).where(eq(menusTable.service, service)),
  );
}
