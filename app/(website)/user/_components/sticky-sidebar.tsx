"use client";

import Image from "next/image";

import MenuItem from "./menu-item";
import {
  BookOpenText,
  Home,
  LogOut,
  Settings,
  ShoppingBag,
  UserRound,
} from "lucide-react";

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
  return (
    <div className="sticky z-10 w-full top-20 mx-auto sm:px-2 px-4">
      <div className="bg-gray-100 p-4 right-0 border-2 border-[#1b88a7] rounded-md transition shadow-md overflow-y-auto">
        <div className="mb-4">
          <div className="mx-auto w-full flex border-b pb-3 pl-6">
            <h1 className="text-2xl font-bold">Welcome, Satendra Singh</h1>
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
