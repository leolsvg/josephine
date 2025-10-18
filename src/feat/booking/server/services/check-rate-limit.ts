import { Ratelimit } from "@upstash/ratelimit";
import { errAsync, fromPromise, okAsync, safeTry } from "neverthrow";
import { env } from "@/lib/env";
import { redis } from "@/lib/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "3 m"),
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
  safeTry(async function* () {
    if (env.NODE_ENV === "development") {
      console.warn("Skipping rate limit in development");
      return okAsync();
    }
    const { success } = yield* fromPromise(
      ratelimit.limit(ip ?? email),
      (e) => new RateLimitError(e),
    );
    return success ? okAsync(success) : errAsync(new BookingRateLimitError());
  });
