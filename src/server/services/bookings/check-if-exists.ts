import { and, eq, or } from "drizzle-orm";
import { err, ok } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "../../db";
import { bookingsTable } from "../../db/schema";

export class DuplicateBookingError extends Error {
  constructor() {
    super("Une réservation existe déjà pour cette date/heure.");
    this.name = "DuplicateBookingError";
  }
}

/**
 * Explicit return type — no inference.
 *
 * Returns:
 *  - ok(void) if no duplicate exists
 *  - err(DuplicateBookingError) if a duplicate exists
 *  - err(InternalServerError) if the DB query fails
 */
export function checkIfExists(
  db: DB,
  email: string,
  phone: string,
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
) {
  return safeDrizzleQuery(
    db
      .select({ id: bookingsTable.id })
      .from(bookingsTable)
      .where(
        and(
          eq(bookingsTable.date, date),
          eq(bookingsTable.time, time),
          or(eq(bookingsTable.email, email), eq(bookingsTable.phone, phone)),
        ),
      )
      .limit(1),
  ).andThen((r) => (r.length > 0 ? err(new DuplicateBookingError()) : ok()));
}
