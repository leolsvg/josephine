import { ok, type ResultAsync } from "neverthrow";
import type { ErrorResponse } from "resend";
import { type DrizzleQueryError, safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { ResendSendError, ResendUnknownError } from "@/lib/errors/resend";
import { TIMEZONE } from "@/lib/utils";
import type { DB } from "@/server/db";
import { bookingsTable } from "@/server/db/schema";
import type { TPutBooking } from "@/server/db/types";
import { sendBookingConfirmationEmail } from "@/server/services/emails/send-booking-confirmation-email";
import { checkIfExists, type DuplicateBookingError } from "./check-if-exists";
import { type ClosedError, checkIfIsOpen } from "./check-if-is-open";
import { checkCapacitySlot, checkGuestsLimit } from "./check-settings";

export class SendEmailError extends Error {
  constructor(cause: ErrorResponse) {
    super(
      `Une erreur est survenue lors de l'envoi de l'email de confirmation.`,
    );
    this.cause = cause;
    this.name = "SendEmailError";
  }
}

export const createBooking = (
  db: DB,
  input: TPutBooking,
): ResultAsync<
  void,
  | DrizzleQueryError
  | DuplicateBookingError
  | ClosedError
  | ResendUnknownError
  | ResendSendError
> =>
  checkIfExists(db, input.email, input.phone, input.date, input.time)
    .andThen(() => checkIfIsOpen(db, input.date, input.time))
    .andThen(() => checkGuestsLimit(db, input.guests))
    .andThen(() => checkCapacitySlot(db, input.date, input.time, input.guests))
    .andThen(() =>
      safeDrizzleQuery(db.insert(bookingsTable).values(input).returning()),
    )
    .andThen(([booking]) =>
      sendBookingConfirmationEmail({
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
      }),
    )
    .andThen(() => ok());
