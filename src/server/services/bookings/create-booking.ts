import { ok } from "neverthrow";
import type { ErrorResponse } from "resend";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { TIMEZONE } from "@/lib/utils";
import type { DB } from "@/server/db";
import { bookingsTable } from "@/server/db/schema";
import type { TBooking, TPutBooking } from "@/server/db/types";
import { sendBookingConfirmationEmail } from "@/server/services/emails/send-booking-confirmation-email";
import { checkIfExists } from "./check-if-exists";
import { checkIfIsOpen } from "./check-if-is-open";
import {
  checkCapacitySlot,
  checkGuestsLimit,
  getSettings,
} from "./check-settings";

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

export function createBooking(db: DB, input: CreateBookingInput) {
  return checkIfExists(db, input.email, input.phone, input.date, input.time)
    .andThen(() => checkIfIsOpen(db, input.date, input.time))
    .andThen(() => checkGuestsLimit(getSettings(db), input.guests))
    .andThen(() => checkCapacitySlot(db, input.date, input.time, input.guests))
    .andThen(() =>
      safeDrizzleQuery(
        db.insert(bookingsTable).values(input).returning() as Promise<
          SelectBooking[]
        >,
      ),
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
}
