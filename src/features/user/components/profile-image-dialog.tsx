"use client";

import Image from "next/image";
// ADDED: Import loader icon
import type { ChangeEvent } from "react";
import { type HTMLAttributes, useState } from "react";

import { Icons } from "@components/icons/icons";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { updateProfileImage } from "../actions/update-profile-image";
import { ProfilePictureSchema } from "../validators/account-settings-form";

type ProfileImageDialogType = {} & HTMLAttributes<HTMLFormElement>;

const ProfileImageDialog = ({ ...props }: ProfileImageDialogType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const userProfilePictureForm = useForm<z.infer<typeof ProfilePictureSchema>>({
    resolver: zodResolver(ProfilePictureSchema),
  });

  // IMPROVED: Let the form validation handle file validation
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validatedFile = ProfilePictureSchema.safeParse({ image: file });

    if (!validatedFile.success) {
      toast.error("Invalid file", {
        description:
          "Please upload a PNG, JPG, JPEG, SVG, or WebP file under 5MB.",
      });
      return;
    }

    const { image } = validatedFile.data;

    setProfilePicture(image);
    userProfilePictureForm.setValue("image", image, { shouldValidate: true });

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(image);
  };

  // IMPROVED: Added feedback with toast
  const onSubmitUserImage = async (
    values: z.infer<typeof ProfilePictureSchema>,
  ) => {
    await updateProfileImage(values).then((response) => {
      if (response?.error) {
        userProfilePictureForm.reset();
        toast.error(response.error);
      }

      if (response?.success) {
        setOpen(false);
        userProfilePictureForm.reset();
        setProfilePicture(null);
        setPreview(null);
        toast.success(response.success);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* IMPROVED: Button accessibility */}
        <Button aria-label="Change profile picture">
          <Icons.edit className="mr-2 h-4 w-4" />
          Change Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...userProfilePictureForm} {...props}>
          <form
            aria-label="Update profile image form"
            onSubmit={userProfilePictureForm.handleSubmit(onSubmitUserImage)}
          >
            <DialogHeader>
              <DialogTitle>Change Profile Picture</DialogTitle>
              <DialogDescription>
                Upload a new profile picture. The image must be below 5MB and in
                PNG, JPG, JPEG, SVG or WebP format.
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 flex items-center justify-center">
              <FormField
                control={userProfilePictureForm.control}
                name="image"
                render={({ field: { onBlur, name, ref } }) => (
                  <FormItem className="flex w-full flex-col gap-2">
                    <FormControl>
                      {/* IMPROVED: Better upload UI with accessibility */}
                      <div
                        className="hover:border-primary relative mx-auto h-60 w-60 overflow-hidden rounded-full border-2 border-dashed transition-colors"
                        role="button"
                        aria-label="Upload profile picture"
                        tabIndex={0}
                      >
                        {preview ? (
                          <div className="group relative h-full w-full">
                            <Button
                              className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
                              variant="secondary"
                              type="button"
                              onClick={() => {
                                setProfilePicture(null);
                                setPreview(null);
                              }}
                              aria-label="Remove selected image"
                            >
                              <Icons.bin className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                            <Image
                              src={preview}
                              alt="Profile Preview"
                              width={250}
                              height={250}
                              className="h-full w-full rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center p-4">
                            <Icons.upload className="mb-2 h-10 w-10 text-xs" />
                            <span className="text-center">
                              Click or drag to upload
                            </span>
                            <Input
                              className="absolute top-0 left-0 h-full w-full cursor-pointer rounded-full text-neutral-300 opacity-0"
                              name={name}
                              onBlur={onBlur}
                              ref={ref}
                              accept=".png,.jpg,.jpeg,.svg,.webp"
                              onChange={handleFileChange}
                              type="file"
                              disabled={
                                userProfilePictureForm.formState.isSubmitting
                              }
                              aria-label="Upload profile picture"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    {/* IMPROVED: Show form validation messages */}
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              {/* IMPROVED: Loading state */}
              <Button
                type="submit"
                className="w-full"
                disabled={
                  userProfilePictureForm.formState.isSubmitting ||
                  !profilePicture
                }
              >
                {userProfilePictureForm.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageDialog;
