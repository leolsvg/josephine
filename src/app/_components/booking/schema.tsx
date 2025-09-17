import z from "zod";

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 5;

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
      "Nos réservations en ligne sont limitées à 5 personnes. Pour un groupe plus large, merci de nous contacter directement.",
    ),
  date: z.iso.date("Merci de choisir une date valide pour votre réservation."),
  time: z.iso.time("Merci d'indiquer l'heure de votre réservation."),
  note: z.string().optional(),
});

export type TBooking = z.infer<typeof SBooking>;
