import { defineConfig } from "drizzle-kit";
import path from "path";

const dbUrl = process.env.SUPABASE_DATABASE_URL;
if (!dbUrl) {
  throw new Error("SUPABASE_DATABASE_URL, masukkan connection string Supabase kamu");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
