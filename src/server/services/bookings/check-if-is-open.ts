import { err, errAsync, ok, safeTry } from "neverthrow";
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

const test = (bool: boolean) => (bool ? ok("test") : err("tomper"));

export const checkIfIsOpen = (db: DB, date: string, time: string) =>
  safeTry(async function* () {
    const w = yield* getWeekly(db);
    const e = yield* getExceptions(db);
    const t = yield* test(true);
    const d = new Date(
      Temporal.PlainDate.from(date).toZonedDateTime({
        timeZone: TIMEZONE,
        plainTime: Temporal.PlainTime.from(time),
      }).epochMilliseconds,
    );
    const open = isOpen(d, w, e);
    if (!open) return err(new ClosedError(date, time));
    return ok();
  });

// export async function* checkIfIsOpen(db: DB, date: string, time: string) {
//   const w = yield* getWeekly(db);
//   const e = yield* getExceptions(db);
//   if (
//     !isOpen(
//       new Date(
//         Temporal.PlainDate.from(date).toZonedDateTime({
//           timeZone: TIMEZONE,
//           plainTime: Temporal.PlainTime.from(time),
//         }).epochMilliseconds,
//       ),
//       w,
//       e,
//     )
//   )
//     return err(CLOSED_ERROR(date, time));
//   return ok(undefined);
// }
