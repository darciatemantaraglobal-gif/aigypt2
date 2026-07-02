import postgres from "postgres";

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

export const sql =
  globalForDb.sql ??
  postgres(process.env["DATABASE_URL"]!, {
    prepare: false, // wajib false untuk Supabase pooler mode transaction
    ssl: "require",
  });

if (process.env["NODE_ENV"] !== "production") {
  globalForDb.sql = sql;
}
