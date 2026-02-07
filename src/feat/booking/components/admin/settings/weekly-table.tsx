"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTRPC } from "@/lib/trpc/react";
import { DayConfig } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { SubTable } from "./sub-table";

export function WeeklyTable() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.schedule.getWeekly.queryOptions());
  const [openedDays, setOpenedDays] = useState<Record<number, boolean>>({});

  const toggleDay = (day: number) => {
    setOpenedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  // Sécurité anti-crash si l'API ne répond pas encore
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <Table>
      <TableBody>
        {data.map((w, i) => {
          const hasPeriods = w !== null && w.length > 0;
          return (
            <React.Fragment key={i}>
              <TableRow className="bg-muted/50">
                <TableCell>
                  <div className="flex justify-between items-center">
                    {hasPeriods ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleDay(i)}
                      >
                        {openedDays[i] ? (
                          <ChevronDown className="size-4" />
                        ) : (
                          <ChevronRight className="size-4" />
                        )}
                      </Button>
                    ) : (
                      <div className="size-9" />
                    )}
                    <div className="font-bold">
                      {DayConfig[i]?.label}
                      {!hasPeriods && " (fermé)"}
                    </div>
                    <div />
                  </div>
                </TableCell>
              </TableRow>
              {openedDays[i] && hasPeriods && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <SubTable periods={w} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}
