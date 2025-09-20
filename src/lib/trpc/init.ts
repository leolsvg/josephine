import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import z, { ZodError } from "zod";
import { db } from "@/server/db";
import { createClient } from "../supabase/server";

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
  transformer: superjson,
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
export const protectedProcedure = t.procedure.use(async (opts) => {
  if (opts.ctx.user === null) throw new TRPCError({ code: "UNAUTHORIZED" });
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: opts.ctx.user,
    },
  });
});
