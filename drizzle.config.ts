//import 'dotenv/config';
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:C:/Users/USER/Desktop/web/youtube/drive/src/db/drive.db",
    //authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
