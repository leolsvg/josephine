import { errAsync, okAsync, safeTry } from "neverthrow";
import type { DB } from "@/server/db";
import { isDateTimeOpen } from "../utils/schedule";
import { getExceptions, getWeekly } from "./schedule";

export class ClosedError extends Error {
  constructor(date: string, time: string) {
    super(`Le restaurant est fermé le ${date} à ${time}`);
    this.name = "ClosedError";
  }
}

export const checkIfIsOpen = (
  db: DB,
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
) =>
  safeTry(async function* () {
    const w = yield* getWeekly(db);
    const e = yield* getExceptions(db);
    const open = isDateTimeOpen(date, time, w, e);
    if (!open)
      return errAsync(new ClosedError(date.toString(), time.toString()));
    return okAsync();
  });
