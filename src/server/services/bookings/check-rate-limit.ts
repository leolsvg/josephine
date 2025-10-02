import { Ratelimit } from "@upstash/ratelimit";
import { err, fromPromise, ok } from "neverthrow";
import { redis } from "@/lib/redis";

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
});

export class RateLimitError extends Error {
  constructor(cause: unknown) {
    super("Une erreur interne est survenue avec le rate limiter.");
    this.cause = cause;
    this.name = "RateLimitError";
  }
}

export class BookingRateLimitError extends Error {
  constructor() {
    super(
      "Vous avez effectué trop de tentatives de réservation en peu de temps. Veuillez patienter avant de réessayer.",
    );
    this.name = "BookingRateLimitError";
  }
}

export const checkRateLimit = (ip: string | undefined, email: string) =>
  fromPromise(
    ratelimit.limit(ip ?? email),
    (e) => new RateLimitError(e),
  ).andThen(({ success }) =>
    success ? ok() : err(new BookingRateLimitError()),
  );
