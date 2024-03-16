"use client";

import AdminMobileSidebar from "./admin-mobile-sidebar";
import AdminNavbarRoutes from "./admin-navbar-routes";

const AdminNavbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-[#e8fdff]">
      <AdminMobileSidebar />
      <AdminNavbarRoutes />
    </div>
  );
};

export default AdminNavbar;
