"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ✅ Typage fort
type Statut = "pending" | "present" | "absent" | "canceled";
type ChartData = { statut: Statut; visitors: number }[];

// ✅ Config couleurs
const chartConfig: Record<Statut, { label: string; color: string }> = {
  pending: { label: "En attente", color: "#f59e0b" }, // amber-500
  present: { label: "Présent", color: "#22c55e" }, // green-500
  absent: { label: "Absent", color: "#ef4444" }, // red-500
  canceled: { label: "Annulée", color: "#6b7280" }, // gray-500
};

function ChartPieDonutText({ data = [] }: { data?: ChartData }) {
  // ✅ évite le crash si data est undefined
  const totalVisitors = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.visitors, 0),
    [data]
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
              data={data}
              dataKey="visitors"
              nameKey="statut"
              innerRadius={60}
              strokeWidth={5}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.statut}
                  fill={chartConfig[entry.statut].color}
                />
              ))}

              {/* Label central */}
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

        {/* ✅ Légende custom */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((entry) => (
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

export default ChartPieDonutText;
