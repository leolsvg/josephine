import type { TRPCError } from "@trpc/server";
import { errAsync, ok, okAsync, type ResultAsync, safeTry } from "neverthrow";
import type { ErrorResponse } from "resend";
import { type DrizzleQueryError, safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { ResendSendError, ResendUnknownError } from "@/lib/errors/resend";
import { TIMEZONE } from "@/lib/utils";
import type { DB } from "@/server/db";
import { bookingsTable } from "@/server/db/schema";
import type { TPutBooking } from "@/server/db/types";
import { sendBooking } from "@/server/services/emails/send-email";
import { checkIfExists, type DuplicateBookingError } from "./check-if-exists";
import { type ClosedError, checkIfIsOpen } from "./check-if-is-open";

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
    .andThen(() =>
      safeDrizzleQuery(db.insert(bookingsTable).values(input).returning()),
    )
    .andThen(([booking]) =>
      sendBooking({
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
