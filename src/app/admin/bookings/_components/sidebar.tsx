"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fr } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { TIMEZONE } from "@/lib/utils";
import { useBookingsDate } from "./realtime/use-booking-date";
import { trpc } from "@/lib/trpc/react";
import ChartPieDonut from "./pie-chart";

type Statut = "pending" | "present" | "absent" | "canceled";

export function Sidebar() {
  const {
    date,
    nextDay,
    prevDay,
    all,
    today,
    tomorrow,
    isToday,
    isTomorrow,
    setDate,
  } = useBookingsDate();

  const [month, setMonth] = React.useState<Date>();
  React.useEffect(() => {
    if (date) {
      setMonth(
        new Date(
          Temporal.PlainDate.from(date).toZonedDateTime(
            TIMEZONE
          ).epochMilliseconds
        )
      );
    }
  }, [date]);

  // ✅ Récupération des réservations (proc serveur: "get")
  const {
    data: bookings = [],
    isLoading,
    error,
  } = trpc.bookings.get.useQuery();

  // ✅ Filtrer par jour sélectionné (si `date` est défini)
  const filtered = React.useMemo(() => {
    if (!date) return bookings;
    return bookings.filter((b) => b.date === date);
  }, [bookings, date]);

  // ✅ Construire chartData en O(n)
  const chartData = React.useMemo(() => {
    const counts: Record<Statut, number> = {
      pending: 0,
      present: 0,
      absent: 0,
      canceled: 0,
    };
    for (const b of filtered) counts[b.status as Statut] += 1;
    return (Object.keys(counts) as Statut[]).map((statut) => ({
      statut,
      visitors: counts[statut],
    }));
  }, [filtered]);

  return (
    <div className="flex w-full flex-col gap-4 md:gap-6">
      {/* Boutons de raccourcis de date */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <Button
          type="button"
          variant={isToday ? "default" : "outline"}
          onClick={today}
          className="w-full"
        >
          Aujourd&apos;hui
        </Button>
        <Button
          type="button"
          variant={isTomorrow ? "default" : "outline"}
          onClick={tomorrow}
          className="w-full"
        >
          Demain
        </Button>
        <Button
          type="button"
          variant={!date ? "default" : "outline"}
          onClick={all}
          className="w-full"
        >
          Afficher tout
        </Button>
      </div>

      {/* Navigation jour (stack sur mobile, 2 colonnes sur sm+) */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={prevDay}
          disabled={!date}
          className="justify-between"
        >
          <ChevronLeft />
          <span>Jour précédent</span>
          <div />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={nextDay}
          disabled={!date}
          className="justify-between"
        >
          <div />
          <span>Jour suivant</span>
          <ChevronRight />
        </Button>
      </div>

      {/* Calendrier (cell-size responsive) */}
      <div className="flex justify-center">
        <Calendar
          fixedWeeks
          locale={fr}
          timeZone={TIMEZONE}
          month={month}
          onMonthChange={setMonth}
          mode="single"
          showOutsideDays={false}
          selected={
            date
              ? new Date(
                  Temporal.PlainDate.from(date).toZonedDateTime(
                    TIMEZONE
                  ).epochMilliseconds
                )
              : undefined
          }
          onSelect={(d) =>
            setDate(
              d
                ? Temporal.Instant.fromEpochMilliseconds(d.getTime())
                    .toZonedDateTimeISO(TIMEZONE)
                    .toPlainDate()
                    .toString()
                : null
            )
          }
          // Taille des cellules: petite sur mobile, plus grande sur écrans larges
          className="
            w-full max-w-[22rem]
            [--cell-size:theme(spacing.10)]
            sm:[--cell-size:theme(spacing.11)]
            md:[--cell-size:theme(spacing.12)]
            lg:[--cell-size:theme(spacing.14)]
          "
        />
      </div>

      {/* États de chargement / erreur */}
      {error && (
        <div className="text-sm text-destructive">
          Erreur de chargement des réservations : {error.message}
        </div>
      )}

      {/* Donut chart (conteneur fluide) */}
      <div className="w-full">
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Chargement…</div>
        ) : (
          <ChartPieDonut data={chartData} />
        )}
      </div>
    </div>
  );
}
