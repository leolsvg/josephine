"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTRPC } from "@/lib/trpc/react";
import { DayConfig } from "@/lib/utils";
import { SubTable } from "./sub-table";

export function WeeklyTable() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.schedule.getWeekly.queryOptions());
  const [closedDays, setClosedDays] = useState<Record<number, boolean>>({});
  const toggleDay = (day: number) => {
    setClosedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };
  return (
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
  );
}
