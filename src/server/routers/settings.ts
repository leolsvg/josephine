import { TRPCError } from "@trpc/server";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/init";
import { settingsTable } from "../db/schema";
import { SSettings } from "../db/types";

export const settings = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const result = await safeDrizzleQuery(
      ctx.db
        .select({
          maxCapacityPerSlot: settingsTable.maxCapacityPerSlot,
          maxCapacityPerService: settingsTable.maxCapacityPerService,
          maxGuestsPerBooking: settingsTable.maxGuestsPerBooking,
        })
        .from(settingsTable),
    );
    if (result.isErr()) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error,
        message: result.error.message,
      });
    }

    const settings = result.value[0];
    if (!settings)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Aucun paramètre trouvé dans la base de données",
      });
    return settings;
  }),
  patch: protectedProcedure
    .input(SSettings)
    .mutation(async ({ ctx, input }) => {
      const result = await safeDrizzleQuery(
        ctx.db.update(settingsTable).set(input),
      );
      if (result.isErr()) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: result.error,
          message: result.error.message,
        });
      }
    }),
});
