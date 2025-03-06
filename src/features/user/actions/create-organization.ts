"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { CreateOrganizationSchema } from "@features/user/validators/organization-schema";
import { APIError } from "better-auth/api";
import type { TypeOf } from "zod";

import { auth } from "@/auth/auth";

export const createOrganization = async (
  values: TypeOf<typeof CreateOrganizationSchema>,
) => {
  const h = await headers();
  const validatedData = CreateOrganizationSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: "Invalid Fields" };
  }

  const { organizationName, organizationSlug } = validatedData.data;

  try {
    const organization = await auth.api.createOrganization({
      headers: h,
      body: {
        name: organizationName,
        slug: organizationSlug,
      },
    });

    revalidatePath("/dashboard");

    return { organization, success: "Organization created successfully" };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message, status: err.status };
    }
  }
};
