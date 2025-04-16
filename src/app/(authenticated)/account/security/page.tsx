import { headers } from "next/headers";
import { notFound } from "next/navigation";

import SecuritySettingsForm from "@features/user/components/security-settings-form";

import { auth } from "@/auth/auth";

const SecurityPage = async () => {
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
