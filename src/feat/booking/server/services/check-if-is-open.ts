import { errAsync, okAsync, type ResultAsync } from "neverthrow";
import { isDateTimeOpen } from "@/feat/booking/utils/schedule";
import type { TimeRange } from "../../db/types";

export class ClosedError extends Error {
  constructor(date: string, time: string) {
    super(`Le restaurant est fermé le ${date} à ${time}`);
    this.name = "ClosedError";
  }
}

export const checkIfIsOpen = (
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
  effective: TimeRange[],
): ResultAsync<void, ClosedError> => {
  const open = isDateTimeOpen(date, time, effective);
  if (!open) return errAsync(new ClosedError(date.toString(), time.toString()));
  return okAsync();
};
