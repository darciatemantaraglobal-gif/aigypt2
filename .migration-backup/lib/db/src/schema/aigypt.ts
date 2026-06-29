import { pgTable, uuid, varchar, boolean, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const accessCodesTable = pgTable("access_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 20 }).unique().notNull(),
  type: varchar("type", { length: 20 }).notNull(),
  batchNumber: integer("batch_number"),
  isUsed: boolean("is_used").default(false).notNull(),
  usedByEmail: varchar("used_by_email", { length: 255 }),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const insertAccessCodeSchema = createInsertSchema(accessCodesTable).omit({ id: true, createdAt: true });
export type InsertAccessCode = z.infer<typeof insertAccessCodeSchema>;
export type AccessCode = typeof accessCodesTable.$inferSelect;

export const membersTable = pgTable("members", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  accessCode: varchar("access_code", { length: 20 }).references(() => accessCodesTable.code),
  memberType: varchar("member_type", { length: 20 }).notNull(),
  batchNumber: integer("batch_number"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastLogin: timestamp("last_login", { withTimezone: true }),
});

export const insertMemberSchema = createInsertSchema(membersTable).omit({ id: true, createdAt: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof membersTable.$inferSelect;

export const materiProgressTable = pgTable("materi_progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberEmail: varchar("member_email", { length: 255 }).references(() => membersTable.email).notNull(),
  kelasId: varchar("kelas_id", { length: 50 }).notNull().default("maksimalkan-ai"),
  sesiNumber: integer("sesi_number").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  currentStep: integer("current_step").default(0).notNull(),
  wasSkipped: boolean("was_skipped").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("materi_progress_unique_idx").on(table.memberEmail, table.kelasId, table.sesiNumber),
]);

export const insertMateriProgressSchema = createInsertSchema(materiProgressTable).omit({ id: true, createdAt: true });
export type InsertMateriProgress = z.infer<typeof insertMateriProgressSchema>;
export type MateriProgress = typeof materiProgressTable.$inferSelect;
