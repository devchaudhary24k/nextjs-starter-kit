import type { auth } from "@/auth/auth";

export type Session = typeof auth.$Infer.Session;
export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type Invitation = typeof auth.$Infer.Invitation;
export type Organization = typeof auth.$Infer.Organization;
export type User = typeof auth.$Infer.Session.user;

export type OrganizationList = Organization[];
