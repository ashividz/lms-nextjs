import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        <body className={inter.className} suppressHydrationWarning={true}>
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
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
