"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTRPC } from "@/lib/trpc/react";
import { SId } from "@/lib/utils";
import {
  SRealtimeBooking,
  type TBooking,
  type TRealtimeBooking,
} from "@/server/db/types";

function realtimeToBooking(booking: TRealtimeBooking): TBooking {
  return {
    ...booking,
    date: Temporal.PlainDate.from(booking.date),
    time: Temporal.PlainTime.from(booking.time),
    createdAt: new Date(booking.created_at),
    updatedAt: new Date(booking.updated_at),
  };
}

function insertBooking(current: TBooking[] | undefined, raw: unknown) {
  const { success, data } = SRealtimeBooking.safeParse(raw);
  if (current && success) return [...current, realtimeToBooking(data)];
  return current;
}

function updateBooking(current: TBooking[] | undefined, raw: unknown) {
  const { success, data } = SRealtimeBooking.safeParse(raw);
  if (current && success)
    return current.map((item) =>
      item.id === data.id ? realtimeToBooking(data) : item,
    );
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
