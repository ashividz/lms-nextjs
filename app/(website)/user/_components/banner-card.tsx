"use client";

import { useState } from "react";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { FaBookBookmark } from "react-icons/fa6";
import { PiCertificate } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { userType } from "@/types/user-type";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";

interface BannerCardProps {
  className?: string;
}

const BannerCard = ({ className }: BannerCardProps) => {
  const { userData } = useUser();
  const handleImageChange = () => {
    // Logic to open the file select dialog
    console.log("Open file select dialog");
  };

  return (
    <div className={cn("w-full sticky top-[70px] z-10", className)}>
      <Container>
        <div className="flex flex-col lg:flex-row justify-between rounded-md bg-gradient-to-r from-fuchsia-500 to-cyan-500">
          <div className="m-8 flex flex-col lg:flex-row items-center justify-start">
            <div className="mr-4 relative">
              <div className="mb-4 lg:mb-0 text-center lg:text-left ">
                <Image
                  src={
                    userData?.image
                      ? userData?.image
                      : "/assets/default-student.jpg"
                  }
                  alt="Default Student"
                  width={180}
                  height={100}
                  className="relative rounded-full border-4 border-sky-100"
                />
                <div className="absolute bottom-1 right-4">
                  <button className="flex items-center justify-center bg-gray-800 text-white p-2 rounded-full">
                    <label htmlFor="image-upload" title="Upload Image">
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden cursor-pointer"
                        onChange={handleImageChange}
                      />
                      <CameraIcon className="w-4 h-4 cursor-pointer" />
                    </label>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <div className="ml-0 lg:ml-4">
                {userData?.name ? (
                  <h1 className="text-3xl font-bold text-sky-100 mb-2">
                    {userData?.name}
                  </h1>
                ) : (
                  <Skeleton className="h-8 w-[300px] rounded-xl mb-2" />
                )}
                {userData?.email ? (
                  <p className="text-sky-100 mb-2">{userData?.email}</p>
                ) : (
                  <Skeleton className="h-5 w-[300px] rounded-xl" />
                )}

                {/* Render the "5 Courses Enrolled" text */}
                <p className="text-sky-100 mr-4">
                  <FaBookBookmark className="inline w-4 h-4 mr-2" />5 Courses
                  Enrolled
                </p>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center ml-0 lg:ml-4 mt-4 lg:mt-0">
                <p className="text-sky-100 mr-4 mt-2 lg:mt-0">
                  <PiCertificate className="inline w-4 h-4 mr-2" />4
                  Certificates
                </p>
                <p className="text-sky-100 mt-2 lg:mt-0 text-muted-foreground">
                  <SlCalender className="inline w-3 h-3 mr-2" /> Registered on
                  Jan 18 2024
                </p>
              </div>
            </div>
          </div>
          <div className="m-0 lg:ml-10 mt-8 lg:mt-0 hidden lg:block items-end justify-end text-end">
            <Image
              src={"/assets/student.png"}
              alt="Banner Card"
              width={300}
              height={300}
              className="mr-10"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BannerCard;
