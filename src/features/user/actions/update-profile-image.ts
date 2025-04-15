"use server";

import type { TypeOf } from "zod";

import { ProfilePictureSchema } from "../validators/account-settings-form";

export const updateProfileImage = async (
  values: TypeOf<typeof ProfilePictureSchema>,
) => {
  const validatedData = ProfilePictureSchema.safeParse(values);

  if (!validatedData.success) return { error: "error" };

  // TODO: Handle file Upload Logic
  // TODO: Handle file Change

  return { success: "worked" };
};
