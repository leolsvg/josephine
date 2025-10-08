import { Suspense } from "react";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SettingsForm } from "./settings-form";

export function SettingsCard() {
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
        <Suspense fallback={<PendingFormData />}>
          <SettingsForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
