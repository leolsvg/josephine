import { Suspense } from "react";
import { caller } from "@/lib/trpc/server";
import RealtimeBookings from "./realtime/realtime-bookings";
import { Sidebar } from "./sidebar";

export default async function BookingsPage() {
  const bookings = await caller.bookings.get();
  return (
    <div className="flex gap-3">
      <Suspense>
        <Sidebar />
        <RealtimeBookings bookings={bookings} />
      </Suspense>
    </div>
  );
}
