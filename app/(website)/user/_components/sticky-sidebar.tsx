"use client";

import { userType } from "@/types/user-type";
import MenuItem from "./menu-item";
import {
  BookOpenText,
  Home,
  LogOut,
  Settings,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";

const userMenu = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    menuIcon: Home,
  },
  {
    name: "My Profile",
    href: "/user/profile",
    menuIcon: UserRound,
  },
  {
    name: "Enrolled Courses",
    href: "/user/enrolled-courses",
    menuIcon: BookOpenText,
  },
  {
    name: "My Orders",
    href: "/user/orders",
    menuIcon: ShoppingBag,
  },
  {
    name: "Settings",
    href: "/user/settings",
    menuIcon: Settings,
  },
  {
    name: "Logout",
    href: "/user/logout",
    menuIcon: LogOut,
  },
];

const StickySidebar = () => {
  const { userData } = useUser();
  return (
    <div className="sticky z-10 w-full top-20 mx-auto sm:px-2 px-4 bg-white rounded-md transition shadow-md">
      <div className=" p-4 right-0 overflow-y-auto">
        <div className="mb-4">
          <div className="mx-auto w-full flex border-b pb-3 pl-1">
            {userData?.name ? (
              <h1 className="text-2xl font-bold">Welcome, {userData?.name}</h1>
            ) : (
              <Skeleton className="h-4 w-full rounded-xl" />
            )}
          </div>
          {userMenu.map((item) => (
            <MenuItem
              key={item.name}
              label={item.name}
              href={item.href}
              menuIcon={item.menuIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickySidebar;
