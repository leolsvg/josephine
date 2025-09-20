"use client";

import type { TBooking } from "@/server/db/types";
import { columns } from "../data-table/columns";
import { DataTable } from "../data-table/data-table";
import { useRealtimeBookings } from "./use-realtime-bookings";

export default function RealtimeBookings({
  bookings: initialBookings,
}: {
  bookings: TBooking[];
}) {
  const bookings = useRealtimeBookings(initialBookings);

  return <DataTable className="grow" columns={columns} data={bookings} />;
}
