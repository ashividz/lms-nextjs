"use client";
import { useState } from "react";

import { UserButton } from "@/components/auth/user-button";

const Usermenu = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
          p-1
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          max-w-xs
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Usermenu;
