import "temporal-polyfill/global";
import { describe, expect, it } from "bun:test";
import { TIMEZONE } from "../../../lib/utils";
import type { Exception, Period, Weekly } from "../../db/types";
import {
  atHM,
  generateSlots,
  getPeriodsForDate,
  isDateOpen,
  isOpen,
  isPast,
} from "./utils";

const makeEmptyWeek = (): Weekly =>
  Array.from({ length: 7 }, () => ({ periods: [] as Period[] }));

const setPeriodsForDate = (weekly: Weekly, date: Date, periods: Period[]) => {
  const index =
    Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO(
      TIMEZONE,
    ).dayOfWeek % 7;
  weekly[index] = { periods };
};

const ensureSeconds = (time: string): string => {
  const segments = time.split(":");
  if (segments.length === 1) {
    return `${segments[0]}:00:00`;
  }
  if (segments.length === 2) {
    return `${segments[0]}:${segments[1]}:00`;
  }
  return time;
};

const buildZdtIso = (value: string): string => {
  if (!value.includes("T")) {
    return `${value}T00:00:00[${TIMEZONE}]`;
  }
  const [datePart, timePart = "00:00"] = value.split("T");
  return `${datePart}T${ensureSeconds(timePart)}[${TIMEZONE}]`;
};

const dateFromPlain = (plainDateTime: string): Date => {
  const zdt = Temporal.ZonedDateTime.from(buildZdtIso(plainDateTime));
  return new Date(zdt.epochMilliseconds);
};

describe("isPast", () => {
  it("returns true for dates before today", () => {
    const pastDate = dateFromPlain("2000-01-01T10:00");
    expect(isPast(pastDate)).toBe(true);
  });

  it("returns false for future dates", () => {
    const futureDate = dateFromPlain("2200-01-01T10:00");
    expect(isPast(futureDate)).toBe(false);
  });
});

describe("isDateOpen", () => {
  it("returns true when weekly schedule has periods", () => {
    const weekly = makeEmptyWeek();
    const date = dateFromPlain("2200-06-10T12:00");
    setPeriodsForDate(weekly, date, [{ start: "09:00", end: "17:00" }]);

    expect(isDateOpen(date, weekly, [])).toBe(true);
  });

  it("returns false when day is closed", () => {
    const weekly = makeEmptyWeek();
    const date = dateFromPlain("2200-06-10T12:00");

    expect(isDateOpen(date, weekly, [])).toBe(false);
  });
});

describe("isOpen", () => {
  it("returns true for future datetimes inside an opening period", () => {
    const weekly = makeEmptyWeek();
    const openDate = dateFromPlain("2200-04-15T12:00");
    setPeriodsForDate(weekly, openDate, [{ start: "09:00", end: "17:00" }]);

    const inside = dateFromPlain("2200-04-15T10:30");
    expect(isOpen(inside, weekly, [])).toBe(true);
  });

  it("returns false when outside the opening periods", () => {
    const weekly = makeEmptyWeek();
    const openDate = dateFromPlain("2200-04-15T12:00");
    setPeriodsForDate(weekly, openDate, [{ start: "09:00", end: "17:00" }]);

    const outside = dateFromPlain("2200-04-15T20:00");
    expect(isOpen(outside, weekly, [])).toBe(false);
  });

  it("returns false for datetimes in the past", () => {
    const weekly = makeEmptyWeek();
    const openDate = dateFromPlain("2200-04-15T12:00");
    setPeriodsForDate(weekly, openDate, [{ start: "09:00", end: "17:00" }]);

    const pastDate = dateFromPlain("2000-04-15T10:30");
    expect(isOpen(pastDate, weekly, [])).toBe(false);
  });
});

describe("atHM", () => {
  it("builds a zoned datetime at the requested time", () => {
    const base = dateFromPlain("2200-03-03T00:00");
    const zdt = atHM(base, "18:30:15");

    expect(zdt.toPlainDate().toString()).toBe("2200-03-03");
    expect(zdt.hour).toBe(18);
    expect(zdt.minute).toBe(30);
    expect(zdt.second).toBe(15);
  });

  it("defaults seconds to zero when omitted", () => {
    const base = dateFromPlain("2200-03-03T00:00");
    const zdt = atHM(base, "08:05");

    expect(zdt.second).toBe(0);
  });
});

describe("getPeriodsForDate", () => {
  it("returns weekly periods when no exception matches", () => {
    const weekly = makeEmptyWeek();
    const date = dateFromPlain("2200-02-02T12:00");
    const periods: Period[] = [{ start: "09:00", end: "17:00" }];
    setPeriodsForDate(weekly, date, periods);

    expect(getPeriodsForDate(date, weekly, [])).toEqual(periods);
  });

  it("returns exception periods when date matches", () => {
    const weekly = makeEmptyWeek();
    const date = dateFromPlain("2200-02-02T12:00");
    setPeriodsForDate(weekly, date, [{ start: "09:00", end: "17:00" }]);

    const exception: Exception = {
      from: dateFromPlain("2200-02-02T00:00"),
      to: dateFromPlain("2200-02-02T00:00"),
      periods: [{ start: "10:00", end: "12:00" }],
      note: null,
    };

    expect(getPeriodsForDate(date, weekly, [exception])).toEqual(
      exception.periods,
    );
  });

  it("prefers the last matching exception", () => {
    const weekly = makeEmptyWeek();
    const date = dateFromPlain("2200-02-02T12:00");
    setPeriodsForDate(weekly, date, [{ start: "09:00", end: "17:00" }]);

    const first: Exception = {
      from: dateFromPlain("2200-02-02T00:00"),
      to: null,
      periods: [{ start: "08:00", end: "09:00" }],
      note: null,
    };

    const second: Exception = {
      from: dateFromPlain("2200-02-02T00:00"),
      to: null,
      periods: [{ start: "11:00", end: "13:00" }],
      note: null,
    };

    expect(getPeriodsForDate(date, weekly, [first, second])).toEqual(
      second.periods,
    );
  });
});

describe("generateSlots", () => {
  it("returns an empty list for past dates", () => {
    const weekly = makeEmptyWeek();
    const now = dateFromPlain("2200-02-03T12:00");
    const pastDay = dateFromPlain("2200-02-02T12:00");
    setPeriodsForDate(weekly, pastDay, [{ start: "09:00", end: "10:00" }]);

    expect(
      generateSlots(pastDay, weekly, [], { slotMinutes: 30, now }),
    ).toEqual([]);
  });

  it("starts from the next slot when now is inside a period", () => {
    const weekly = makeEmptyWeek();
    const day = dateFromPlain("2200-02-04T00:00");
    setPeriodsForDate(weekly, day, [{ start: "09:00", end: "10:00" }]);
    const now = dateFromPlain("2200-02-04T09:10");

    expect(generateSlots(day, weekly, [], { slotMinutes: 15, now })).toEqual([
      ["09:15", "09:30", "09:45"],
    ]);
  });

  it("handles periods that cross midnight", () => {
    const weekly = makeEmptyWeek();
    const day = dateFromPlain("2200-05-15T00:00");
    setPeriodsForDate(weekly, day, [{ start: "22:00", end: "02:00" }]);
    const now = dateFromPlain("2200-05-15T18:00");

    expect(generateSlots(day, weekly, [], { slotMinutes: 60, now })).toEqual([
      ["22:00", "23:00", "00:00", "01:00"],
    ]);
  });
});
