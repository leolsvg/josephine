import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useRealtimeBookingIds() {
  const [highlightedIds, setHighlightedIds] = useState<Map<number, string>>(
    new Map(),
  );

  useEffect(() => {
    const channel = supabase
      .channel(`bookings-highlights`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (payload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            const id = payload.new.id;
            const color =
              payload.eventType === "INSERT"
                ? "animate-bounce"
                : "animate-pulse";

            setHighlightedIds((prev) => {
              const copy = new Map(prev);
              copy.set(id, color);
              return copy;
            });

            setTimeout(() => {
              setHighlightedIds((prev) => {
                const copy = new Map(prev);
                copy.delete(id);
                return copy;
              });
            }, 2000);
          }
        },
      );

    supabase.realtime.setAuth().then(() => {
      channel.subscribe();
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return highlightedIds;
}
