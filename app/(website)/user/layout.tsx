"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/container";
import BannerCard from "./_components/banner-card";
import StickySidebar from "./_components/sticky-sidebar";
import { userType } from "@/types/user-type";
import { UserProvider } from "@/context/user-context";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  // const [userData, setUserData] = useState<userType | null>(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get("/api/user");

  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <>
      <UserProvider>
        <div className="relative h-full bg-slate-100">
          <div className="absolute inset-0 w-full h-[300px] bg-gradient-to-b from-cyan-50 via-teal-300 to-sky-400" />
          <div className="z-10 relative flex justify-center items-center h-full">
            <BannerCard className="pt-10 lg:pt-12 mt-14" />
          </div>
        </div>

        <div className="w-full bg-slate-100 py-12">
          <Container>
            <div className=" flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/4 lg:pr-2">
                <StickySidebar />
              </div>
              <div className="w-full lg:w-3/4">{children}</div>
            </div>
          </Container>
        </div>
      </UserProvider>
    </>
  );
};

export default UserLayout;
