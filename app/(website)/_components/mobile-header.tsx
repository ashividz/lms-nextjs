"use client";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Navbar } from "../../../components/header/navbar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu size={22} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Navbar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
