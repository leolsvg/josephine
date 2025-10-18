import { eq } from "drizzle-orm";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { menusTable } from "@/server/db/schema";
import type { TMenu } from "../../db/types";

export function patchMenu(
  d: DB,
  id: TMenu["id"],
  values: Partial<Omit<TMenu, "id" | "createdAt" | "updatedAt">>,
) {
  return safeDrizzleQuery(
    d.update(menusTable).set(values).where(eq(menusTable.id, id)),
  );
}
