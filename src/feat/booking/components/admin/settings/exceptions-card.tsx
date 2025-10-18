import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PendingData } from "@/components/pending-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";
import { ExceptionsTable } from "./exceptions-table";

export function ExceptionsCard() {
  const queryClient = createQueryClient();
  queryClient.prefetchQuery(trpc.schedule.getExceptions.queryOptions());
  return (
    <Card className="pb-0 lg:min-w-100 grow overflow-hidden">
      <CardHeader>
        <CardTitle>Exceptions</CardTitle>
        <CardDescription>
          Ajouter, modifier ou supprimer des périodes de fermeture ou
          d'ouverture exceptionnelles.
        </CardDescription>
        {/* <CardAction>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Ajouter</Button>
            </DialogTrigger>
            <DialogContent>
              <DateRangePicker selected={t} />
            </DialogContent>
          </Dialog>
        </CardAction> */}
      </CardHeader>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PendingData />}>
          <ExceptionsTable />
        </Suspense>
      </HydrationBoundary>
    </Card>
  );
}
