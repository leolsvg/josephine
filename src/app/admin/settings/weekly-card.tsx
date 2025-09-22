"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTRPC } from "@/lib/trpc/react";
import { DayConfig } from "@/lib/utils";
import type { Period } from "@/server/db/types";

export default function WeeklyCard() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.schedule.getWeekly.queryOptions());
  const [closedDays, setClosedDays] = useState<Record<number, boolean>>({});
  const toggleDay = (day: number) => {
    setClosedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };
  return (
    <Card className="pb-0 min-w-80 overflow-hidden">
      <CardHeader>
        <CardTitle>Périodes de réservation</CardTitle>
        <CardDescription>
          Ajouter, Modifier ou supprimer des jours d'ouverture ou des périodes
          de service
        </CardDescription>
      </CardHeader>
      <Table>
        <TableBody>
          {data.map((w, i) => {
            const hasPeriods = w !== null && w.periods.length > 0;
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
                        {DayConfig[i].label}
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
                      <SubTable periods={w.periods} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

export function SubTable({ periods }: { periods: Period[] }) {
  return (
    <Table>
      <TableBody>
        {periods.map((p) => (
          <TableRow key={p.start}>
            <TableCell>
              <Input type="time" defaultValue={p.start} />
            </TableCell>
            <TableCell>
              <Input type="time" defaultValue={p.end} />
            </TableCell>
            <TableCell className="w-0">
              {/* <Button variant="ghost" size="icon">
                <Trash className="size-4" />
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
