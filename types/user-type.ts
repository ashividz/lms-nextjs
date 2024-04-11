import { UserRole } from "@prisma/client";

export type userType = {
  id: string;
  registrationNumber: string | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  qualification: string | null;
  profession: string | null;
  bio: string | null;
  createdAt: Date | null;
  updateAt: Date | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
};
