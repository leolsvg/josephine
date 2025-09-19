import { errAsync, okAsync, safeTry } from "neverthrow";
import { TIMEZONE } from "@/lib/utils";
import type { DB } from "@/server/db";
import { isOpen } from "@/server/services/bookings/utils";
import { getExceptions, getWeekly } from "./schedule";

export class ClosedError extends Error {
  constructor(date: string, time: string) {
    super(`Le restaurant est fermé le ${date} à ${time}`);
    this.name = "ClosedError";
  }
}

export const checkIfIsOpen = (db: DB, date: string, time: string) =>
  safeTry(async function* () {
    const w = yield* getWeekly(db);
    const e = yield* getExceptions(db);
    const d = new Date(
      Temporal.PlainDate.from(date).toZonedDateTime({
        timeZone: TIMEZONE,
        plainTime: Temporal.PlainTime.from(time),
      }).epochMilliseconds,
    );
    const open = isOpen(d, w, e);
    if (!open) return errAsync(new ClosedError(date, time));
    return okAsync();
  });
