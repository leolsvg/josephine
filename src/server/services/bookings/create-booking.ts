import { fromPromise } from "neverthrow";
import { TIMEZONE } from "@/lib/utils";
import type { DB } from "@/server/db";
import { bookingsTable } from "@/server/db/schema";
import type { TPutBooking } from "@/server/db/types";
import { sendBooking } from "@/server/services/emails/send-email";
import { INTERNAL_SERVER_ERROR, SEND_EMAIL_ERROR } from "../../../lib/errors";
import { checkIfExists } from "./check-if-exists";
import { checkIfIsOpen } from "./check-if-is-open";

export async function createBooking(db: DB, input: TPutBooking) {
  await checkIfExists(db, input.email, input.phone, input.date, input.time);
  await checkIfIsOpen(db, input.date, input.time);
  db.transaction(async (t) => {
    const result = await fromPromise(
      t.insert(bookingsTable).values(input).returning(),
      (e) => e,
    );
    if (result.isErr()) throw INTERNAL_SERVER_ERROR();
    const [booking] = result.value;
    const { error } = await sendBooking({
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
    if (error) {
      throw SEND_EMAIL_ERROR(error.message);
    }
  });
}
