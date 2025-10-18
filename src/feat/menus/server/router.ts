import { TRPCError } from "@trpc/server";
import z from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/init";
import { SId } from "@/lib/utils";
import type { TMenuCategory } from "../db/types";
import { menuCategories, menuServices } from "../db/types";
import { deleteMenu } from "./services/delete-menu";
import { getMenus } from "./services/get-menus";
import { getMenusByService } from "./services/get-menus-by-service";
import { patchMenu } from "./services/patch-menu";
import { putDefaultMenu } from "./services/put-default-menu";

export const SMenuPatch = z
  .object({
    description: z.string(),
    category: z.enum(menuCategories),
    price: z.number(),
    service: z.enum(menuServices),
  })
  .partial();

export const menus = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const result = await getMenus(ctx.db);
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value;
  }),
  getByService: publicProcedure
    .input(
      z.object({
        service: z.enum(menuServices),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await getMenusByService(ctx.db, input.service);
      if (result.isErr()) {
        throw new TRPCError({
          message: result.error.message,
          code: "INTERNAL_SERVER_ERROR",
          cause: result.error.cause,
        });
      }
      const grouped = Object.groupBy(result.value, (p) => p.category);
      const sortedEntries = (
        Object.entries(grouped) as [
          TMenuCategory,
          (typeof result.value)[number][],
        ][]
      ).sort(
        ([a], [b]) => menuCategories.indexOf(a) - menuCategories.indexOf(b),
      );
      return sortedEntries;
    }),
  patch: protectedProcedure
    .input(
      SId.extend({
        value: SMenuPatch,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await patchMenu(ctx.db, input.id, input.value);
      if (result.isErr()) {
        throw new TRPCError({
          message: result.error.message,
          code: "INTERNAL_SERVER_ERROR",
          cause: result.error.cause,
        });
      }
      return result.value;
    }),
  delete: protectedProcedure.input(SId).mutation(async ({ ctx, input }) => {
    const result = await deleteMenu(ctx.db, input.id);
    if (result.isErr()) {
      throw new TRPCError({
        message: result.error.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: result.error.cause,
      });
    }
    return result.value;
  }),
  putDefault: protectedProcedure
    .input(
      z.object({
        service: z.enum(menuServices),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await putDefaultMenu(ctx.db, input.service);
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
