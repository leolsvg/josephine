import { TIMEZONE } from "@/lib/utils";
import type { HM } from "@/server/db/types";

/**
 * Generate an array of time slots between a start and end time.
 *
 * @param start - The start time in "HH:mm" format (inclusive).
 * @param end - The end time in "HH:mm" format (exclusive).
 * @param [intervalMinutes=15] - The interval in minutes between slots.
 * @returns An array of time slots as strings in "HH:mm" format.
 *
 * @example
 * // Generate 15-minute slots between 12:30 and 13:30
 * generateSlots("12:30", "13:30");
 * // Returns: ["12:30", "12:45", "13:00", "13:15"]
 */
export function generateSlots(start: HM, end: HM, intervalMinutes = 15): HM[] {
  const slots: HM[] = [];
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  let current = new Temporal.PlainTime(startH, startM);
  const endTime = new Temporal.PlainTime(endH, endM);

  while (Temporal.PlainTime.compare(current, endTime) < 0) {
    if (isFuture(current)) slots.push(current.toString() as HM);
    current = current.add({ minutes: intervalMinutes });
  }
  return slots;
}

function isFuture(time: Temporal.PlainTime) {
  const now = Temporal.Now.plainTimeISO(TIMEZONE);
  return Temporal.PlainTime.compare(time, now) >= 0;
}
