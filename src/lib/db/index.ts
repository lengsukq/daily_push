import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { qlConnections } from "./schema";
import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

const DB_PATH = "./data/ql-manager.db";

function ensureDbExists() {
  const dir = dirname(DB_PATH);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  if (!existsSync(DB_PATH)) {
    const sqlite = new Database(DB_PATH);
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS ql_connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL DEFAULT 'default',
        url TEXT NOT NULL,
        client_id TEXT NOT NULL,
        client_secret TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
    sqlite.close();
  }
}

ensureDbExists();

const sqlite = new Database(DB_PATH);
export const db = drizzle(sqlite);

export async function getQlConnection() {
  return db.select().from(qlConnections).where(eq(qlConnections.name, "default")).get();
}

export async function upsertQlConnection(url: string, clientId: string, clientSecret: string) {
  return db.insert(qlConnections).values({ url, clientId, clientSecret }).onConflictDoUpdate({
    target: qlConnections.name,
    set: { url, clientId, clientSecret, updatedAt: new Date().toISOString() },
  }).run();
}
