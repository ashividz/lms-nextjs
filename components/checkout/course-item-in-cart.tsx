"use client";

import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";

interface CourseItemInCartProps {
  title: string;
  price: number;
  quantity: number;
}

const CourseItemInCart = ({
  title,
  price,
  quantity,
}: CourseItemInCartProps) => {
  return (
    <div
      className={cn(
        "flex mx-2 my-4   items-center justify-between",
        title === "Grand Total" ? "" : "border-b-2 pb-2 border-gray-100"
      )}
    >
      <div>
        <span
          className={cn(
            "text-gray-600 mr-2",
            title === "Grand Total" ? "font-bold" : ""
          )}
        >
          {title}
        </span>
        <span>x {quantity}</span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-600 mr-2",
            title === "Grand Total" ? "font-bold" : ""
          )}
        >
          {formatCurrency(price * quantity, "INR")}
        </span>
      </div>
    </div>
  );
};

export default CourseItemInCart;
