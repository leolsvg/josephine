import { createTRPCRouter } from "../../lib/trpc/init";
import { bookings } from "./bookings";
import { menus } from "./menus";
import { places } from "./places";
import { schedule } from "./schedule";
import { settings } from "./settings";
import { statistics } from "./statistics";

export const appRouter = createTRPCRouter({
  bookings,
  schedule,
  settings,
  statistics,
  places,
  menus,
});

export type AppRouter = typeof appRouter;
