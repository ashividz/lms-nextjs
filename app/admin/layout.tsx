"use client";

import AdminNavbar from "./_components/admin-navbar";
import AdminSidebar from "./_components/admin-sidebar";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[70px] md:pl-64 fixed inset-y-0 w-full z-50 shadow-sm">
        <AdminNavbar />
      </div>
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:inset-y-0 fixed z-50">
        <AdminSidebar />
      </div>
      <main className="md:pl-64 pt-[70px] h-full">{children}</main>
    </div>
  );
};

export default AdminDashboardLayout;
