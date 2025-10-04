"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTRPC } from "@/lib/trpc/react";
import { SId } from "@/lib/utils";
import { SRealtimeBooking, type TBooking } from "@/server/db/types";

function insertBooking(current: TBooking[] | undefined, raw: unknown) {
  const { success, data } = SRealtimeBooking.safeParse(raw);
  if (success)
    return current
      ? [
          ...current,
          {
            ...data,
            date: Temporal.PlainDate.from(data.date),
            time: Temporal.PlainTime.from(data.time),
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
          },
        ]
      : undefined;
  return current;
}

function updateBooking(current: TBooking[] | undefined, raw: unknown) {
  const { success, data } = SRealtimeBooking.safeParse(raw);
  if (success) current?.map((item) => (item.id === data.id ? data : item));
  return current;
}

function deleteBooking(current: TBooking[] | undefined, raw: unknown) {
  const { success, data } = SId.safeParse(raw);
  if (success) return current?.filter((item) => item.id !== data.id);
  return current;
}

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
          console.log(payload.new);
          queryClient.setQueryData(trpc.bookings.get.queryKey(), (current) => {
            switch (payload.eventType) {
              case "INSERT":
                return insertBooking(current, payload.new);
              case "UPDATE":
                return updateBooking(current, payload.new);
              case "DELETE":
                return deleteBooking(current, payload.old);
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
