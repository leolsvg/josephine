"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTRPC } from "@/lib/trpc/react";
import { DateFormat } from "@/lib/utils";
import { SubTable } from "./weekly-card";

export function ExceptionsCard() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.schedule.getExceptions.queryOptions());
  const [closedDays, setClosedDays] = useState<Record<number, boolean>>({});
  const toggleDay = (day: number) => {
    setClosedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };
  const hasExceptions = data.length > 0;
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
      <Table>
        <TableBody>
          {hasExceptions ? (
            data.map((e, i) => {
              const hasPeriods = e.periods.length > 0;
              return (
                <>
                  <TableRow key={crypto.randomUUID()} className="bg-muted/50">
                    <TableCell>
                      <div className="flex justify-between items-center">
                        {hasPeriods ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleDay(i)}
                          >
                            {closedDays[i] ? (
                              <ChevronRight className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </Button>
                        ) : (
                          <div />
                        )}
                        <div className="font-bold">
                          Du {DateFormat.format(e.from)}
                          {e.to && ` au ${DateFormat.format(e.to)}`}
                          {!hasPeriods && " (fermé)"}
                        </div>
                        <div />
                        {/* <Button variant="ghost" size="icon">
                        <Plus className="size-4" />
                      </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                  {!closedDays[i] && hasPeriods && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <SubTable periods={e.periods} />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="text-center">Aucune exception</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
