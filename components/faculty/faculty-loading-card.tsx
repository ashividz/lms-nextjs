"use client";

import { Skeleton } from "@/components/ui/skeleton";

const FacultyLoadingCard = () => {
  return (
    <div className="bg-white w-full rounded-lg shadow-md p-6 my-5 lg:flex lg:items-center lg:space-x-6">
      <div className="item-center text-center justify-center flex lg:w-1/4 ">
        <Skeleton className="w-40 h-40 rounded-full bg-slate-200 my-3" />
      </div>
      <div className="flex flex-col lg:w-3/4">
        <div className="text-center lg:text-left">
          <Skeleton className="w-full h-6 rounded-full bg-slate-200 my-3" />
          <Skeleton className="w-4/5 h-6 rounded-full bg-slate-200 my-3" />
        </div>
        <Skeleton className="w-3/4 h-6 rounded-md bg-slate-200 my-3" />
      </div>
    </div>
  );
};

export default FacultyLoadingCard;
