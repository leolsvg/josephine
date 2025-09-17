import { and, eq, or } from "drizzle-orm";
import { DUPLICATE_BOOKING_ERROR } from "../../../lib/errors";
import type { DB } from "../../db";
import { bookingsTable } from "../../db/schema";

/**
 * Checks whether a duplicate booking already exists for the given date and time.
 *
 * The check looks for an existing booking on the same `date` and `time`
 * where either the `email` OR the `phone` matches the provided values.
 * If such a booking is found, a `DUPLICATE_BOOKING_ERROR` is thrown.
 *
 * @param db - Database client instance.
 * @param email - Email address to check for duplicates.
 * @param phone - Phone number to check for duplicates.
 * @param date - Booking date in `YYYY-MM-DD` format (local timezone).
 * @param time - Booking time in 24-hour format (e.g. `HH:mm` or `HH:mm:ss`).
 * @returns Resolves when no duplicate exists; otherwise throws.
 * @throws {TRPCError} `DUPLICATE_BOOKING_ERROR` when a duplicate booking exists.
 */
export async function checkIfExists(
  db: DB,
  email: string,
  phone: string,
  date: string,
  time: string,
) {
  const existing = await db
    .select({ id: bookingsTable.id })
    .from(bookingsTable)
    .where(
      and(
        eq(bookingsTable.date, date),
        eq(bookingsTable.time, time),
        or(eq(bookingsTable.email, email), eq(bookingsTable.phone, phone)),
      ),
    )
    .limit(1);
  if (existing.length > 0) {
    throw DUPLICATE_BOOKING_ERROR;
  }
}
