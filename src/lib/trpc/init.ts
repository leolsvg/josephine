import { initTRPC, TRPCError } from "@trpc/server";
import z, { ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";
import SuperJSON from "@/lib/superjson";
import { db } from "@/server/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return {
    db,
    user: data.user,
    ...opts,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof ZodError
          ? z.flattenError(error.cause as ZodError<Record<string, unknown>>)
          : null,
    },
  }),
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (ctx.user === null) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.user,
    },
  });
});
