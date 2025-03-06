"use server";

import { headers } from "next/headers";

import { RegisterSchema } from "@features/authentication/validators/auth-schema";
import { APIError } from "better-auth/api";
import type { TypeOf } from "zod";

import { auth } from "@/auth/auth";

export const register = async (values: TypeOf<typeof RegisterSchema>) => {
  const h = await headers();
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { password, email, name } = validatedFields.data;

  try {
    const user = await auth.api.signUpEmail({
      headers: h,
      body: {
        name,
        email,
        password,
      },
    });

    return { user: user, success: "Account Created Successfully" };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message, status: err.status };
    }
  }
};
