import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const qlConnections = sqliteTable("ql_connections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().default("default"),
  url: text("url").notNull(),
  clientId: text("client_id").notNull(),
  clientSecret: text("client_secret").notNull(),
  createdAt: text("created_at").notNull().default("(datetime('now'))"),
  updatedAt: text("updated_at").notNull().default("(datetime('now'))"),
});
