import { dehydrate, HydrationBoundary } from "@tanstack/
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";
import { WeeklyTable } from "./weekly-table";

export async function WeeklyCard() {
  const queryClient = createQueryClient();

  // On attend que le prefetch soit terminé pour que les données soient prêtes pour l'hydratation
  await queryClient.prefetchQuery(trpc.schedule.getWeekly.queryOptions());

  return (
    <Card className="pb-0 min-w-80 overflow-hidden">
      <CardHeader>
        <CardTitle>Périodes de réservation</CardTitle>
        <CardDescription>
          Ajouter, modifier ou supprimer des jours d'ouverture ou des périodes
          de service hebdomadaires
        </CardDescription>
      </CardHeader>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PendingData />}>
          <WeeklyTable />
        </Suspense>
      </HydrationBoundary>
    </Card>
  );
}
