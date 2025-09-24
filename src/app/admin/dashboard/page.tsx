import { BookingsChart } from "./_components/bookings-chart";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <p>Bienvenue sur le tableau de bord administrateur.</p>
      <BookingsChart />
    </div>
  );
}
