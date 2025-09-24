import { createTRPCRouter } from "../../lib/trpc/init";
import { bookings } from "./bookings";
import { dashboard } from "./dashboard";
import { schedule } from "./schedule";
import { settings } from "./settings";

export const appRouter = createTRPCRouter({
  bookings,
  schedule,
  settings,
  dashboard,
});

export type AppRouter = typeof appRouter;
