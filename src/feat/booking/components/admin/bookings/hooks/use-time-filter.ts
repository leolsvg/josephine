import { useColumnFilters } from "./use-column-filters";

type TMeal = "lunch" | "dinner";

export function useTimeFilter() {
  const { columnFilters, setColumnFilters } = useColumnFilters();

  const meal = columnFilters.find((f) => f.id === "time")?.value as
    | TMeal
    | undefined;

  function setMeal(m: TMeal | null) {
    setColumnFilters((p) => [
      ...p.filter((f) => f.id !== "time"),
      ...(m ? [{ id: "time", value: m }] : []),
    ]);
  }

  function lunch() {
    setMeal("lunch");
  }

  function dinner() {
    setMeal("dinner");
  }

  function allMeals() {
    setMeal(null);
  }

  return {
    meal,
    lunch,
    dinner,
    allMeals,
  };
}
