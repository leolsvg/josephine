import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";
import { BookingsAreaChart } from "./_components/bookings-area-chart";
import { StatusPieChart } from "./bookings/_components/sidebar/status-pie-chart";

export default function DashboardPage() {
  const queryClient = createQueryClient();
  queryClient.prefetchQuery(trpc.bookings.get.queryOptions());
  queryClient.prefetchQuery(
    trpc.statistics.getBookingsByInterval.queryOptions(),
  );
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <p>Bienvenue sur le tableau de bord administrateur.</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <BookingsAreaChart />
        </Suspense>
        <Suspense>
          <StatusPieChart />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
