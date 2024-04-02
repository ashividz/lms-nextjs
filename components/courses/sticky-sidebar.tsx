"use client";

import Image from "next/image";
import { MdOutlineRotateLeft } from "react-icons/md";

import VideoPlayIcon from "@/components/icons/video-play-icon";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import CourseFeatureItem from "@/components/courses/course-feature-item";
import AddToCart from "@/components/cart/add-to-cart";
import { CartItem } from "@/types/cart-item";

interface StickySidebarProps {
  course: CartItem;
  imageUrl: string;
  coursePrice: number;
  videoUrl: string;
  isFree: boolean;
}

const StickySidebar = ({
  course,
  imageUrl,
  coursePrice,
  videoUrl,
  isFree,
}: StickySidebarProps) => {
  return (
    <div className="sticky z-10 w-full top-20 mx-auto sm:px-2 px-4">
      <div className="bg-gray-100 p-4 right-0 border-2 border-[#1b88a7] rounded-md transition shadow-md overflow-y-auto">
        <div className="mb-4">
          <div className="relative">
            <Image
              src={course.imageUrl || "/placeholder.jpg"}
              alt={course.title || "Course Image"}
              width={950}
              height={600}
              className="rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoPlayIcon videoUrl={videoUrl} isFree={isFree} />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {formatCurrency(coursePrice, "INR")}
            </h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              <span className="text-webprimary text-lg font-semibold ml-3 color-ping">
                Few Seats Left
              </span>
            </h3>
          </div>
        </div>
        <AddToCart item={course} />
        <Button className="bg-green-500 text-white hover:bg-green-600 text-md font-bold px-4 py-7 rounded-md mb-2 w-full">
          Buy Now
        </Button>
        <p className="flex items-center justify-center text-muted-foreground text-md text-center text-gray-600">
          <MdOutlineRotateLeft className="w-4 h-4 mr-1" />
          15 days money back guarantee
        </p>
        <CourseFeatureItem title="Duration" value="3 Months" />
        <CourseFeatureItem title="Certificate" value="Yes" />
        <CourseFeatureItem title="Exams" value="Yes" />
        <CourseFeatureItem
          title="Experience Level"
          value="No experience required"
        />
        <CourseFeatureItem title="Language" value="English - Hindi" />
      </div>
    </div>
  );
};

export default StickySidebar;
