import { and, eq, exists, gte, isNull, lte, or, sql } from "drizzle-orm";
import { err, ok } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { HM } from "@/server/db/types";
import { type DB, db } from "../../db";
import {
  bookingsTable,
  exceptionsTable,
  settingsTable,
  weeklyTable,
} from "../../db/schema";

export class NoSettingsError extends Error {
  constructor() {
    super("Aucun paramètre trouvé dans la base de données");
    this.name = "NoSettingsError";
  }
}

export class MaxCapacitySlotError extends Error {
  constructor() {
    super(
      "Le restaurant est complet pour le créneau sélectionné. Vous pouvez choisir un autre horaire.",
    );
    this.name = "MaxCapacitySlotError";
  }
}

export class MaxCapacityServiceError extends Error {
  constructor() {
    super("Le restaurant est complet pour le service sélectionné.");
    this.name = "MaxCapacityServiceError";
  }
}

export function checkCapacitySlot(db: DB, date: string, time: string) {
  return safeDrizzleQuery(
    db
      .select({
        maxCapacityPerSlot: settingsTable.maxCapacityPerSlot,
        maxCapacityPerService: settingsTable.maxCapacityPerService,
        maxGuestsPerBooking: settingsTable.maxGuestsPerBooking,
      })
      .from(settingsTable)
      .limit(1),
  )
    .andThen((s) => (s.length === 0 ? ok(s[0]) : err(new NoSettingsError())))
    .andThen((s) => {
      return safeDrizzleQuery(
        db
          .select({
            bookingCount: sql<number>`COUNT(DISTINCT ${bookingsTable.id})`,
          })
          .from(bookingsTable)
          .innerJoin(
            weeklyTable,
            sql`EXTRACT(DOW FROM ${bookingsTable.date}) = ${weeklyTable.day}
        AND ${bookingsTable.time} >= ${weeklyTable.start}
        AND ${bookingsTable.time} <= ${weeklyTable.end}`,
          )
          .innerJoin(
            sql`
              (
                SELECT
                  ${time}::time AS input_time,
                  (
                    date_trunc('minute', ${time}::time)::time
                    - (EXTRACT(MINUTE FROM ${time}::time)::int % 15) * interval '1 minute'
                  ) AS interval_start
              ) ti
            `,
            sql`${bookingsTable.time} >= ti.interval_start::time
              AND ${bookingsTable.time} < (ti.interval_start + interval '15 minutes')::time`,
          )
          .where(sql`
            ${bookingsTable.date} = ${date}
            AND NOT EXISTS (
              SELECT 1
              FROM ${exceptionsTable} e
              WHERE e."from" <= ${bookingsTable.date}
                AND (e."to" IS NULL OR e."to" >= ${bookingsTable.date})
                AND ${bookingsTable.time} = ANY (
                  ARRAY(
                    SELECT jsonb_array_elements_text(e.periods)::time
                  )
                )
            )
          `),
      ).andThen((c) =>
        c[0].bookingCount > s.maxCapacityPerSlot ? err() : ok(),
      );
    });
}

const exceptions = (db: DB, date: string, time: HM) =>
  db
    .select({ count: sql`1` })
    .from(exceptionsTable)
    .crossJoinLateral(
      sql`jsonb_array_elements(${exceptionsTable}."periods") AS p(period)`,
    )
    .where(
      and(
        lte(exceptionsTable.from, sql`DATE '${sql.raw(date)}'`),
        or(
          isNull(exceptionsTable.to),
          gte(exceptionsTable.to, sql`DATE '${sql.raw(date)}'`),
        ),
        gte(sql`TIME '${sql.raw(time)}'`, sql`(p.period ->> 'start')::time`),
        lte(sql`TIME '${sql.raw(time)}'`, sql`(p.period ->> 'end')::time`),
      ),
    );

const e = await checkCapacityService(db, "2025-09-24", "19:00:00");
console.log(e);

export async function checkCapacityService(db: DB, date: string, time: HM) {
  const exception = db
    .select({ count: sql`1` })
    .from(exceptionsTable)
    .crossJoinLateral(
      sql`jsonb_array_elements(${exceptionsTable.periods}) AS p(period)`,
    )
    .where(
      and(
        lte(exceptionsTable.from, sql`DATE '${sql.raw(date)}'`),
        or(
          isNull(exceptionsTable.to),
          gte(exceptionsTable.to, sql`DATE '${sql.raw(date)}'`),
        ),
        gte(bookingsTable.time, sql`(p.period ->> 'start')::time`),
        lte(bookingsTable.time, sql`(p.period ->> 'end')::time`),
      ),
    );

  const weekly = db
    .select({ count: sql`1` })
    .from(weeklyTable)
    .where(
      and(
        sql`EXTRACT(DOW FROM DATE '${sql.raw(date)}') = ${weeklyTable.day}`,
        gte(bookingsTable.time, weeklyTable.start),
        lte(bookingsTable.time, weeklyTable.end),
      ),
    );

  const result = db
    .select({
      bookingCount: sql<number>`COUNT(DISTINCT ${bookingsTable.id})`,
    })
    .from(bookingsTable)
    .where(
      and(
        or(exists(exception), exists(weekly)),
        eq(bookingsTable.date, sql`DATE '${sql.raw(date)}'`),
      ),
    );
  return { result: await result, sql: result.toSQL() };
}
