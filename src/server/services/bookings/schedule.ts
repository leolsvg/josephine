import { fromZonedTime } from "date-fns-tz";
import { asc } from "drizzle-orm";
import { INTERNAL_SERVER_ERROR } from "@/lib/errors";
import { dayToIndex, TIMEZONE, toYMD } from "@/lib/utils";
import type { DB } from "@/server/db";
import { exceptionsTable, weeklyTable } from "@/server/db/schema";
import type { Exception, Weekly } from "@/server/services/bookings/utils";

export async function getWeekly(d: DB) {
  const rows = await d
    .select()
    .from(weeklyTable)
    .orderBy(asc(weeklyTable.day), asc(weeklyTable.start));
  return rows.reduce<Weekly[]>((acc, r) => {
    const id = dayToIndex[r.day];
    if (id == null) return acc;
    const bucket = acc[id] ?? { periods: [] };
    bucket.periods.push({
      from: r.from,
      to: r.to,
    });
    acc[id] = bucket;
    return acc;
  }, []);
}

export async function getExceptions(d: DB) {
  try {
    const rows = await d
      .select()
      .from(exceptionsTable)
      .orderBy(asc(exceptionsTable.from), asc(exceptionsTable.id));
    const periods = await d
      .select()
      .from(exceptionPeriodsTable)
      .orderBy(
        asc(exceptionPeriodsTable.exceptionId),
        asc(exceptionPeriodsTable.from),
      );
    const periodsByException = periods.reduce((map, p) => {
      const arr = map.get(p.exceptionId) ?? [];
      arr.push({ from: p.from, to: p.to });
      map.set(p.exceptionId, arr);
      return map;
    }, new Map<number, { from: string; to: string }[]>());

    return rows.reduce<Exception[]>((acc, e) => {
      const periods = periodsByException.get(e.id) ?? [];
      acc.push({
        from: toYMD(fromZonedTime(e.from, TIMEZONE)),
        to: e.to ? toYMD(fromZonedTime(e.to, TIMEZONE)) : undefined,
        periods,
      });
      return acc;
    }, []);
  } catch (e) {
    throw INTERNAL_SERVER_ERROR(e);
  }
}
