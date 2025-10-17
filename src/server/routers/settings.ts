import { TRPCError } from "@trpc/server";
import { safeDrizzleQuery } from "@/lib/errors/drizzle";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/init";
import type { DB } from "../db";
import { settingsTable } from "../db/schema";
import { SSettings } from "../db/types";

async function getPublicSettings(db: DB) {
  const [settings] = await db
    .select({
      bookingEnabled: settingsTable.bookingEnabled,
      maxGuestsPerBooking: settingsTable.maxGuestsPerBooking,
    })
    .from(settingsTable);
  return settings;
}

export const settings = createTRPCRouter({
  getPublic: publicProcedure.query(async ({ ctx }) => {
    const result = await safeDrizzleQuery(getPublicSettings(ctx.db));
    if (result.isErr()) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error,
        message: result.error.message,
      });
    }
    return result.value;
  }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const result = await safeDrizzleQuery(
      ctx.db
        .select({
          maxCapacityPerSlot: settingsTable.maxCapacityPerSlot,
          maxCapacityPerService: settingsTable.maxCapacityPerService,
          maxGuestsPerBooking: settingsTable.maxGuestsPerBooking,
          bookingEnabled: settingsTable.bookingEnabled,
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
