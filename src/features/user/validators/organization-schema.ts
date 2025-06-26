import { z } from "zod";

export const CreateOrganizationSchema = z.object({
  organizationName: z.string().trim().min(3),
  organizationSlug: z
    .string()
    .trim()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});
