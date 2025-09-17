// opening-utils.test.ts
import { describe, expect, it } from "bun:test";
import { addDays, startOfDay } from "date-fns";
import {
  atHM,
  type Exception,
  getPeriodsForDate,
  isDateOpen,
  isOpen,
  type Weekly,
} from "./utils";

// Helper: next occurrence of weekday (0=Sun..6=Sat), strictly in the future (>= tomorrow)
function nextWeekday(target: number) {
  const today = startOfDay(new Date());
  for (let i = 1; i <= 14; i++) {
    const d = addDays(today, i);
    if (d.getDay() === target) return d;
  }
  throw new Error("Could not find next weekday within 2 weeks");
}

// Sample weekly schedule: Mon–Tue two services (lunch/dinner). Others closed.
const weekly: Weekly[] = [
  { day: 1, start: "12:00", end: "14:00" }, // Monday lunch
  { day: 1, start: "19:00", end: "22:00" }, // Monday dinner
  { day: 2, start: "12:00", end: "14:00" }, // Tuesday lunch
  { day: 2, start: "19:00", end: "22:00" }, // Tuesday dinner
];

describe("utils: isDateOpen", () => {
  it("closed exception (periods = []) overrides weekly", () => {
    const nextTue = nextWeekday(2);
    const exceptions: Exception[] = [
      { from: nextTue, to: null, periods: [], note: "Closed" },
    ];
    const periods = getPeriodsForDate(nextTue, weekly, exceptions);
    expect(periods).toEqual([]); // fully closed
  });

  it("whitelist exception overrides weekly with provided periods only", () => {
    const nextMon = nextWeekday(1);
    const exceptions: Exception[] = [
      {
        from: nextMon,
        to: null,
        periods: [{ start: "18:00", end: "23:00" }],
        note: "Special evening",
      },
    ];
    const periods = getPeriodsForDate(nextMon, weekly, exceptions);
    expect(periods).toEqual([{ start: "18:00", end: "23:00" }]);
  });

  it("last overlapping exception wins (array order defines priority)", () => {
    const nextMon = nextWeekday(1);
    const exceptions: Exception[] = [
      {
        from: nextMon,
        to: null,
        periods: [{ start: "17:00", end: "20:00" }],
        note: "First rule",
      },
      {
        from: nextMon,
        to: null,
        periods: [{ start: "18:00", end: "21:00" }],
        note: "Second rule (should win)",
      },
    ];
    const periods = getPeriodsForDate(nextMon, weekly, exceptions);
    expect(periods).toEqual([{ start: "18:00", end: "21:00" }]);
  });

  it("date range exception applies inclusively (from..to)", () => {
    const nextTue = nextWeekday(2);
    const dayAfter = addDays(nextTue, 1);
    // Closed on both dates inclusively
    const exceptions: Exception[] = [
      { from: nextTue, to: dayAfter, periods: [], note: "Two-day closure" },
    ];
    expect(getPeriodsForDate(nextTue, weekly, exceptions)).toEqual([]);
    expect(getPeriodsForDate(dayAfter, weekly, exceptions)).toEqual([]);
  });

  it("isDateOpen returns false for past dates even if weekly is open", () => {
    // Pick a Monday in the past (7 days ago and then go back to last Monday)
    const today = startOfDay(new Date());
    let past = addDays(today, -7);
    while (past.getDay() !== 1) past = addDays(past, -1);

    expect(isDateOpen(past, weekly, [])).toBe(false);
  });

  it("isDateOpen returns true for a future weekly-open date (no exception)", () => {
    const nextMon = nextWeekday(1);
    expect(isDateOpen(nextMon, weekly, [])).toBe(true);
  });

  it("isDateOpen returns false when a future date is explicitly closed by exception", () => {
    const nextTue = nextWeekday(2);
    const exceptions: Exception[] = [
      { from: nextTue, to: null, periods: [], note: null },
    ];
    expect(isDateOpen(nextTue, weekly, exceptions)).toBe(false);
  });
  it("isDateOpen returns true for today", () => {
    const today = startOfDay(new Date());
    expect(isDateOpen(today, weekly, [])).toBe(true);
  });
});

describe("utils: isOpen (date + time)", () => {
  it("returns true during a weekly open period (future datetime)", () => {
    const nextMon = nextWeekday(1);
    const dt = atHM(nextMon, "12:30"); // inside 12:00-14:00
    expect(isOpen(dt, weekly, [])).toBe(true);
  });

  it("returns false outside weekly periods (future datetime)", () => {
    const nextMon = nextWeekday(1);
    const dt = atHM(nextMon, "16:00"); // between lunch & dinner
    expect(isOpen(dt, weekly, [])).toBe(false);
  });

  it("returns false for past datetimes even if within an otherwise open period", () => {
    // Choose last Monday at 12:30 (past)
    const today = startOfDay(new Date());
    let lastMon = addDays(today, -1);
    while (lastMon.getDay() !== 1) lastMon = addDays(lastMon, -1);
    const dt = atHM(lastMon, "12:30");
    expect(isOpen(dt, weekly, [])).toBe(false);
  });

  it("honors closed exception (periods = [])", () => {
    const nextTue = nextWeekday(2);
    const dt = atHM(nextTue, "12:30");
    const exceptions: Exception[] = [
      { from: nextTue, to: null, periods: [], note: "Closed" },
    ];
    expect(isOpen(dt, weekly, exceptions)).toBe(false);
  });

  it("honors whitelist exception (only provided periods are open)", () => {
    const nextMon = nextWeekday(1);
    const exceptions: Exception[] = [
      {
        from: nextMon,
        to: null,
        periods: [{ start: "18:00", end: "23:00" }],
        note: "Special night",
      },
    ];
    const inside = atHM(nextMon, "19:30"); // inside override
    const outside = atHM(nextMon, "13:00"); // would be weekly open, but override should win
    expect(isOpen(inside, weekly, exceptions)).toBe(true);
    expect(isOpen(outside, weekly, exceptions)).toBe(false);
  });

  it("is end-exclusive: exactly at end is closed", () => {
    const nextMon = nextWeekday(1);
    const endEdge = atHM(nextMon, "14:00"); // boundary of 12:00-14:00
    expect(isOpen(endEdge, weekly, [])).toBe(false);
  });

  it("supports cross-midnight periods within the same date (e.g., 18:00 → 01:00 next day)", () => {
    const nextMon = nextWeekday(1);
    const exceptions: Exception[] = [
      {
        from: nextMon,
        to: null,
        periods: [{ start: "18:00", end: "01:00" }],
        note: "NYE-style",
      },
    ];
    const late = atHM(nextMon, "23:30"); // should be open
    const pre = atHM(nextMon, "17:30"); // closed before start
    expect(isOpen(late, weekly, exceptions)).toBe(true);
    expect(isOpen(pre, weekly, exceptions)).toBe(false);
    // NOTE: Checking 00:30 on the *next day* would require looking back at previous day's exception,
    // which the current implementation doesn't do. If you add that feature, add a test for it too.
  });
});
