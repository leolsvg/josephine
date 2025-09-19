import { asc } from "drizzle-orm";
import { ok } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { dayToIndex } from "@/lib/utils";
import type { DB } from "@/server/db";
import { exceptionsTable, weeklyTable } from "@/server/db/schema";
import type { Exception, Weekly } from "@/server/db/types";

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
        const id = dayToIndex[r.day];
        if (id == null) return acc;
        const bucket = acc[id] ?? { periods: [] };
        bucket.periods.push({
          start: r.start,
          end: r.end,
        });
        acc[id] = bucket;
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
