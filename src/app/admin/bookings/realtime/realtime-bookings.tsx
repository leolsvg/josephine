"use client";

import { formatDate } from "date-fns";
import { useMemo } from "react";
import type { TBooking } from "@/server/db/types";
import { columns } from "../data-table/columns";
import { DataTable } from "../data-table/data-table";
import { useBookingsDate } from "./use-booking-date";
import { useRealtimeBookings } from "./use-realtime-bookings";

export default function RealtimeBookings({
  bookings: initialBookings,
}: {
  bookings: TBooking[];
}) {
  const { date } = useBookingsDate();
  const bookings = useRealtimeBookings(initialBookings);
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    if (!date) return bookings;
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getFullYear() === date.getFullYear() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getDate() === date.getDate()
      );
    });
  }, [bookings, date]);

  return (
    <DataTable
      className="grow"
      columns={columns}
      data={filteredBookings}
      title={date ? formatDate(date, "PPP") : "Toutes les réservations"}
    />
  );
}
