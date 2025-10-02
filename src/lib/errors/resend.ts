import type { ErrorResponse } from "resend";

export class ResendUnknownError extends Error {
  constructor(cause: unknown) {
    super("Une erreur inconnue est survenue avec Resend.");
    this.name = "ResendUnknownError";
    if (cause instanceof Error) {
      this.cause = cause;
    }
  }
}

export class ResendSendError extends Error {
  constructor(cause: ErrorResponse) {
    super(
      "Votre réservation est confirmée, mais nous n'avons pas pu envoyer le mail de confirmation.",
    );
    this.name = "ResendSendError";
    this.cause = cause;
  }
}
