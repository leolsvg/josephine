import type { Query } from "drizzle-orm";
import { fromPromise } from "neverthrow";

export class DrizzleQueryError extends Error {
  constructor(cause: unknown) {
    super("A database query error occurred.");
    this.name = "DrizzleQueryError";
    if (cause instanceof Error) {
      this.cause = cause;
    }
  }
}

export const safeDrizzleQuery = <T>(query: Promise<T>) =>
  fromPromise(query, (e) => new DrizzleQueryError(e));
