import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

const globalForDb = globalThis as unknown as { sql?: Sql };

function createClient(): Sql {
  const url = process.env["DATABASE_URL"];
  if (!url) {
    throw new Error(
      "DATABASE_URL belum dikonfigurasi di Environment Variables Vercel."
    );
  }
  return postgres(url, {
    prepare: false, // wajib false untuk Supabase pooler mode transaction
    ssl: "require",
  });
}

/**
 * Koneksi dibuat lazy (saat query pertama), bukan saat module di-import.
 * Kalau dibuat di top-level dan DATABASE_URL invalid, seluruh serverless
 * function crash dengan FUNCTION_INVOCATION_FAILED sebelum handler jalan,
 * sehingga endpoint yang tidak butuh DB (misal /api/admin/login) ikut mati.
 */
export const sql: Sql = new Proxy((() => {}) as unknown as Sql, {
  apply(_target, _thisArg, args: unknown[]) {
    const client = (globalForDb.sql ??= createClient());
    return (client as unknown as (...a: unknown[]) => unknown)(...args);
  },
  get(_target, prop, receiver) {
    const client = (globalForDb.sql ??= createClient());
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
}) as Sql;
