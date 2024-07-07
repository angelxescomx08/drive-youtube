import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema'
import "dotenv/config"

const client = createClient({
  url: process.env.DATABASE_URL!,
  //authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, {
  schema
});
