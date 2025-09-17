import { CLOSED_ERROR } from "@/lib/errors";
import type { DB } from "@/server/db";
import { isOpen } from "@/server/services/bookings/utils";
import { getExceptions, getWeekly } from "./schedule";

export async function checkIfIsOpen(db: DB, date: string, time: string) {
  const w = await getWeekly(db);
  const e = await getExceptions(db);
  if (!isOpen(w, e, date, time)) throw CLOSED_ERROR(date, time);
}
