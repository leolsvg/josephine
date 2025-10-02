import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/init";
import { bookingsTable } from "../db/schema";

export const statistics = createTRPCRouter({
  getBookingsByInterval: protectedProcedure.query(async ({ ctx }) => {
    const result = await safeDrizzleQuery(
      ctx.db
        .select({ total: sql<string>`COUNT(*)`, date: bookingsTable.date })
        .from(bookingsTable)
        .where(sql`${bookingsTable.date}>= CURRENT_DATE - INTERVAL '2 weeks'`)
        .groupBy(bookingsTable.date),
    );
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value.toSorted((a, b) =>
      Temporal.PlainDate.compare(a.date, b.date),
    );
  }),
});
