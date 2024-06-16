//import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema'

const client = createClient({
  url: "file:C:/Users/USER/Desktop/web/youtube/drive/src/db/drive.db",
  //authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, {
  schema
});
