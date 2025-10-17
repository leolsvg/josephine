import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PendingFormData } from "@/components/form/pending-form-data";
import { Card } from "@/components/ui/card";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";
import { Bookings } from "./_components/data-table/bookings";
import { Sidebar } from "./_components/sidebar/sidebar";

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
