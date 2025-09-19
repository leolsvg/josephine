import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../lib/trpc/init";
import { SPutBooking } from "../db/types";
import { createBooking } from "../services/bookings/create-booking";

export const bookings = createTRPCRouter({
  put: publicProcedure.input(SPutBooking).mutation(async ({ ctx, input }) => {
    const result = await createBooking(ctx.db, input);
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value;
  }),
});
