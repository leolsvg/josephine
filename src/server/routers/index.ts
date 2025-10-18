import { bookings } from "@/feat/booking/server/routers/bookings";
import { schedule } from "@/feat/booking/server/routers/schedule";
import { settings } from "@/feat/booking/server/routers/settings";
import { statistics } from "@/feat/booking/server/routers/statistics";
import { places } from "@/feat/home/server/routers/places";
import { menus } from "@/feat/menus/server/router";
import { createTRPCRouter } from "@/lib/trpc/init";

export const appRouter = createTRPCRouter({
  bookings,
  schedule,
  settings,
  statistics,
  places,
  menus,
});

export type AppRouter = typeof appRouter;
