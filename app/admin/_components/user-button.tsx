"use client";

import { LoginButton } from "@/components/auth/login-button";
import { UserCircle2Icon } from "lucide-react";

const UserButton = () => {
  return (
    <div className="bg-white rounded-full p-2 border-rose-100">
      <LoginButton>
        <UserCircle2Icon size={22} className="cursor-pointer" />
      </LoginButton>
    </div>
  );
};

export default UserButton;
