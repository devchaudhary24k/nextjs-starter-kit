import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";

import { db } from "@/database";
import * as schema from "@/database/schema";
import { getActiveOrganization } from "@/hooks/get-active-session";
import redis from "@/lib/redis";

export const auth = betterAuth({
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

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organizationId = await getActiveOrganization(session.userId);

          if (!organizationId) {
            return {
              data: {
                ...session,
              },
            };
          }

          return {
            data: {
              ...session,
              activeOrganizationId: organizationId.organizationId,
            },
          };
        },
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week,
    updateAge: 60 * 60 * 24, // 1 day ( every 1 day the session expiresAt will be updated )

    cookieCache: {
      enabled: false,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  plugins: [organization(), nextCookies()],
});
