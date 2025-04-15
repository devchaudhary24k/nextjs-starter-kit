import { headers } from "next/headers";
import { notFound } from "next/navigation";

import AccountSettingsForm from "@features/user/components/account-settings-form";

import { auth } from "@/auth/auth";

const AccountPage = async () => {
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
