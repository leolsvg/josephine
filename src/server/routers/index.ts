import { createTRPCRouter } from "../../lib/trpc/init";
import { bookings } from "./bookings";
import { schedule } from "./schedule";
import { settings } from "./settings";
import { statistics } from "./statistics";

export const appRouter = createTRPCRouter({
  bookings,
  schedule,
  settings,
  statistics,
});

export type AppRouter = typeof appRouter;
