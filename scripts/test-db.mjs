import "dotenv/config";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL || process.env.MIGRATION_DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL tidak ditemukan!");
  process.exit(1);
}

// Tampilkan informasi koneksi tanpa password
const parsedUrl = new URL(connectionString);

console.log("Database Configuration:");
console.log({
  host: parsedUrl.hostname,
  port: parsedUrl.port,
  username: parsedUrl.username,
  database: parsedUrl.pathname,
});

const client = postgres(connectionString, {
  prepare: false,
  max: 1,
  connect_timeout: 10,
  ssl: "require",
});

const db = drizzle(client);

async function testConnection() {
  try {
    // Tes koneksi langsung PostgreSQL
    console.log("\nTesting PostgreSQL connection...");

    const rawResult = await client`
      SELECT
        current_database() AS database_name,
        now() AS server_time
    `;

    console.log("PostgreSQL connection successful!");
    console.log(rawResult);

    // Tes query menggunakan Drizzle
    console.log("\nTesting Drizzle ORM...");

    const result = await db.execute(sql`
      SELECT current_database() AS database_name
    `);

    console.log("Drizzle connection successful!");
    console.log(result);

  } catch (error) {
    console.error("\nCONNECTION FAILED!");

    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);

    console.error(
      "Error Code:",
      error.code || error.cause?.code
    );

    console.error("\nOriginal Error:");

    console.dir(
      error.cause || error,
      { depth: 5 }
    );

  } finally {
    await client.end();
  }
}

testConnection();