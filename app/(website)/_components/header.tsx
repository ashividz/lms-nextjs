"use client";

import Logo from "@/components/logo";
import Container from "./container";
import { UserButton } from "@/components/auth/user-button";
import { Navbar } from "../../../components/header/navbar";
import Usermenu from "../../../components/header/user-menu";
import { SearchInput } from "@/components/header/search-input";
import CartIcon from "@/components/header/cart-icon";

export const Header = () => {
  return (
    <header className="fixed hidden md:block w-full bg-white shadow-sm z-10">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Navbar />
            {/* <SearchInput /> */}
            <CartIcon />
            <Usermenu />
          </div>
        </Container>
      </div>
    </header>
  );
};
