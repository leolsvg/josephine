import { TRPCError } from "@trpc/server";
import { getExceptions, getWeekly } from "@/server/services/bookings/schedule";
import { createTRPCRouter, publicProcedure } from "../../lib/trpc/init";

export const schedule = createTRPCRouter({
  getExceptions: publicProcedure.query(async ({ ctx }) => {
    const result = await getExceptions(ctx.db);
    if (result.isErr())
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error,
        message: result.error.message,
      });
    return result.value;
  }),

  getWeekly: publicProcedure.query(async ({ ctx }) => {
    const result = await getWeekly(ctx.db);
    if (result.isErr())
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error,
        message: result.error.message,
      });
    return result.value;
  }),
});
