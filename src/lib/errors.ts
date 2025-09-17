import { TRPCError } from "@trpc/server";

export const DUPLICATE_BOOKING_ERROR = new TRPCError({
  code: "CONFLICT",
  message:
    "Vous avez déjà une réservation à cette date. Si vous souhaitez la modifier, merci de nous contacter.",
});

export const TEST_ERROR = new TRPCError({
  code: "INTERNAL_SERVER_ERROR",
  message: "Erreur de test.",
});

export const INTERNAL_SERVER_ERROR = (error?: unknown) =>
  new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Une erreur inconnue est survenue.",
    cause: error,
  });

export const SEND_EMAIL_ERROR = (error: string) =>
  new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message:
      "Une erreur est survenue lors de l'envoi de l'email de confirmation.",
    cause: error,
  });

export const CLOSED_ERROR = (date: string, time: string, error?: unknown) =>
  new TRPCError({
    code: "FORBIDDEN",
    message: `Le restaurant est fermé le ${date} à ${time}`,
    cause: error,
  });
