import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { qlConnections } from "./schema";

const sqlite = new Database("./data/ql-manager.db");
export const db = drizzle(sqlite);

export async function getQlConnection() {
  return db.select().from(qlConnections).where(eq(qlConnections.name, "default")).get();
}

export async function upsertQlConnection(url: string, token: string) {
  return db.insert(qlConnections).values({ url, token }).onConflictDoUpdate({
    target: qlConnections.name,
    set: { url, token, updatedAt: new Date().toISOString() },
  }).run();
}
