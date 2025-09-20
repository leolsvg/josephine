import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useRealtimeBookingIds() {
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const client = createClient();
    const channel = client
      .channel(`bookings-highlights`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (payload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            const id = payload.new["id"];
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
      )
      .subscribe();
    return () => {
      client.removeChannel(channel);
    };
  }, []);

  return highlightedIds;
}
