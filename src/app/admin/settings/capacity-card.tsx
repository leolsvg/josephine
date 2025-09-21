"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CapacityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Capacités</CardTitle>
        <CardDescription>
          Définir les limites de capacité pour les réservations, créneaux et
          service global
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="minPersons" className="text-sm font-medium">
            Nombre minimum de personnes :
          </Label>
          <Input id="minPersons" type="number" min="1" className="shadow-sm" />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="maxPersonsPerReservation"
            className="text-sm font-medium"
          >
            Nombre maximum de personnes pour une réservation :
          </Label>
          <Input
            id="maxPersonsPerReservation"
            type="number"
            min="1"
            className="shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxCapacityPerSlot" className="text-sm font-medium">
            Capacité maximum par créneau :
          </Label>
          <Input
            id="maxCapacityPerSlot"
            type="number"
            min="1"
            className="shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxServiceCapacity" className="text-sm font-medium">
            Capacité maximum par service :
          </Label>
          <Input
            id="maxServiceCapacity"
            type="number"
            min="1"
            className="shadow-sm"
          />
        </div>
        <Button>Sauvegarder</Button>
      </CardContent>
    </Card>
  );
}
