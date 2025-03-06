"use server";

import { headers } from "next/headers";

import { LoginSchema } from "@features/authentication/validators/auth-schema";
import { APIError } from "better-auth/api";
import type { TypeOf } from "zod";

import { auth } from "@/auth/auth";

export const login = async (values: TypeOf<typeof LoginSchema>) => {
  const h = await headers();

  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { password, email } = validatedFields.data;

  try {
    const user = await auth.api.signInEmail({
      headers: h,
      body: {
        email,
        password,
      },
    });

    return { user: user, success: "Authenticated" };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message, status: err.status };
    }
  }
};
