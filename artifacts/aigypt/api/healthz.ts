import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./_lib/db.js";

function extractHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    // Coba parse manual kalau format bukan URL standar
    const match = url.match(/@([^/:]+)/);
    return match?.[1] ?? "(tidak bisa dibaca)";
  }
}

function diagnoseDatabaseUrl(host: string): {
  status: "ok" | "warning" | "error";
  message: string;
} {
  if (host.includes("pooler.supabase.com")) {
    return {
      status: "ok",
      message:
        "✅ Host sudah menggunakan Session Pooler (pooler.supabase.com). Konfigurasi benar.",
    };
  }
  if (/^db\..+\.supabase\.co$/.test(host)) {
    return {
      status: "error",
      message:
        "❌ Host masih menggunakan Direct Connection (db.*.supabase.co). " +
        "Host ini hanya punya alamat IPv6 dan tidak bisa dijangkau oleh Vercel. " +
        "Ganti DATABASE_URL ke Session Pooler. Lihat panduan di docs/fix-database-url.md.",
    };
  }
  return {
    status: "warning",
    message:
      `⚠️ Host tidak dikenali sebagai pola Supabase yang umum: ${host}. ` +
      "Pastikan ini adalah connection string yang benar.",
  };
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const dbUrl = process.env["DATABASE_URL"];
  const dbHost = dbUrl ? extractHost(dbUrl) : null;

  const envVars = {
    DATABASE_URL: dbUrl
      ? { ada: true, host: dbHost }
      : { ada: false, host: null },
    JWT_SECRET: { ada: !!process.env["JWT_SECRET"] },
    ADMIN_PASSWORD: { ada: !!process.env["ADMIN_PASSWORD"] },
    SUPABASE_URL: { ada: !!process.env["SUPABASE_URL"] },
    SUPABASE_SERVICE_ROLE_KEY: { ada: !!process.env["SUPABASE_SERVICE_ROLE_KEY"] },
  };

  const dbDiagnosis = dbHost
    ? diagnoseDatabaseUrl(dbHost)
    : { status: "error" as const, message: "❌ DATABASE_URL tidak diset sama sekali." };

  let dbPing: { berhasil: boolean; pesan: string; kodeError?: string } ;
  try {
    await sql`SELECT 1`;
    dbPing = { berhasil: true, pesan: "✅ Query SELECT 1 berhasil. Database bisa dijangkau." };
  } catch (err: unknown) {
    const e = err as NodeJS.ErrnoException;
    dbPing = {
      berhasil: false,
      pesan: `❌ Query gagal: ${e.message ?? String(err)}`,
      kodeError: e.code ?? "UNKNOWN",
    };
  }

  return res.status(200).json({
    status: dbPing.berhasil ? "ok" : "error",
    timestamp: new Date().toISOString(),
    environmentVariables: envVars,
    diagnosisDatabase: dbDiagnosis,
    pingDatabase: dbPing,
  });
}
