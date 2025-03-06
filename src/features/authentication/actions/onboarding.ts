"use server";

import { headers } from "next/headers";

import { OnboardingSchema } from "@features/authentication/validators/auth-schema";
import { APIError } from "better-auth/api";
import type { TypeOf } from "zod";

import { auth } from "@/auth/auth";

export const onboarding = async (values: TypeOf<typeof OnboardingSchema>) => {
  const h = await headers();
  const validatedFields = OnboardingSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { organizationName, organizationSlug } = validatedFields.data;

  try {
    const organization = await auth.api.createOrganization({
      headers: h,
      body: {
        name: organizationName,
        slug: organizationSlug,
      },
    });

    return {
      organization: organization,
      success: "Organization created successfully",
    };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message, status: err.status };
    }
  }
};
