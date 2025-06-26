"use client";

import type { HTMLAttributes } from "react";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { createOrganization } from "@features/user/actions/create-organization";
import { CreateOrganizationSchema } from "@features/user/validators/organization-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { cn } from "@/lib/utils";

type CreateOrganizationFormProps = {} & HTMLAttributes<HTMLFormElement>;

const CreateOrganizationForm = ({
  className,
  ...props
}: CreateOrganizationFormProps) => {
  const form = useForm<z.infer<typeof CreateOrganizationSchema>>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: {
      organizationName: "",
      organizationSlug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateOrganizationSchema>) => {
    await createOrganization(values).then((response) => {
      if (response?.error) {
        form.reset();
        toast.error(response.error);
      }

      if (response?.organization) {
        form.reset();
        toast.success(response.success);
      }
    });
  };

  return (
    <Card className={cn("mx-auto w-1/2", className)}>
      <CardHeader>
        <CardTitle>Create new Organization</CardTitle>
        <CardDescription>
          Create a new organization to start inviting members.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form} {...props}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Organization Name */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="items-center">
                        <FormLabel className="mt-4">
                          Organization Name
                        </FormLabel>
                        <FormControl className="mt-2">
                          <Input
                            {...field}
                            placeholder="Enter organization name"
                            type="text"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Organization SLug */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="organizationSlug"
                  render={({ field }) => (
                    <FormItem>
                      <div className="items-center">
                        <FormLabel className="mt-4">
                          Organization Slug
                        </FormLabel>
                        <FormControl className="mt-2">
                          <Input
                            {...field}
                            placeholder="Enter organization Slug"
                            type="text"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                Create Organization
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateOrganizationForm;
