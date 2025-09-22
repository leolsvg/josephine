import { createTRPCRouter } from "../../lib/trpc/init";
import { bookings } from "./bookings";
import { schedule } from "./schedule";
import { settings } from "./settings";

export const appRouter = createTRPCRouter({
  bookings,
  schedule,
  settings,
});

export type AppRouter = typeof appRouter;
