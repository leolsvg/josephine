import "server-only";

import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const client = postgres(env.DATABASE_URL, {
  max: 2,
  prepare: false,
  ssl: "require",
});
const db = globalThis._db ?? drizzle(client, { schema, casing: "snake_case" });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export { db };
export type DB = typeof db;
