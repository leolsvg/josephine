import { CapacityCard } from "./_components/capacity-card";
import { ExceptionsCard } from "./_components/exceptions-card";
import { WeeklyCard } from "./_components/weekly-card";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-stretch">
      <WeeklyCard />
      <ExceptionsCard />
      <CapacityCard />
    </div>
  );
}
