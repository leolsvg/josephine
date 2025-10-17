import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import * as schema from "./schema";

class Database {
  private static instance: Database;
  public db;

  private constructor() {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres(env.DATABASE_URL, { prepare: false });
    this.db = drizzle(client, { casing: "snake_case", schema });
  }

  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export const { db } = Database.getInstance();
export type DB = typeof db;
