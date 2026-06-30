import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const dbUrl = process.env.SUPABASE_DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "SUPABASE_DATABASE_URL must be set. Masukkan connection string Supabase kamu.",
  );
}

export const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle(pool, { schema });

export * from "./schema";
