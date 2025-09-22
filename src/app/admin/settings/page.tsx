import { Suspense } from "react";
import { CapacityCard } from "./capacity-card";
import { ExceptionsCard } from "./exceptions-card";
import WeeklyCard from "./weekly-card";

export default async function SettingsPage() {
  return (
    <div className="flex gap-3 items-start">
      <Suspense>
        <WeeklyCard />
      </Suspense>
      <Suspense>
        <ExceptionsCard />
      </Suspense>
      <Suspense>
        <CapacityCard />
      </Suspense>
    </div>
  );
}
