"use client";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/react";

export function useSchedule() {
  const trpc = useTRPC();
  const [{ data: weekly }, { data: exceptions }, { data: settings }] =
    useSuspenseQueries({
      queries: [
        trpc.schedule.getWeekly.queryOptions(),
        trpc.schedule.getExceptions.queryOptions(),
        trpc.settings.getPublic.queryOptions(),
      ],
    });
  return { weekly, exceptions, settings };
}
