import {
  Calendar1,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useColumnFilters } from "../data-table/hooks/use-column-filters";
import { useDateFilter } from "../data-table/hooks/use-date-filter";
import { useGlobalFilter } from "../data-table/hooks/use-global-filter";
import { useTimeFilter } from "../data-table/hooks/use-time-filter";

export function Filters() {
  const { reset } = useColumnFilters();
  const { dinner, lunch, meal, allMeals } = useTimeFilter();
  const { reset: resetGlobalFilter } = useGlobalFilter();
  const {
    date,
    nextDay,
    prevDay,
    allDays,
    today,
    tomorrow,
    isToday,
    isTomorrow,
  } = useDateFilter();
  return (
    <div className="grid grid-cols-6 gap-2">
      <Button
        type="button"
        variant={isToday ? "default" : "outline"}
        onClick={today}
        className="col-span-2"
      >
        Aujourd'hui
      </Button>
      <Button
        type="button"
        variant={isTomorrow ? "default" : "outline"}
        onClick={tomorrow}
        className="col-span-2"
      >
        Demain
      </Button>
      <Button
        type="button"
        variant={!date ? "default" : "outline"}
        onClick={() => {
          allDays();
          allMeals();
        }}
        className="col-span-2"
      >
        Afficher tout
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={prevDay}
        disabled={!date}
        className="justify-between col-span-3"
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
        className="justify-between col-span-3"
      >
        <div />
        <span>Jour suivant</span>
        <ChevronRight />
      </Button>

      <Button
        type="button"
        variant={meal === "lunch" ? "default" : "outline"}
        onClick={lunch}
        className="col-span-2"
      >
        <Sun />
        <span>Midi</span>
      </Button>
      <Button
        type="button"
        variant={meal === "dinner" ? "default" : "outline"}
        onClick={dinner}
        className="col-span-2"
      >
        <Moon />
        <span>Soir</span>
      </Button>
      <Button
        type="button"
        variant={!meal ? "default" : "outline"}
        onClick={allMeals}
        className="col-span-2"
      >
        <Calendar1 />
        Jour
      </Button>

      <Button
        type="button"
        onClick={() => {
          resetGlobalFilter();
          reset();
        }}
        variant="ghost"
        className="col-span-6"
      >
        <X />
        <span>Réinitialiser</span>
      </Button>
    </div>
  );
}
