import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PendingData } from "@/components/pending-data";
import { Card } from "@/components/ui/card";
import { AddMenuButton } from "@/feat/menus/components/add-menu-button";
import { MenuTable } from "@/feat/menus/components/menus-table";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";

export default function MenusPage() {
  const queryClient = createQueryClient();
  queryClient.prefetchQuery(trpc.menus.get.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-10">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
            <h2 className="text-xl font-semibold">Menu du midi</h2>
            <AddMenuButton service="midi" />
          </div>
          <Suspense
            fallback={
              <Card>
                <PendingData />
              </Card>
            }
          >
            <MenuTable service="midi" />
          </Suspense>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
            <h2 className="text-xl font-semibold">Menu du soir</h2>
            <AddMenuButton service="soir" />
          </div>
          <Suspense
            fallback={
              <Card>
                <PendingData />
              </Card>
            }
          >
            <MenuTable service="soir" />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}
