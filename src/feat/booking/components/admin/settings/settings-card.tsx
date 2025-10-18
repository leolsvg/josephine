import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createQueryClient } from "@/lib/trpc/query-client";
import { trpc } from "@/lib/trpc/server";
import { SettingsForm } from "./settings-form";

export function SettingsCard() {
  const queryClient = createQueryClient();
  queryClient.prefetchQuery(trpc.settings.get.queryOptions());
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Capacités</CardTitle>
        <CardDescription>
          Configurer les plafonds d'invités par réservation, par créneau et par
          service
        </CardDescription>
      </CardHeader>

      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<PendingFormData />}>
            <SettingsForm />
          </Suspense>
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
