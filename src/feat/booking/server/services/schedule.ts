import { asc } from "drizzle-orm";
import { ok } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { exceptionsTable, weeklyTable } from "@/server/db/schema";
import type { Exception, Weekly } from "../../db/types";

export function getWeekly(d: DB) {
  return safeDrizzleQuery(
    d
      .select({
        id: weeklyTable.id,
        day: weeklyTable.day,
        start: weeklyTable.start,
        end: weeklyTable.end,
      })
      .from(weeklyTable)
      .orderBy(asc(weeklyTable.day), asc(weeklyTable.start)),
  ).andThen((r) =>
    ok(
      r.reduce<Weekly>((acc, r) => {
        const bucket = acc[r.day] ?? [];
        bucket.push({
          start: r.start,
          end: r.end,
        });
        acc[r.day] = bucket;
        return acc;
      }, []),
    ),
  );
}

export function getExceptions(d: DB) {
  return safeDrizzleQuery(
    d
      .select({
        id: exceptionsTable.id,
        from: exceptionsTable.from,
        to: exceptionsTable.to,
        periods: exceptionsTable.periods,
        note: exceptionsTable.note,
      })
      .from(exceptionsTable)
      .orderBy(asc(exceptionsTable.from), asc(exceptionsTable.id)) as Promise<
      Exception[]
    >,
  );
}
