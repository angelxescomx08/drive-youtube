//import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { envs } from './src/config/env';

export default {
	schema: './src/db/schema.ts',
	out: './migrations',
	driver: 'turso',
	dialect: 'sqlite',
	dbCredentials: {
		url: envs.DATABASE_URL,
		authToken: envs.TURSO_AUTH_TOKEN,
	},
	breakpoints: true,
	verbose: true,
	strict: true,
} satisfies Config;
