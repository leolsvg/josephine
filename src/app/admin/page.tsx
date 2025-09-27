import { Suspense } from "react";
import { BookingsAreaChart } from "./_components/bookings-area-chart";
import { StatusPieChart } from "./bookings/_components/sidebar/status-pie-chart";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <p>Bienvenue sur le tableau de bord administrateur.</p>
      <BookingsAreaChart />
      <Suspense>
        <StatusPieChart />
      </Suspense>
    </div>
  );
}
