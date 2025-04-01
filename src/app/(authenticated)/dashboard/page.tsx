"use client";

// import { headers } from "next/headers";

// import { auth } from "@/auth/auth";

const DashboardPage = () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const user = session?.user;
  // const { data: activeOrganization } = authClient.useActiveOrganization();

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/*<div>{JSON.stringify(user)}</div>*/}
        {/*<div>{JSON.stringify(activeOrganization)}</div>*/}
      </div>
    </div>
  );
};

export default DashboardPage;
