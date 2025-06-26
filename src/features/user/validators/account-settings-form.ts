import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const VALID_IMAGE_TYPES = [".png", ".webp", ".jpg", ".jpeg", ".svg"];

export const AccountSettingsSchema = z.object({
  name: z.string().min(3).trim().optional(),
  email: z.string().trim().email().optional(),
});

export const ProfilePictureSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => {
      if (!file) return true; // Allow no file
      return file.size <= MAX_FILE_SIZE;
    }, "File size must be less than 5MB")
    .refine((file) => {
      if (!file) return true; // Allow no file
      const ext = file.name.split(".").pop()?.toLowerCase();
      return ext && VALID_IMAGE_TYPES.includes(`.${ext}`);
    }, "Only .png, .webp, .svg, .jpg and .jpeg files are allowed"),
});
