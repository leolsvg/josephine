"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import z from "zod";
import { TIMEZONE } from "@/lib/utils";

const SDate = z.iso.date();

export function useBookingsDate() {
  const todayTemporal = useMemo(() => {
    return Temporal.Now.zonedDateTimeISO(TIMEZONE).toPlainDate();
  }, []);

  const tomorrowTemporal = useMemo(() => {
    return todayTemporal.add({ days: 1 });
  }, [todayTemporal]);

  const [date, setDate] = useQueryState(
    "date",
    parseAsString.withDefault(todayTemporal.toString()),
  );

  const safeDate = useMemo(() => SDate.safeParse(date).data, [date]);

  useEffect(() => console.log(safeDate, date), [safeDate, date]);

  function prevDay() {
    if (safeDate) {
      const prev = Temporal.PlainDate.from(safeDate).subtract({ days: 1 });
      setDate(prev.toString());
    }
  }

  function nextDay() {
    if (safeDate) {
      const next = Temporal.PlainDate.from(date).add({ days: 1 });
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

  const isToday = safeDate && safeDate === todayTemporal.toString();
  const isTomorrow = safeDate && safeDate === tomorrowTemporal.toString();

  return {
    today,
    tomorrow,
    date: safeDate,
    prevDay,
    nextDay,
    all,
    isToday,
    isTomorrow,
    setDate,
  };
}
