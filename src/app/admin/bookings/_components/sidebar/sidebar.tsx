"use client";

import { Calendar } from "./calendar";
import { Filters } from "./filters";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-2 md:w-100 w-full">
      <Filters />
      <div className="flex justify-center">
        <Calendar />
      </div>
    </div>
  );
}
