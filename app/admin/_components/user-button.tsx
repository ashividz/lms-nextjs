"use client";

import { UserCircle2Icon } from "lucide-react";

const UserButton = () => {
  return (
    <div className="bg-white rounded-full p-2 border-rose-100">
      <UserCircle2Icon size={22} className="cursor-pointer" />
    </div>
  );
};

export default UserButton;
