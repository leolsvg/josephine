import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import {
  SBooking,
  SBookingAdminPatch,
  SBookingAdminPut,
} from "@/feat/booking/utils/booking-schema";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/init";
import { SId } from "@/lib/utils";
import { bookingsTable } from "../../db/schema";
import { createBooking } from "../services/create-booking";

export const bookings = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const result = await safeDrizzleQuery(ctx.db.select().from(bookingsTable));
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value;
  }),
  delete: protectedProcedure
    .input(SId)
    .mutation(async ({ ctx, input: { id } }) => {
      const result = await safeDrizzleQuery(
        ctx.db.delete(bookingsTable).where(eq(bookingsTable.id, id)),
      );
      if (result.isErr()) {
        throw new TRPCError({
          message: result.error.message,
          code: "INTERNAL_SERVER_ERROR",
          cause: result.error.cause,
        });
      }
      return result.value;
    }),
  book: publicProcedure.input(SBooking).mutation(async ({ ctx, input }) => {
    const result = await createBooking(ctx.db, input, ctx.ip);
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value;
  }),
  patch: protectedProcedure
    .input(
      SId.extend({
        value: SBookingAdminPatch,
      }),
    )
    .mutation(({ ctx, input: { id, value } }) => {
      return ctx.db
        .update(bookingsTable)
        .set(value)
        .where(eq(bookingsTable.id, id));
    }),
  put: protectedProcedure.input(SBookingAdminPut).mutation(({ ctx, input }) => {
    return ctx.db.insert(bookingsTable).values(input);
  }),
});
