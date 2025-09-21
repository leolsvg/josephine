import BookingPeriodsCard from "./booking-periods-card";
import { CapacityCard } from "./capacity-card";
import { ExceptionsCard } from "./exceptions-card";

export default async function SettingsPage() {
  return (
    <div className="flex gap-3 items-start">
      <BookingPeriodsCard />
      <CapacityCard />
      <ExceptionsCard />
    </div>
  );
}
