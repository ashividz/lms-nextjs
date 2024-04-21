import type { Metadata } from "next";

import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { auth } from "@/auth";
import { CartProvider } from "@/context/cart-context";
import { UserCountryProvider } from "@/context/user-country-context";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Unitus LMS",
  description: "A Complete LMS for Unitus",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <ConfettiProvider />
          <ToastContainer />
          <NextTopLoader
            color="#ff3c28"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={false}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #ff3c28,0 0 5px #ff3c28"
          />
          <UserCountryProvider>
            <CartProvider>{children}</CartProvider>
          </UserCountryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
