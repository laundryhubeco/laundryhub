import "dotenv/config";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured!");
}

export const client = postgres(connectionString, {
  prepare: false,
  max: 1,
  connect_timeout: 20,
  ssl: "require",
});

export const db = drizzle(client);