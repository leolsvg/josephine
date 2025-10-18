import z from "zod";
import { bookingStatuses } from "../db/types";

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;
export const MAX_NOTES_LENGTH = 500;

const SGuests = z
  .number({
    error: "Merci d'indiquer pour combien de personnes vous réservez.",
  })
  .min(MIN_GUESTS, "La réservation doit concerner au moins une personne.");

const SPhone = z.e164("Merci d'indiquer un numéro de téléphone valide.");

const SEmail = z.email(
  "L'adresse e-mail ne semble pas valide. Vérifiez qu'elle contient bien un « @ ».",
);

export const SBooking = z.object({
  name: z
    .string({
      error:
        "Merci d'indiquer votre nom afin que nous puissions vous identifier.",
    })
    .min(
      1,
      "Merci d'indiquer votre nom afin que nous puissions vous identifier.",
    ),
  email: SEmail,
  phone: SPhone,
  guests: SGuests.max(
    MAX_GUESTS,
    `Nos réservations en ligne sont limitées à ${MAX_GUESTS} personnes. Pour un groupe plus large, merci de nous contacter directement.`,
  ),
  date: z.custom<Temporal.PlainDate>(
    (data) => data instanceof Temporal.PlainDate,
    "Merci de choisir une date valide pour votre réservation.",
  ),
  time: z.custom<Temporal.PlainTime>(
    (data) => data instanceof Temporal.PlainTime,
    "Merci d'indiquer l'heure de votre réservation.",
  ),
  // date: z.instanceof(Temporal.PlainDate, {
  //   error: "Merci de choisir une date valide pour votre réservation.",
  // }),
  // time: z.instanceof(Temporal.PlainTime, {
  //   error: "Merci d'indiquer l'heure de votre réservation.",
  // }),
  notes: z
    .string()
    .trim()
    .max(
      MAX_NOTES_LENGTH,
      `Les notes ne peuvent pas dépasser ${MAX_NOTES_LENGTH} caractères.`,
    )
    .nullish(),
});

export type TFormBooking = z.infer<typeof SBooking>;

export const SBookingAdminPut = SBooking.extend({
  phone: z.union([z.literal(""), SPhone]),
  email: z.union([z.literal(""), SEmail]),
  guests: SGuests,
  status: z.enum(bookingStatuses).optional(),
  table: z.number().nullish(),
});

export type TAdminFormBooking = z.infer<typeof SBookingAdminPut>;

export const SBookingAdminPatch = SBookingAdminPut.partial();
