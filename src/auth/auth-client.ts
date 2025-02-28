import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  plugins: [nextCookies()],
});

export const { signUp, signIn } = authClient;
