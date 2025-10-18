import { sql, sum } from "drizzle-orm";
import { err, okAsync, safeTry } from "neverthrow";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import type { DB } from "@/server/db";
import { bookingsTable } from "@/server/db/schema";
import type { TimeRange } from "../../db/types";
import { getSettings } from "./check-settings";

export class MaxCapacityServiceError extends Error {
  constructor() {
    super("Le restaurant est complet pour le service sélectionné.");
    this.name = "MaxCapacityServiceError";
  }
}

export class NoServiceError extends Error {
  constructor() {
    super("Le restaurant est fermé pour la date sélectionnée.");
    this.name = "NoServiceError";
  }
}

export const checkCapacityByService = (
  db: DB,
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
  effective: TimeRange[],
  guests: number,
) =>
  safeTry(async function* () {
    const service = effective.find(
      (p) =>
        Temporal.PlainTime.compare(p.start, time) <= 0 &&
        Temporal.PlainTime.compare(p.end, time) > 0,
    );
    if (!service) return err(new NoServiceError());

    const settings = yield* getSettings(db);

    const [result] = yield* safeDrizzleQuery(
      db
        .select({ count: sum(bookingsTable.guests) })
        .from(bookingsTable)
        .where(sql`
        ${bookingsTable.date} = ${date.toString()} 
        AND ${bookingsTable.time} >= ${service.start.toString({ fractionalSecondDigits: 0 })}::time
        AND ${bookingsTable.time} < ${service.end.toString({ fractionalSecondDigits: 0 })}::time
        `),
    );

    return Number(result.count) + guests <= settings.maxCapacityPerService
      ? okAsync()
      : err(new MaxCapacityServiceError());
  });
