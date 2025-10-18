import z from "zod";
import { MAX_GUESTS, MIN_GUESTS } from "./booking-schema";

export const SSettings = z.object({
  maxCapacityPerSlot: z.number(),
  maxCapacityPerService: z.number(),
  maxGuestsPerBooking: z
    .number({
      error:
        "Merci d'indiquer le nombre maximum d'invités pour une réservation.",
    })
    .min(
      MIN_GUESTS,
      "Le nombre maximum d'invités pour une réservation doit être supérieur à 1.",
    )
    .max(
      MAX_GUESTS,
      `Le nombre maximum d'invités pour une réservation ne peux pas dépasser ${MAX_GUESTS} personnes.`,
    ),
  bookingEnabled: z.boolean(),
});
