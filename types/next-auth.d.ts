import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      permissions: string[];
      isActive: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    role?: string;
    permissions?: string[];
    isActive?: boolean;
  }
}