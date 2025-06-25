import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import AccountSettingsForm from "@features/user/components/account-settings-form";

import { auth } from "@/auth/auth";

/**
 * Account Settings Page.
 *
 * This page fetches the current user session (server-side), and, if authenticated,
 * renders the account settings form populated with the user's data.
 * If no user session is found, the page responds with a 404.
 *
 * @async
 * @returns {Promise<JSX.Element>} The rendered account settings page, or triggers a 404 if not authenticated.
 */
const AccountPage = async (): Promise<JSX.Element> => {
  const h = await headers();

  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) return notFound();

  const user: Pick<typeof session.user, "name" | "email" | "image"> = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-10 pt-4">
        <AccountSettingsForm user={user} />
      </div>
    </div>
  );
};

export default AccountPage;
