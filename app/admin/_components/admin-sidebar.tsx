"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpenText, LayoutDashboard, UsersRoundIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import AdminLogo from "./admin-logo";
import AdminSidebarRoutes from "./admin-sidebar-routes";

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full border-r shadow-sm overflow-y-auto bg-[#e8fdff] text-sky-700">
      <div className="border-b p-4">
        <AdminLogo />
      </div>
      <div className="flex flex-col w-full">
        <AdminSidebarRoutes />
      </div>
    </div>
  );
};

export default AdminSidebar;
