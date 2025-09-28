"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTRPC } from "@/lib/trpc/react";
import type { TStatus } from "@/server/db/types";
import { useDateFilter } from "../data-table/hooks/use-date-filter";
import { EStatusConfig } from "../data-table/status-badge";

const chartConfig = {
  ...EStatusConfig,
  none: {
    label: "Aucune",
    color: "var(--secondary)",
  },
} as const;

const emptyChartData = [{ status: "none", bookings: 1 } as const];

const defaultBookingCounts = {
  pending: 0,
  present: 0,
  absent: 0,
  canceled: 0,
};

export function StatusPieChart() {
  const { date } = useDateFilter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.bookings.get.queryOptions());

  const filtered = useMemo(() => {
    if (!date) return data;
    return data.filter((b) => b.date.toString() === date);
  }, [data, date]);

  const chartData = useMemo(() => {
    const counts = filtered.reduce((acc, b) => {
      acc[b.status] = acc[b.status] + 1;
      return acc;
    }, structuredClone(defaultBookingCounts));
    if (
      counts.absent === defaultBookingCounts.absent &&
      counts.canceled === defaultBookingCounts.canceled &&
      counts.pending === defaultBookingCounts.pending &&
      counts.present === defaultBookingCounts.present
    )
      return emptyChartData;
    return (Object.keys(counts) as TStatus[]).map((status) => ({
      status,
      bookings: counts[status],
      fill: `var(--color-${status})`,
    }));
  }, [filtered]);

  const hasData = chartData[0].status !== "none";

  const totalBookings = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.bookings, 0),
    [chartData],
  );

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          {hasData && (
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          )}
          <Pie
            data={chartData}
            dataKey="bookings"
            nameKey="status"
            innerRadius={60}
            label={hasData}
          >
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
                        {hasData ? totalBookings : 0}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Réservation{(!hasData || totalBookings !== 1) && "s"}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
