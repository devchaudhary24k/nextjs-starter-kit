import { db } from "@db/index";
import { member } from "@db/schema";
import { eq } from "drizzle-orm";

export const getActiveOrganization = async (userId: string) => {
  // Get the active organization for the user
  const data = await db.query.member.findFirst({
    where: eq(member.userId, userId),
    columns: {
      organizationId: true,
    },
  });

  console.log(data);
  return data;
};
