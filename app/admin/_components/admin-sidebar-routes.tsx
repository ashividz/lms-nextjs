"use client";

import {
  BookOpenText,
  LayoutDashboard,
  UserRoundSearch,
  UsersRoundIcon,
} from "lucide-react";
import AdminSidebarItem from "./admin-sidebar-item";

const routes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: BookOpenText,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: UsersRoundIcon,
    label: "Faculties",
    href: "/admin/faculties",
  },
  {
    icon: UserRoundSearch,
    label: "Testimonials",
    href: "/admin/testimonials",
  },
];

const AdminSidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <AdminSidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default AdminSidebarRoutes;
