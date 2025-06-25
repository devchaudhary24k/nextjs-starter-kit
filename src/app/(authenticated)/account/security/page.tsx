import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import SecuritySettingsForm from "@features/user/components/security-settings-form";

import { auth } from "@/auth/auth";

/**
 * Security Page.
 *
 * Server‑component page rendering user security settings.
 * Fetches active sessions and shows
 * password, MFA, passkey options.
 *
 * @async
 * @returns {Promise<JSX.Element>} Page UI or triggers 404 via `notFound()`.
 */
const SecurityPage = async (): Promise<JSX.Element> => {
  const h = await headers();

  const sessionList = await auth.api.listSessions({
    headers: h,
  });

  if (!sessionList) return notFound();

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-10 pt-4">
        <SecuritySettingsForm sessionList={sessionList} />
      </div>
    </div>
  );
};
export default SecurityPage;
