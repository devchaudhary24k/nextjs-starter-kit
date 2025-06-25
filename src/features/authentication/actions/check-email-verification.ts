"use server";

import { EmailVerificationSchema } from "@features/authentication/validators/auth-schema";
import { and, eq } from "drizzle-orm";
import type { TypeOf } from "zod";

import { db } from "@/database";
import { user } from "@/database/schema";

export const checkEmailVerification = async (
  values: TypeOf<typeof EmailVerificationSchema>,
) => {
  const validatedData = EmailVerificationSchema.safeParse(values);
  if (!validatedData.success)
    return {
      error:
        "Something went wrong, Please check your mails and close this window",
    };

  const { id, email } = validatedData.data;

  try {
    const [{ isVerified }] = await db
      .select({ isVerified: user.emailVerified })
      .from(user)
      .where(and(eq(user.id, id), eq(user.email, email)))
      .limit(1)
      .execute();

    return { isVerified };
  } catch (err) {
    return { error: err };
  }
};
