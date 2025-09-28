import { fromPromise } from "neverthrow";

export class DrizzleQueryError extends Error {
  constructor(cause: unknown) {
    super("Une erreur est survenue avec la base de données.");
    this.name = "DrizzleQueryError";
    this.cause = cause;
  }
}

export const safeDrizzleQuery = <T>(query: Promise<T>) =>
  fromPromise(query, (e) => new DrizzleQueryError(e));
