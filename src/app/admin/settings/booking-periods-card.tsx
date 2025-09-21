"use client";

import { useQuery } from "@tanstack/react-query";
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

export default function BookingPeriodsCard() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.schedule.getWeekly.queryOptions());
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});
  const toggleDay = (day: string) => {
    setClosedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };
  if (!data) return "error";
  return (
    <Card className="pb-0 min-w-100">
      <CardHeader>
        <CardTitle>Périodes de réservation</CardTitle>
        <CardDescription>
          Modifier, ajouter ou supprimer des créneaux de réservation
        </CardDescription>
      </CardHeader>
      <Table>
        <TableBody>
          {Object.entries(data).map(([day, periods]) => (
            <>
              <TableRow key={day} className="bg-muted/50">
                <TableCell>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleDay(day)}
                    >
                      {closedDays[day] ? (
                        <ChevronRight className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                    <div className="font-bold">{DayConfig[day].label}</div>
                    <Button variant="ghost" size="icon">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {!closedDays[day] && <SubTable periods={periods} />}
            </>
          ))}
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
              <Input type="time" value={p.start} />
            </TableCell>
            <TableCell>
              <Input type="time" value={p.end} />
            </TableCell>
            <TableCell className="w-0">
              <Button variant="ghost" size="icon">
                <Trash className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
