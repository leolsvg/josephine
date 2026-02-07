import { ExceptionsCard } from "@/feat/booking/components/admin/settings/exceptions-card";
import { SettingsCard } from "@/feat/booking/components/admin/settings/settings-card";
import { WeeklyCard } from "@/feat/booking/components/admin/settings/weekly-card";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-stretch">
      <WeeklyCard />
      <ExceptionsCard />
      <SettingsCard />
    </div>
  );
}
