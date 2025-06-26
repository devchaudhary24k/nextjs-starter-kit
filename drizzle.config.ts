import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: "./src/database/migrations",
} satisfies Config;
