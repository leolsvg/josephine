import { createTRPCRouter } from "../../lib/trpc/init";
import { bookings } from "./bookings";
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
});

export type AppRouter = typeof appRouter;
