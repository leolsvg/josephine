import { Suspense } from "react";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeeklyTable } from "./weekly-table";

export function WeeklyCard() {
  return (
    <Card className="pb-0 min-w-80 overflow-hidden">
      <CardHeader>
        <CardTitle>Périodes de réservation</CardTitle>
        <CardDescription>
          Ajouter, modifier ou supprimer des jours d'ouverture ou des périodes
          de service hebdomadaires
        </CardDescription>
      </CardHeader>
      <Suspense fallback={<PendingFormData />}>
        <WeeklyTable />
      </Suspense>
    </Card>
  );
}
