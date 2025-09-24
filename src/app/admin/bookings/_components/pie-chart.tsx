"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTRPC } from "@/lib/trpc/react";
import type { TStatus } from "@/server/db/types";
import { useBookingsDate } from "./realtime/use-booking-date";

// ✅ Config couleurs
const chartConfig: Record<TStatus, { label: string; color: string }> = {
  pending: { label: "En attente", color: "#f59e0b" },
  present: { label: "Présent", color: "#22c55e" },
  absent: { label: "Absent", color: "#ef4444" },
  canceled: { label: "Annulée", color: "#6b7280" },
};

export function PieStatus() {
  const { date } = useBookingsDate();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.bookings.get.queryOptions());

  // ✅ Filtrer par jour sélectionné (si `date` est défini)
  const filtered = useMemo(() => {
    if (!date) return data;
    return data.filter((b) => b.date === date);
  }, [data, date]);

  const chartData = useMemo(() => {
    const counts: Record<TStatus, number> = {
      pending: 0,
      present: 0,
      absent: 0,
      canceled: 0,
    };
    for (const b of filtered) counts[b.status] += 1;
    return (Object.keys(counts) as TStatus[]).map((statut) => ({
      statut,
      visitors: counts[statut],
    }));
  }, [filtered]);

  const totalVisitors = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.visitors, 0),
    [chartData],
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Réservations</CardTitle>
        <CardDescription>Répartition par statut</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="statut"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.statut}
                  fill={chartConfig[entry.statut].color}
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Réservations
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {chartData.map((entry) => (
            <div key={entry.statut} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block size-3 rounded-sm"
                style={{ backgroundColor: chartConfig[entry.statut].color }}
              />
              <span>{chartConfig[entry.statut].label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
