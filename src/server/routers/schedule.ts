import { getExceptions, getWeekly } from "@/server/services/bookings/schedule";
import { createTRPCRouter, publicProcedure } from "../../lib/trpc/init";

export const schedule = createTRPCRouter({
  getExceptions: publicProcedure.query(async ({ ctx }) =>
    getExceptions(ctx.db),
  ),

  getWeekly: publicProcedure.query(({ ctx }) => getWeekly(ctx.db)),
});
