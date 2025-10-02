import { okAsync, safeTry } from "neverthrow";
import type { ErrorResponse } from "resend";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { TIMEZONE } from "@/lib/utils/date";
import { effectiveScheduleForDate } from "@/lib/utils/schedule";
import type { DB } from "@/server/db";
import { bookingsTable } from "@/server/db/schema";
import type { TBooking, TPutBooking } from "@/server/db/types";
import { sendBookingConfirmationEmail } from "@/server/services/emails/send-booking-confirmation-email";
import { checkCapacityByService } from "./check-capacity-by-service";
import { checkIfExists } from "./check-if-exists";
import { checkIfIsOpen } from "./check-if-is-open";
import { checkRateLimit } from "./check-rate-limit";
import { checkGuestsLimit, getSettings } from "./check-settings";
import { getExceptions, getWeekly } from "./schedule";

export class SendEmailError extends Error {
  constructor(cause: ErrorResponse) {
    super(
      `Une erreur est survenue lors de l'envoi de l'email de confirmation.`,
    );
    this.cause = cause;
    this.name = "SendEmailError";
  }
}

type CreateBookingInput = Omit<TPutBooking, "email" | "phone"> & {
  email: string;
  phone: string;
};

type SelectBooking = Omit<TBooking, "email" | "phone"> & {
  email: string;
  phone: string;
};

export const getEffectiveSchedule = (db: DB, date: Temporal.PlainDate) =>
  safeTry(async function* () {
    const weekly = yield* getWeekly(db);
    const exceptions = yield* getExceptions(db);
    const effective = effectiveScheduleForDate(date, weekly, exceptions);
    return okAsync(effective);
  });

// Infered TS type is incorrect but all the errors will be returned and thrown by the route handler
export const createBooking = (
  db: DB,
  input: CreateBookingInput,
  ipAddress: string | undefined,
) =>
  safeTry(async function* () {
    yield* checkRateLimit(ipAddress, input.email);
    yield* checkIfExists(db, input.email, input.phone, input.date, input.time);
    const settings = yield* getSettings(db);
    yield* checkGuestsLimit(settings.maxGuestsPerBooking, input.guests);
    const effective = yield* getEffectiveSchedule(db, input.date);
    yield* checkIfIsOpen(input.date, input.time, effective);
    yield* checkCapacityByService(
      db,
      input.date,
      input.time,
      effective,
      input.guests,
    );
    const [booking] = yield* safeDrizzleQuery(
      db.insert(bookingsTable).values(input).returning() as Promise<
        SelectBooking[]
      >,
    );
    // TODO : check capacity by slot (15 minutes or 1 hour)
    yield* sendBookingConfirmationEmail({
      name: booking.name,
      date: new Date(
        Temporal.PlainDate.from(input.date).toZonedDateTime({
          timeZone: TIMEZONE,
          plainTime: Temporal.PlainTime.from(input.time),
        }).epochMilliseconds,
      ),
      guests: booking.guests,
      reservationId: booking.id,
      email: booking.email,
      phone: booking.phone,
      notes: booking.notes ?? undefined,
    });
    // Todo increment rate limit counter
    return okAsync();
  });
