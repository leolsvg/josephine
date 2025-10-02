import ical, { ICalCalendarMethod } from "ical-generator";
import { Josephine } from "@/lib/josephine";
import { toZdt } from "@/lib/utils/date";

export function createIcsAttachment(
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
