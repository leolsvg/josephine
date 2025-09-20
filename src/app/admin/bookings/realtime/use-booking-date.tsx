"use client";

import { parseAsIsoDateTime, useQueryState } from "nuqs";
import { useMemo } from "react";

export function useBookingsDate() {
  const todayDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const tomorrowDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [date, setDate] = useQueryState("date", parseAsIsoDateTime);

  function prevDay() {
    if (date) {
      const prev = new Date(date);
      prev.setDate(prev.getDate() - 1);
      setDate(prev);
    }
  }

  function nextDay() {
    if (date) {
      const prev = new Date(date);
      prev.setDate(prev.getDate() + 1);
      setDate(prev);
    }
  }

  function reset() {
    setDate(null);
  }

  function today() {
    setDate(todayDate);
  }

  function tomorrow() {
    setDate(tomorrowDate);
  }

  const isToday = date && date.getTime() === todayDate.getTime();
  const isTomorrow = date && date.getTime() === tomorrowDate.getTime();

  return {
    today,
    tomorrow,
    date,
    prevDay,
    nextDay,
    reset,
    isToday,
    isTomorrow,
    setDate,
  };
}
