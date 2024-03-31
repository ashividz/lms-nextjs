"use client";

import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CartIcon = () => {
  return (
    <div className="cursor-pointer max-w-xs hidden md:block">
      <Sheet>
        <SheetTrigger className="flex-col items-center justify-center hidden md:flex">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
        </SheetTrigger>
        <SheetContent side="right">
          <h2>TODO Cart Section</h2>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartIcon;
