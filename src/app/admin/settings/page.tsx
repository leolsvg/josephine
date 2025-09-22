import { CapacityCard } from "./capacity-card";
import { ExceptionsCard } from "./exceptions-card";
import { WeeklyCard } from "./weekly-card";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex gap-3 items-start">
      <WeeklyCard />
      <ExceptionsCard />
      <CapacityCard />
    </div>
  );
}
