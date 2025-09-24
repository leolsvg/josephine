"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import z from "zod";
import { TIMEZONE } from "@/lib/utils";

const SDate = z.iso.date();

export function useBookingsDate() {
  const todayTemporal = Temporal.Now.zonedDateTimeISO(TIMEZONE).toPlainDate();
  const tomorrowTemporal = todayTemporal.add({ days: 1 });
  const [date, setDate] = useQueryState(
    "date",
    parseAsString.withDefault(todayTemporal.toString()),
  );

  const { success, data } = useMemo(() => SDate.safeParse(date), [date]);

  function prevDay() {
    if (success) {
      const prev = Temporal.PlainDate.from(data).subtract({ days: 1 });
      setDate(prev.toString());
    }
  }

  function nextDay() {
    if (success) {
      const next = Temporal.PlainDate.from(data).add({ days: 1 });
      setDate(next.toString());
    }
  }

  function all() {
    setDate("ALL");
  }

  function today() {
    setDate(todayTemporal.toString());
  }

  function tomorrow() {
    setDate(tomorrowTemporal.toString());
  }

  const isToday = success && data === todayTemporal.toString();
  const isTomorrow = success && data === tomorrowTemporal.toString();

  return {
    today,
    tomorrow,
    date: data,
    prevDay,
    nextDay,
    all,
    isToday,
    isTomorrow,
    setDate,
  };
}
