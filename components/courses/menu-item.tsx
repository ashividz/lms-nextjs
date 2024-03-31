import { useState } from "react";

interface MenuItemProps {
  tabTitle: string;
  isLast?: boolean;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const MenuItem = ({
  tabTitle,
  isLast,
  isActive,
  onClick,
  className,
}: MenuItemProps) => {
  return (
    <button
      className={`${className} ${
        isLast ? "" : "mr-4"
      } px-5 mx-4 py-3 text-md font-bold rounded-full ${
        isActive ? "bg-[#2f57ef] text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={onClick}
    >
      {tabTitle}
    </button>
  );
};

export default MenuItem;
