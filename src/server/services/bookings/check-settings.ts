import { sql } from "drizzle-orm";
import { err, ok } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "../../db";
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

export function checkCapacitySlot(
  db: DB,
  date: string,
  time: string,
  guests: number,
) {
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
        c[0].bookingCount + guests > s.maxCapacityPerSlot
          ? err(new MaxCapacitySlotError())
          : ok(),
      );
    });
}

// const e = await checkCapacityService(db, "2025-09-24", "14:00:00", 5);
// console.log(e);

// export async function checkCapacityService(
//   db: DB,
//   date: string,
//   time: HM,
//   guests: number,
// ) {
//   const settings =  safeDrizzleQuery(
//     db
//       .select({
//         maxCapacityPerSlot: settingsTable.maxCapacityPerSlot,
//         maxCapacityPerService: settingsTable.maxCapacityPerService,
//         maxGuestsPerBooking: settingsTable.maxGuestsPerBooking,
//       })
//       .from(settingsTable)
//       .limit(1),
//   )
//     .andThen((s) => (s.length === 1 ? ok(s[0]) : err(new NoSettingsError())))
//     .andThen((c) => {
//       const result = raw(db, date, time);
//       const count = result[0].count as number;
//       count + guests > c.maxCapacityPerService
//         ? err(new MaxCapacityServiceError())
//         : ok();
//     });
// }

// const t = fromSafePromise(raw(db, "date", "10:00:00")).andThen((r) => {
//   ok(r);
//   // const count = r[0].count as number;
//   // count + 10 > 40
//   //   ? err(new MaxCapacityServiceError())
//   //   : ok();
// });

// function raw(db: DB, date: string, time: HM) {
//   return db.execute(
//     sql`
//               WITH
//             target_service AS (
//               SELECT
//                 -- Determine the start and end of the service for the given date and input time
//                 CASE
//                   WHEN EXISTS (
//                     SELECT
//                       1
//                     FROM
//                       exceptions e
//                       CROSS JOIN LATERAL jsonb_array_elements(e.periods) AS p (period)
//                     WHERE
//                       e.from <= DATE '${sql.raw(date)}'
//                       AND (
//                         e.to IS NULL
//                         OR e.to >= DATE '${sql.raw(date)}'
//                       )
//                       AND TIME '${sql.raw(time)}' >= (p.period ->> 'start')::time
//                       AND TIME '${sql.raw(time)}' <= (p.period ->> 'end')::time
//                   ) THEN (
//                     SELECT
//                       p.period
//                     FROM
//                       exceptions e
//                       CROSS JOIN LATERAL jsonb_array_elements(e.periods) AS p (period)
//                     WHERE
//                       e.from <= DATE '${sql.raw(date)}'
//                       AND (
//                         e.to IS NULL
//                         OR e.to >= DATE '${sql.raw(date)}'
//                       )
//                       AND TIME '${sql.raw(time)}' >= (p.period ->> 'start')::time
//                       AND TIME '${sql.raw(time)}' <= (p.period ->> 'end')::time
//                     LIMIT
//                       1
//                   )
//                   ELSE (
//                     SELECT
//                       jsonb_build_object('start', w.start, 'end', w.end)
//                     FROM
//                       weekly w
//                     WHERE
//                       EXTRACT(
//                         DOW
//                         FROM
//                           DATE '${sql.raw(date)}'
//                       ) = w.day
//                       AND TIME '${sql.raw(time)}' >= w.start
//                       AND TIME '${sql.raw(time)}' <= w.end
//                     LIMIT
//                       1
//                   )
//                 END AS period
//             )
//           SELECT
//             COUNT(*)
//           FROM
//             bookings b
//             JOIN target_service ts ON b.date = DATE '${sql.raw(date)}'
//           WHERE
//             b.time >= (ts.period ->> 'start')::time
//             AND b.time <= (ts.period ->> 'end')::time;
//     `,
//   );
// }
