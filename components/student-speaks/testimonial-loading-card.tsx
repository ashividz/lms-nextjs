"use client";

import { Skeleton } from "@/components/ui/skeleton";

const TestimonialLoadingCard = () => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-4 mb-4 overflow-hidden">
      <div className="relative overflow-hidden w-full h-72">
        <div className="absolute inset-0 opacity-40"></div>
        <Skeleton className="w-full h-full  bg-slate-200 my-3" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white text-whiten text-white">
        <h3 className="text-xl font-semibold ml-2">
          <Skeleton className="w-full h-6 rounded-full bg-slate-200 my-3" />
        </h3>
      </div>
    </div>
  );
};

export default TestimonialLoadingCard;
