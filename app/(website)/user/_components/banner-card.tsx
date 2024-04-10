"use client";

import { cn } from "@/lib/utils";
import { FaBookBookmark } from "react-icons/fa6";
import { PiCertificate } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Container from "@/components/container";
import { url } from "inspector";
import Image from "next/image";
import { User } from "@prisma/client";

interface BannerCardProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  className?: string;
}
const BannerCard = ({ className, user }: BannerCardProps) => {
  return (
    <div className={cn("w-full ", className)}>
      <Container>
        <div
          className="flex justify-start items-center flex-col lg:flex-row rounded-md p-12"
          style={{
            backgroundImage: 'url("/assets/student-cover-background.webp")',
            backgroundSize: "cover",
          }}
        >
          {/* User profile picture */}
          <div className="mr-4">
            <div className="mb-4 lg:mb-0 text-center lg:text-left ">
              <Image
                src={user.image ? user.image : "/assets/default-student.jpg"}
                alt="Default Student"
                width={180}
                height={100}
                className="rounded-full border-4 border-sky-100"
              />
            </div>
          </div>
          {/* User name and email */}
          <div>
            <h1 className="text-3xl font-bold text-sky-100 mb-2">
              {user.name}
            </h1>
            <p className="text-sky-100 mb-2">{user.email}</p>
            <div className="flex items-center mb-2">
              <p className="text-sky-100">
                <FaBookBookmark className="inline w-4 h-4 mr-2" />5 Course
                Enrolled
              </p>
              <div className="ml-auto md:ml-4">
                <p className="text-sky-100">
                  <PiCertificate className="inline w-4 h-4 mr-2" />4
                  Certificates
                </p>
              </div>
            </div>
            <p className="text-sky-100 text-muted-foreground">
              <SlCalender className="inline w-3 h-3 mr-2" />
              Registered on Jan 18 2024
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BannerCard;
