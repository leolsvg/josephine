import { err, ok, type Result } from "neverthrow";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { Josephine } from "@/lib/josephine";
import type { DB } from "@/server/db";
import { settingsTable } from "@/server/db/schema";

export class NoSettingsError extends Error {
  constructor() {
    super("Aucun paramètre trouvé dans la base de données");
    this.name = "NoSettingsError";
  }
}

export class MaxGuestsError extends Error {
  constructor(maxGuests: number) {
    super(
      `Nos réservations en ligne sont limitées à ${maxGuests} personnes. Pour un groupe plus large, merci de nous contacter par téléphone au ${formatPhoneNumber(Josephine.phone) ?? Josephine.phone}.`,
    );
    this.name = "MaxGuestsError";
  }
}

export function getSettings(db: DB) {
  return safeDrizzleQuery(
    db
      .select({
        maxCapacityPerSlot: settingsTable.maxCapacityPerSlot,
        maxCapacityPerService: settingsTable.maxCapacityPerService,
        maxGuestsPerBooking: settingsTable.maxGuestsPerBooking,
      })
      .from(settingsTable)
      .limit(1),
  ).andThen((s) => (s.length === 0 ? err(new NoSettingsError()) : ok(s[0])));
}

export function checkGuestsLimit(
  maxGuestsPerBooking: number,
  guests: number,
): Result<void, MaxGuestsError> {
  return guests > maxGuestsPerBooking
    ? err(new MaxGuestsError(maxGuestsPerBooking))
    : ok();
}

// export function checkCapacitySlot(
//   db: DB,
//   date: Temporal.PlainDate,
//   time: Temporal.PlainTime,
//   guests: number,
// ) {
//   const MAX_GUESTS_PER_HOUR = 30;

//   return getSettings(db).andThen((s) => {
//     getWeekly(db).andThen((w) =>
//       getExceptions(db).andThen((e) =>
//         ok(
//           timesGroupsForDate(
//             toDate(date.toZonedDateTime(TIMEZONE)),
//             w,
//             e,
//             // TODO add duration 1 hour
//           ),
//         ),
//       ),
//     );
//     // TODO
//     return safeDrizzleQuery(
//       db
//         .select({
//           totalGuests: sql<number>`COALESCE(SUM(${bookingsTable.guests}), 0)`,
//         })
//         .from(bookingsTable)
//         .where(sql`
//           ${bookingsTable.date} = ${date}
//           AND date_trunc('hour', ${bookingsTable.time}::time) = date_trunc('hour', ${time}::time)
//           AND NOT EXISTS (
//             SELECT 1
//             FROM ${exceptionsTable} e
//             WHERE e."from" <= ${bookingsTable.date}
//               AND (e."to" IS NULL OR e."to" >= ${bookingsTable.date})
//               AND ${bookingsTable.time} = ANY (
//                 ARRAY(
//                   SELECT jsonb_array_elements_text(e.periods)::time
//                 )
//               )
//           )
//         `),
//     ).andThen((c) =>
//       c[0].totalGuests + guests > MAX_GUESTS_PER_HOUR
//         ? err(new MaxCapacitySlotError())
//         : ok(),
//     );
//   });
// }
