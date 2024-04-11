"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";

import ProfileItem from "../_components/profile-item";

const UserProfilePage = () => {
  const { userData } = useUser();
  let firstName = "";
  let lastName = "";
  if (userData) {
    const fullName = userData.name?.split(" ");

    if (fullName && fullName.length >= 1) {
      firstName = fullName[0];
    }
    if (fullName && fullName.length > 1) {
      lastName = fullName.slice(1).join(" ");
    }
  }

  return (
    <div className="bg-white rounded-md shadow-sm transition p-4">
      <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700">
        My Profile
      </h1>
      {!userData ? (
        <div className="flex flex-col justify-between w-full py-10">
          <div className="space-y-8 mt-4 w-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between w-full py-10">
          <ProfileItem
            label="Registration Number"
            value={
              userData?.registrationNumber || "Registration Number not set yet"
            }
          />
          <ProfileItem label="First Name" value={firstName} />
          <ProfileItem label="Last Name" value={lastName} />
          <ProfileItem
            label="Email"
            value={userData?.email || "No Email Found"}
          />
          <ProfileItem
            label="Phone Number"
            value={userData?.phoneNumber || "Phone Number not set yet"}
          />
          <ProfileItem
            label="Qualification"
            value={userData?.qualification || "Qualification not set yet"}
          />
          <ProfileItem
            label="Profession"
            value={userData?.profession || "Profession not set yet"}
          />
          <ProfileItem label="Bio" value={userData?.bio || "Bio not set yet"} />

          <ProfileItem
            label="Registration Date"
            value={
              userData && userData.createdAt
                ? new Date(userData.createdAt)
                : undefined
            }
          />
          <ProfileItem
            label="Last Profile Updated on"
            value={
              userData && userData.updateAt
                ? new Date(userData.updateAt)
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
