"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { TBooking } from "@/server/db/types";

export function useRealtimeBookings(initialBookings: TBooking[]) {
  const [bookings, setBookings] = useState(initialBookings);
  useEffect(() => {
    const channel = supabase
      .channel("bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (p) => {
          setBookings((current) => {
            switch (p.eventType) {
              case "INSERT":
                return [...current, p.new as TBooking];

              case "UPDATE":
                return current.map((item) =>
                  item.id === p.new.id ? (p.new as TBooking) : item,
                );

              case "DELETE":
                return current.filter((item) => item.id !== p.old.id);

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
  }, []);
  return bookings;
}
