"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-start">
      <div className="relative w-[170px] h-14">
        <Image alt="logo" src="/unitus-logo.png" priority fill sizes="170px" />
      </div>
    </Link>
  );
};

export default Logo;
