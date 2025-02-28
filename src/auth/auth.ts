import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/database";
import * as schema from "@/database/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // TODO: Set to true when email verification is implemented
    autoSignIn: false,
    // TODO: Implement Password Reset Mail Here
  },

  rateLimit: {
    enabled: false,
    window: 10, // Time window in seconds
    max: 100, // Max Requests in a window
    storage: "memory", // "memory" | "redis"
  },

  // session: {
  //   expiresIn: 60 * 60 * 60 * 24 * 7, // 7 days
  //   updateAge: 60 * 60 * 60 * 24, // 1 day ( every 1 day the session expiresAt will be updated )
  //
  //   cookieCache: {
  //     enabled: true,
  //     expiresIn: 5 * 60, // 5 minutes
  //   },
  // },

  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: false,
    // TODO: Implement Email Verification Mail Here
  },

  plugins: [nextCookies()],
});
