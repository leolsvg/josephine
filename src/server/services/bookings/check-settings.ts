import { sql } from "drizzle-orm";
import { err, ok } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { TIMEZONE, toDate, toZdt } from "@/lib/utils";
import type { DB } from "@/server/db";
import {
  bookingsTable,
  exceptionsTable,
  settingsTable,
  weeklyTable,
} from "@/server/db/schema";
import { getExceptions, getWeekly } from "./schedule";
import { generateTimeSlots } from "./utils";

export class NoSettingsError extends Error {
  constructor() {
    super("Aucun paramètre trouvé dans la base de données");
    this.name = "NoSettingsError";
  }
}

export class MaxGuestsError extends Error {
  constructor(maxGuests: number) {
    super(
      `Nos réservations en ligne sont limitées à ${maxGuests} personnes. Pour un groupe plus large, merci de nous contacter directement.`,
    );
    this.name = "MaxGuestsError";
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

export function checkGuestsLimit(db: DB, guests: number) {
  return getSettings(db).andThen((r) =>
    guests > r.maxGuestsPerBooking
      ? err(new MaxGuestsError(r.maxGuestsPerBooking))
      : ok(),
  );
}

export function checkCapacitySlot(
  db: DB,
  date: string,
  time: string,
  guests: number,
) {
  const MAX_GUESTS_PER_HOUR = 30;

  return getSettings(db).andThen((s) => {
    getWeekly(db).andThen((w) =>
      getExceptions(db).andThen((e) =>
        ok(
          generateTimeSlots(
            toDate(Temporal.PlainDate.from(date).toZonedDateTime(TIMEZONE)),
            w,
            e,
            {
              slotMinutes: 60,
              now: new Date(),
            },
          ),
        ),
      ),
    );
    // TODO
    return safeDrizzleQuery(
      db
        .select({
          totalGuests: sql<number>`COALESCE(SUM(${bookingsTable.guests}), 0)`,
        })
        .from(bookingsTable)
        .where(sql`
          ${bookingsTable.date} = ${date}
          AND date_trunc('hour', ${bookingsTable.time}::time) = date_trunc('hour', ${time}::time)
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
      c[0].totalGuests + guests > MAX_GUESTS_PER_HOUR
        ? err(new MaxCapacitySlotError())
        : ok(),
    );
  });
}
