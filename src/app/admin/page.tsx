import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { BookingsAreaChart } from "@/feat/booking/components/admin/statistics/bookings-area-chart";
import { StatusPieChart } from "@/feat/booking/components/admin/statistics/status-pie-chart";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";

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
