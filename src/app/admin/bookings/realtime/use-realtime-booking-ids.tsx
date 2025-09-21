import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useRealtimeBookingIds() {
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());

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
            setHighlightedIds((prev) => new Set(prev).add(id));
            setTimeout(() => {
              setHighlightedIds((prev) => {
                const copy = new Set(prev);
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
