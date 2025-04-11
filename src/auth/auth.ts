import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI, organization } from "better-auth/plugins";

import { siteConfig } from "@/config/site";
import { db } from "@/database";
import * as schema from "@/database/schema";
import redis from "@/lib/redis";

export const auth = betterAuth({
  appName: siteConfig.name,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),

  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, "EX", ttl);
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    // TODO: Implement Password Reset Mail Here
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24, // 24 hours
    sendVerificationEmail: async ({ user, token }) => {
      const callbackURL = "/onboarding";
      const url = `http://localhost:3000/api/auth/verify-email?token=${token}&callbackURL=${callbackURL}`;
      console.log(url, user.email);

      // TODO: Later uncomment it in production environment
      // await resend.emails.send({
      //   to: user.email,
      //   from: "dev-server@pixelactstudios.com",
      //   subject: "Verify your email",
      //   text: `Click on the link to verify your email: ${url}`,
      // });
    },
  },

  rateLimit: {
    enabled: true,
    window: 10, // Time window in seconds
    max: 100, // Max Requests in a window
    storage: "secondary-storage", // "memory" | "redis"
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week,
    updateAge: 60 * 60 * 24, // 1 day ( every 1 day the session expiresAt will be updated )
    freshAge: 60 * 5, // 5 minutes ( the session is fresh if created within last 5 minutes )

    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  advanced: {
    cookiePrefix: "NXTSKT",
  },

  plugins: [
    organization(),
    openAPI(),
    nextCookies(), // This should be last plugin in the array
  ],
});
