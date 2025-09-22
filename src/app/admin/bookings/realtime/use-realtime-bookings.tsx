"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTRPC } from "@/lib/trpc/react";
import type { TBooking } from "@/server/db/types";

export function useRealtimeBookings() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (payload) => {
          queryClient.cancelQueries({ queryKey: trpc.bookings.get.queryKey() });
          queryClient.setQueryData(trpc.bookings.get.queryKey(), (current) => {
            switch (payload.eventType) {
              case "INSERT":
                return current
                  ? [...current, payload.new as TBooking]
                  : undefined;

              case "UPDATE":
                return current?.map((item) =>
                  item.id === payload.new.id ? (payload.new as TBooking) : item,
                );

              case "DELETE":
                return current?.filter((item) => item.id !== payload.old.id);

              default:
                return current;
            }
          });
        },
      );
    supabase.realtime.setAuth().then(() => {
      channel.subscribe();
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, trpc]);
  return useSuspenseQuery(trpc.bookings.get.queryOptions());
}
