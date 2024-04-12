"use client";
import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import MobileMenu from "@/components/header/mobile-menu";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { UserProvider } from "@/context/user-context";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MobileMenu />
        <main className="pt-[70px] h-full">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </div>
    </UserProvider>
  );
};

export default WebsiteLayout;
