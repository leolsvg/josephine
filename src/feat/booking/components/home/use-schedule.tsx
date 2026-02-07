"use client";

import { useTRPC } from "@/lib/trpc/react";
import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSchedule() {
  const trpc = useTRPC();
  const [{ data: weekly }, { data: exceptions }] = useSuspenseQueries({
    queries: [
      trpc.schedule.getWeekly.queryOptions(),
      trpc.schedule.getExceptions.queryOptions(),
    ],
  });
  return { weekly, exceptions };
}

export function usePrefetchSchedule() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // Preload weekly and exceptions client side (ssr would make home page dynamic)
  useEffect(() => {
    queryClient.prefetchQuery(trpc.schedule.getWeekly.queryOptions());
    queryClient.prefetchQuery(trpc.schedule.getExceptions.queryOptions());
  }, [queryClient, trpc]);
}
