import { Suspense } from "react";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExceptionsTable } from "./exceptions-table";

export function ExceptionsCard() {
  return (
    <Card className="pb-0  min-w-100 grow overflow-hidden">
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
      <Suspense fallback={<PendingFormData />}>
        <ExceptionsTable />
      </Suspense>
    </Card>
  );
}
