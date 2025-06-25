import Image from "next/image";
import { Suspense } from "react";

import EmailVerification from "@features/authentication/components/email-verification";

const VerifyEmail = () => {
  return (
    <main className="bg-muted relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <EmailVerification />
      </Suspense>
      <div className="absolute top-0 right-0 h-screen w-screen">
        <Image
          className="dark:brightness-[0.5] dark:grayscale"
          src="/hero-section-image.webp"
          alt="Background Image"
          fill
        />
      </div>
    </main>
  );
};

export default VerifyEmail;
