"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { useUser } from "@/context/user-context";
import {
  BookOpenText,
  Home,
  Settings,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export const UserButton = () => {
  const { userData } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userData?.image || "/assets/default-student.jpg"} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <Link href="/user/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/user/profile">
          <DropdownMenuItem className="cursor-pointer">
            <UserRound className="h-4 w-4 mr-2" />
            My Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/user/enrolled-courses">
          <DropdownMenuItem className="cursor-pointer">
            <BookOpenText className="h-4 w-4 mr-2" />
            Enrolled Courses
          </DropdownMenuItem>
        </Link>
        <Link href="/user/orders">
          <DropdownMenuItem className="cursor-pointer">
            <ShoppingBag className="h-4 w-4 mr-2" />
            My Orders
          </DropdownMenuItem>
        </Link>
        <Link href="/user/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer">
          <ExitIcon className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
