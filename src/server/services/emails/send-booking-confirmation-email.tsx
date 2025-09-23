import ical, { ICalCalendarMethod } from "ical-generator";
import { err, fromPromise, ok } from "neverthrow";
import { BookingConfirmationEmail } from "@/components/booking/booking-confirmation-email";
import { ResendSendError, ResendUnknownError } from "@/lib/errors/resend";
import { Josephine } from "@/lib/josephine";
import { resend } from "@/lib/resend";
import { toZdt } from "@/lib/utils";

function createIcsAttachment(
  date: Date,
  reservationId: number,
  guests: number,
) {
  const end = new Date(
    toZdt(date).add({
      hours: 2,
    }).epochMilliseconds,
  );
  return ical({
    method: ICalCalendarMethod.REQUEST,
    events: [
      {
        start: date,
        end,
        summary: "Réservation - Josephine",
        description: `Réservation #${reservationId} — ${guests} ${
          guests > 1 ? "personnes" : "personne"
        }`,
        location: Josephine.address,
        url: Josephine.website,
      },
    ],
  });
}

interface Test {
  name: string;
  reservationId: number;
  guests: number;
  date: Date;
  email: string;
  phone: string;
  notes?: string;
}

export function sendBookingConfirmationEmail({
  name,
  reservationId,
  guests,
  date,
  email,
  phone,
  notes,
}: Test) {
  return fromPromise(
    resend.emails.send({
      from: `Restaurant Joséphine <${Josephine.noreply}>`,
      to: email,
      subject: `Restaurant Joséphine — Réservation`,
      react: (
        <BookingConfirmationEmail
          name={name}
          date={date}
          guests={guests}
          email={email}
          phone={phone}
          notes={notes}
        />
      ),
      attachments: [
        {
          content: createIcsAttachment(date, reservationId, guests).toString(),
          filename: "invite.ics",
          contentType: 'text/calendar; charset="UTF-8"; method=REQUEST',
        },
      ],
    }),
    (e) => new ResendUnknownError(e),
  ).andThen((r) =>
    r.data === null ? err(new ResendSendError(r.error)) : ok(r.data),
  );
}
