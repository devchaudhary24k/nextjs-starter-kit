"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HTMLAttributes } from "react";

import { onboarding } from "@features/authentication/actions/onboarding";
import { OnboardingSchema } from "@features/authentication/validators/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type OnboardingFormProps = {} & HTMLAttributes<HTMLFormElement>;

const OnboardingForm = ({ className, ...props }: OnboardingFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      organizationName: "",
      organizationSlug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
    await onboarding(values).then(async (response) => {
      if (response?.error) {
        form.reset();
        toast.error(response.error);
      }

      if (response?.organization) {
        form.reset();

        await authClient.organization.setActive({
          organizationId: response.organization.id,
        });

        toast.success(response.success);
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className={cn("mx-auto flex max-w-4xl flex-col gap-8", className)}>
      <Card className="overflow-hidden border py-0 shadow-sm">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form} {...props}>
            <form
              className="p-6 md:p-8 lg:p-10"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Welcome aboard
                  </h1>
                  <p className="text-muted-foreground max-w-md text-sm text-balance md:text-base">
                    Create your organization to get started with our platform.
                  </p>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Organization Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Acme Inc."
                            type="text"
                            className="h-11"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          This is how your organization will appear throughout
                          the platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationSlug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Organization Slug
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <div className="bg-muted text-muted-foreground flex h-11 items-center rounded-l-md border border-r-0 px-3 text-sm">
                              nsk.com/dashboard/
                            </div>
                            <Input
                              {...field}
                              placeholder="acme"
                              type="text"
                              className="h-11 rounded-l-none"
                              disabled={form.formState.isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          This will be used in your organization&apos;s URL and
                          cannot be changed later.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="mt-2 h-11 w-full"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Organization"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <div className="from-primary/10 to-background/5 absolute inset-0 z-10 bg-gradient-to-br" />
            <Image
              src="/hero-section-image.webp"
              fill
              alt="Collaboration illustration"
              className="object-cover object-center dark:brightness-[0.3] dark:contrast-125 dark:saturate-50"
              priority
            />
            <div className="absolute right-8 bottom-8 left-8 z-20">
              <div className="bg-background/80 dark:bg-background/30 rounded-lg p-4 shadow-lg backdrop-blur-sm">
                <h3 className="mb-1 text-lg font-semibold">
                  Start collaborating today
                </h3>
                <p className="text-muted-foreground text-sm">
                  Set up your organization and invite your team to get started.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary px-4 text-center text-xs [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-200">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default OnboardingForm;
