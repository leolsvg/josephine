import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { menusTable } from "@/server/db/schema";
import type { TMenuService } from "@/server/db/types";

export function putDefaultMenu(d: DB, service: TMenuService) {
  return safeDrizzleQuery(
    d.insert(menusTable).values({
      description: "Nouveau plat",
      price: 0,
      category: "plat",
      service,
    }),
  );
}
