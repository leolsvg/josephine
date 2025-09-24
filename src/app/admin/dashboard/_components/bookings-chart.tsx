"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTRPC } from "@/lib/trpc/react";
import { useQuery } from "@tanstack/react-query";

export const description = "A simple area chart";

// const chartData = [
//   { month: "January", bookings: 120 },
//   { month: "February", bookings: 305 },
//   { month: "March", bookings: 237 },
//   { month: "April", bookings: 73 },
//   { month: "May", bookings: 209 },
//   { month: "June", bookings: 214 },
// ];

const chartConfig = {
  total: {
    label: "Réservations",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function BookingsChart() {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.dashboard.get.queryOptions()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réservations</CardTitle>
        <CardDescription>
          Courbe de réservations sur les six derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 24, left: 12, right: 12, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={34}
              allowDecimals={false}
              domain={[
                0,
                (dataMax: number) => Math.ceil((dataMax + 1) / 5) * 5, // arrondi au 5 supérieur
                // ou: (dataMax) => dataMax + 5
              ]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="monotone"
              fill="var(--color-total)"
              fillOpacity={0.4}
              stroke="var(--color-total)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
