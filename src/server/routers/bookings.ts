import { createTRPCRouter, publicProcedure } from "../../lib/trpc/init";
import { SPutBooking } from "../db/types";
import { createBooking } from "../services/bookings/create-booking";

export const bookings = createTRPCRouter({
  put: publicProcedure.input(SPutBooking).mutation(async ({ ctx, input }) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    await createBooking(ctx.db, input);
  }),
});
