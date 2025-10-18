import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PendingFormData } from "@/components/form/pending-form-data";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/feat/booking/components/admin/bookings/sidebar";
import { Bookings } from "@/feat/booking/components/admin/bookings/table";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";

export default function BookingsPage() {
  const queryClient = createQueryClient();
  queryClient.prefetchQuery(trpc.bookings.get.queryOptions());
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
      <Suspense>
        <Sidebar />
      </Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <Card className="py-0 overflow-hidden grow">
              <PendingFormData />
            </Card>
          }
        >
          <Bookings className="w-full" />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
