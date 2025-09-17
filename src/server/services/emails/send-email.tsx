import { addHours } from "date-fns";
import ical, { ICalCalendarMethod } from "ical-generator";
import { BookingConfirmationEmail } from "@/components/booking-confirmation-email";
import { Josephine } from "@/lib/josephine";
import { resend } from "@/lib/resend";

function createIcsAttachment(
  date: Date,
  reservationId: number,
  guests: number,
) {
  const end = addHours(date, 2);
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

export async function sendBooking({
  name,
  reservationId,
  guests,
  date,
  email,
  phone,
  notes,
}: Test) {
  return await resend.emails.send({
    from: `Restaurant Joséphine <${Josephine.noreply}>`,
    to: email,
    subject: `Restaurant Joséphine — Réservation`,
    react: (
      <BookingConfirmationEmail
        name={name}
        reservationId={reservationId}
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
  });
}
