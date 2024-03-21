"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AdminSidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const AdminSidebarItem = ({
  href,
  label,
  icon: Icon,
}: AdminSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/dashboard") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all text-sky-700 hover:bg-sky-500/10 hover:text-sky-700",
        isActive && "bg-sky-500 text-white hover:bg-sky-700 hover:text-white"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
      <div
        className={cn(
          "h-full ml-auto opacity-0 transition-all border-2 border-sky-700",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};

export default AdminSidebarItem;
