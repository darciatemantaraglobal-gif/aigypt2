import type { VercelRequest } from "@vercel/node";

/**
 * Ambil segmen path untuk catch-all route.
 *
 * Sumber utama: req.query["path"] (diisi Vercel untuk [...path]).
 * Fallback: parse langsung dari req.url.
 *
 * Fallback ini wajib. Kalau req.query["path"] kosong, `section` jadi
 * undefined, semua blok route ter-skip, dan request jatuh ke session
 * guard yang balas 401 Unauthorized. Akibatnya /api/admin/login tidak
 * pernah mengecek password sama sekali.
 *
 * PERHATIAN — bug Vercel rewrite:
 * Ketika vercel.json punya rewrite "/api/admin/:path*" → "/api/admin/[...path]",
 * Vercel meneruskan sisa path sebagai SATU string berisi garis miring, bukan
 * array. Contoh: request ke /api/admin/codes/list membuat req.query["path"]
 * bernilai "codes/list" (string), bukan ["codes","list"] (array).
 * Karena itu setiap elemen harus dipecah dulu berdasarkan "/" sebelum dipakai.
 * Nilai dari req.query sudah di-decode Vercel — jangan panggil decodeURIComponent
 * di jalur ini untuk menghindari double decode.
 */
export function getSegments(req: VercelRequest, basePath: string): string[] {
  const raw = req.query?.["path"] as string | string[] | undefined;
  const fromQuery = ([] as string[])
    .concat(raw ?? [])
    .flatMap((s) => s.split("/"))
    .filter(Boolean);
  if (fromQuery.length > 0) return fromQuery;

  const pathname = (req.url ?? "").split("?")[0] ?? "";
  const idx = pathname.indexOf(basePath);
  if (idx === -1) return [];

  return pathname
    .slice(idx + basePath.length)
    .split("/")
    .filter(Boolean)
    .map((s) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    });
}

/** Vercel biasanya sudah parse JSON body, tapi tidak selalu. */
export function getBody<T = Record<string, unknown>>(req: VercelRequest): T {
  const b = req.body;
  if (!b) return {} as T;
  if (typeof b === "string") {
    try {
      return JSON.parse(b) as T;
    } catch {
      return {} as T;
    }
  }
  return b as T;
}

/**
 * Ambil query string. req.query tidak selalu terisi di runtime Vercel
 * (masalah yang sama seperti req.query["path"]), sehingga semua filter,
 * pencarian, dan paginasi di admin panel diam-diam tidak berfungsi.
 */
export function getQuery(req: VercelRequest): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(req.query ?? {})) {
    if (k === "path") continue;
    if (typeof v === "string") out[k] = v;
    else if (Array.isArray(v) && v[0] != null) out[k] = String(v[0]);
  }
  const qs = (req.url ?? "").split("?")[1];
  if (qs) {
    for (const [k, v] of new URLSearchParams(qs).entries()) {
      if (k !== "path" && !(k in out)) out[k] = v;
    }
  }
  return out;
}
