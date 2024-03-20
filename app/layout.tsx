import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

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
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
