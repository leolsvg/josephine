import z from "zod";
import type { TStatus } from "@/server/db/types";

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;
export const MAX_NOTES_LENGTH = 500;

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
  email: z.email(
    "L'adresse e-mail ne semble pas valide. Vérifiez qu'elle contient bien un « @ ».",
  ),
  phone: z.e164("Merci d'indiquer un numéro de téléphone valide."),
  guests: z
    .number({
      error: "Merci d'indiquer pour combien de personnes vous réservez.",
    })
    .min(MIN_GUESTS, "La réservation doit concerner au moins une personne.")
    .max(
      MAX_GUESTS,
      `Nos réservations en ligne sont limitées à ${MAX_GUESTS} personnes. Pour un groupe plus large, merci de nous contacter directement.`,
    ),
  date: z.instanceof(Temporal.PlainDate, {
    error: "Merci de choisir une date valide pour votre réservation.",
  }),
  time: z.instanceof(Temporal.PlainTime, {
    error: "Merci d'indiquer l'heure de votre réservation.",
  }),
  notes: z
    .string()
    .trim()
    .max(
      MAX_NOTES_LENGTH,
      `Les notes ne peuvent pas dépasser ${MAX_NOTES_LENGTH} caractères.`,
    )
    .optional()
    .nullable(),
});

export type TBooking = z.infer<typeof SBooking>;

export const SBookingAdminPut = SBooking.extend({
  phone: z.union([z.literal(""), SBooking.shape.phone]),
  email: z.union([z.literal(""), SBooking.shape.email]),
  status: z.enum(["absent", "canceled", "pending", "present"] as TStatus[]),
});

export const SBookingAdminPatch = SBookingAdminPut.partial();
