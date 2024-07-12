import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema'
import "dotenv/config"
import { envs } from "../config/env";

const client = createClient({
  url: envs.DATABASE_URL,
  //authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, {
  schema
});
