import { TRPCError } from "@trpc/server";
import { between, count, eq, sql } from "drizzle-orm";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/init";
import { SId } from "@/lib/utils";
import { bookingsTable } from "../db/schema";
import { SPatchBooking, SPutBooking } from "../db/types";
import { createBooking } from "../services/bookings/create-booking";

export const dashboard = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const result = await safeDrizzleQuery(
      ctx.db
        .select({ total: sql<string>`COUNT(*)`, date: bookingsTable.date })
        .from(bookingsTable)
        .where(sql`${bookingsTable.date}>= CURRENT_DATE - INTERVAL '2 weeks'`)
        .groupBy(bookingsTable.date)
    );
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value.toSorted((a, b) => a.date.localeCompare(b.date));
  }),
});
