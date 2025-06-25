import Link from "next/link";

import { AlertCircle, ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EmailVerificationBrokenLink = () => {
  return (
    <Card className="relative z-10 mx-auto w-full max-w-md border shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-700">
          <AlertCircle className="h-8 w-8 text-red-100" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Invalid Link</h1>
          <p className="text-muted-foreground text-sm">
            This verification link appears to be broken
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6">
        <div className="space-y-4">
          <div className="bg-muted border-muted-foreground rounded-lg border p-4">
            <Mail className="mx-auto mb-3 h-6 w-6 text-gray-200" />
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium text-gray-200">
                Check Your Email Inbox
              </p>
              <p className="text-muted-foreground text-xs">
                We&apos;ve already sent you a verification email. Please go back
                to your email and look for the correct verification link.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Close This Page
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerificationBrokenLink;
