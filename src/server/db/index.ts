import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { casing: "snake_case" });
export type DB = typeof db;
