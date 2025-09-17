import { createTRPCRouter } from "../../lib/trpc/init";
import { bookings } from "./bookings";
import { schedule } from "./schedule";

export const appRouter = createTRPCRouter({
  bookings,
  schedule,
});

export type AppRouter = typeof appRouter;
