"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { checkEmailVerification } from "@features/authentication/actions/check-email-verification";
import { CheckCircle, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EmailVerificationSchema } from "../validators/auth-schema";
import EmailVerificationBrokenLink from "./email-verification-broken-link";

export default function EmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  const validation = EmailVerificationSchema.safeParse({ email, id });

  const [isResending, setIsResending] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if validation passed
    if (validation.error || !id || !email) return;

    // Proceed with email verification check
    const interval = setInterval(async () => {
      await checkEmailVerification({ id, email }).then((response) => {
        if (response.isVerified) {
          clearInterval(interval);
          router.push("/onboarding");
        }

        if (response.error) {
          clearInterval(interval);
          setHasError(true);
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [id, email, router, validation]);

  // Validate parameters using Zod schema
  if (validation.error || hasError) return <EmailVerificationBrokenLink />;

  const handleOpenEmail = () => {
    // Try to open the default email client
    window.location.href = "mailto:";
  };

  const handleResendEmail = async () => {
    setIsResending(true);

    setIsResending(false);
  };

  return (
    <Card className="relative z-10 mx-auto w-full max-w-md border shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-4 text-center">
        {/* <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/8">
          <Mail className="h-8 w-8 text-white" />
        </div> */}

        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/8">
          {/* Spinning ring around the mail icon */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-white/40" />
          <Mail className="relative z-10 h-8 w-8" />
        </div>
        <div className="space-y-2">
          <CardTitle className="">Waiting for Email Verification</CardTitle>
          <CardDescription className="text-muted-foreground text-base leading-relaxed">
            We&#39;ve sent a verification link to your email address. Please
            check your inbox and click the link to verify your account.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Button
            onClick={handleOpenEmail}
            className="w-full transform font-medium"
          >
            <Mail className="mr-2 h-4 w-4" />
            Open Email App
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="border-muted-foreground w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full text-gray-200"
          >
            {isResending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend verification email
              </>
            )}
          </Button>
        </div>

        <div className="border-muted-foreground bg-muted rounded-lg border p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-200" />
            <div className="text-sm text-gray-200">
              <p className="mb-1 font-medium">Didn&#39;t receive the email?</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• Try resending the verification email</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Need help?{" "}
            <a
              href="/support"
              className="text-white underline transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
