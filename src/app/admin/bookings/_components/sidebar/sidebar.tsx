"use client";

import { Suspense } from "react";
import { Calendar } from "./calendar";
import { Filters } from "./filters";
import { StatusPieChart } from "./status-pie-chart";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-2 md:w-100 w-full">
      <Filters />
      <div className="flex justify-center">
        <Calendar />
      </div>
      <Suspense>
        <StatusPieChart />
      </Suspense>
    </div>
  );
}
