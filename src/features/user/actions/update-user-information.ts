"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { APIError } from "better-auth/api";
import type { TypeOf } from "zod";

import { auth } from "@/auth/auth";

import { AccountSettingsSchema } from "../validators/account-settings-form";

export const upateUserInformation = async (
  values: TypeOf<typeof AccountSettingsSchema>,
) => {
  const h = await headers();
  const validatedData = AccountSettingsSchema.safeParse(values);
  if (!validatedData.success) return { error: "invalid Fields" };
  const { name } = validatedData.data;

  try {
    const user = await auth.api.updateUser({
      headers: h,
      body: {
        name,
      },
    });

    revalidatePath("/account");
    // TODO: Handle Change Email
    return { user, success: "Updated Information" };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message, status: err.status };
    }
  }
};
