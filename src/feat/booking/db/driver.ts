import { customType } from "drizzle-orm/pg-core";
import type { TimeRange } from "./types";

type TDriverPeriods = { start: string; end: string }[];

export const periods = customType<{
  data: TimeRange[];
  driverData: TDriverPeriods;
}>({
  dataType() {
    return "jsonb";
  },
  fromDriver(dbValue: TDriverPeriods): TimeRange[] {
    return dbValue.map((p) => ({
      start: Temporal.PlainTime.from(p.start),
      end: Temporal.PlainTime.from(p.end),
    }));
  },
  toDriver(appValue: TimeRange[]): TDriverPeriods {
    return appValue.map((p) => ({
      start: p.start.toString(),
      end: p.end.toString(),
    }));
  },
});

export const temporalDate = customType<{
  data: Temporal.PlainDate;
  driverData: string;
}>({
  dataType() {
    return "date";
  },
  fromDriver(dbValue: string): Temporal.PlainDate {
    return Temporal.PlainDate.from(dbValue);
  },
  toDriver(appValue: Temporal.PlainDate): string {
    return appValue.toString();
  },
});

export const temporalTime = customType<{
  data: Temporal.PlainTime;
  driverData: string;
}>({
  dataType() {
    return "time";
  },
  fromDriver(dbValue: string): Temporal.PlainTime {
    return Temporal.PlainTime.from(dbValue);
  },
  toDriver(appValue: Temporal.PlainTime): string {
    return appValue.toString();
  },
});
