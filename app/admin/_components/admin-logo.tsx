"use client";
import Image from "next/image";
import Link from "next/link";

const AdminLogo = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="flex items-center justify-start mb-2"
    >
      <div className="relative w-[180px] h-14">
        <Image alt="logo" src="/unitus-logo.png" priority fill sizes="180px" />
      </div>
    </Link>
  );
};

export default AdminLogo;
