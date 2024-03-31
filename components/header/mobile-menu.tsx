"use client";

import { FaBars, FaHome } from "react-icons/fa";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BsCart3 } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminSidebar from "@/app/admin/_components/admin-sidebar";
import { MobileMenuItems } from "./mobile-menu-items";
import { LoginForm } from "../auth/login-form";

const MobileMenu = () => {
  return (
    <div className="fixed md:hidden z-50 bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Sheet>
            <SheetTrigger className="flex flex-col items-center justify-center">
              <FaBars size={24} className="mb-1" />
              <span className="text-xs">Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <MobileMenuItems />
            </SheetContent>
          </Sheet>
        </div>
        <div>
          <Link href="/" className="flex flex-col items-center justify-center">
            <button className="flex flex-col items-center justify-center">
              <FaHome size={24} className="mb-1" />
              <span className="text-xs">Home</span>
            </button>
          </Link>
        </div>
        <div>
          <Link
            href="/courses"
            className="flex flex-col items-center justify-center"
          >
            <button className="flex flex-col items-center justify-center">
              <PiBookOpenTextLight size={24} className="mb-1" />
              <span className="text-xs">Courses</span>
            </button>
          </Link>
        </div>
        <div>
          <Sheet>
            <SheetTrigger className="flex flex-col items-center justify-center">
              <BsCart3 size={24} className="mb-1" />
              <span className="text-xs">Cart</span>
            </SheetTrigger>
            <SheetContent side="right">
              <h2>TODO Cart Section</h2>
            </SheetContent>
          </Sheet>
        </div>
        <div>
          <Sheet>
            <SheetTrigger className="flex flex-col items-center justify-center">
              <RiAccountCircleLine size={24} className="mb-1" />
              <span className="text-xs">My Account</span>
            </SheetTrigger>
            <SheetContent side="right">
              <LoginForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
