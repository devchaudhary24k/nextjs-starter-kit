import OnboardingForm from "@features/authentication/components/onboarding-form";

/**
 * Onboarding Page
 *
 * This page wraps the onboarding form.
 *
 * @returns  Renders UI for the page
 */
const Page = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default Page;
