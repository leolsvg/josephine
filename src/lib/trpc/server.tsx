import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache } from "react";
import { type AppRouter, appRouter } from "../../server/routers";
import { createCallerFactory, createTRPCContext } from "./init";
import { createQueryClient } from "./query-client";

/**
 * Wraps the `createTRPCContext` helper and provides the required context
 * for the tRPC API when handling a call from a React Server Component.
 */
const createContext = cache(async () => {
  let heads = new Headers();

  try {
    // Tentative de récupération des headers (échoue normalement durant le build statique)
    const nextHeaders = await headers();
    for (const [key, value] of nextHeaders.entries()) {
      heads.set(key, value);
    }
  } catch (error) {
    // On ignore l'erreur pendant le build/SSG
    console.warn(
      "[tRPC Server] Headers not available (likely during build/static generation)",
    );
  }

  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy<AppRouter>({
  router: appRouter,
  ctx: createContext,
  queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: TRPC code
export async function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // biome-ignore lint/suspicious/noExplicitAny: TRPC code
    await queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    await queryClient.prefetchQuery(queryOptions);
  }
}

export const createCaller = createCallerFactory(appRouter);
export const caller = createCaller(createContext);
