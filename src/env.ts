import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {},
  /* eslint-disable */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  /* eslint-enable */
  skipValidation: false,
  extends: [vercel()],
});
