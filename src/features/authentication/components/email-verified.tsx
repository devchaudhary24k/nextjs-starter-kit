"use client";

import { CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmailVerified() {
  return (
    <Card className="relative z-10 mx-auto w-full max-w-md border shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-700">
          <CheckCircle className="h-8 w-8 text-green-200" />
        </div>
        <CardTitle className="text-2xl font-bold">Email Verified!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Your email address has been successfully verified.
        </p>
        <p className="text-muted-foreground text-sm">
          You may now close this page and continue using your account.
        </p>
      </CardContent>
    </Card>
  );
}
