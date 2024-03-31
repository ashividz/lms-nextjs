"use client";

import Image from "next/image";
import { MdOutlineRotateLeft } from "react-icons/md";

import VideoPlayIcon from "@/components/icons/video-play-icon";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import CourseFeatureItem from "./course-feature-item";
import Container from "../container";

interface StickySidebarProps {
  imageUrl: string;
  coursePrice: number;
}

const StickySidebar = ({ imageUrl, coursePrice }: StickySidebarProps) => {
  return (
    <div className="sticky w-full top-20 mx-auto sm:px-2 px-4">
      <div className=" bg-gray-100 p-4 right-0 border-2 border-[#1b88a7] rounded-md transition shadow-md overflow-y-auto">
        {/* Course Preview Options */}
        <div className="mb-4">
          <div className="relative">
            <Image
              src={imageUrl}
              alt="Course Preview"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoPlayIcon />
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
              <span className="text-webprimary text-lg font-semibold ml-3 color-ping  ">
                Few Seats Left
              </span>
            </h3>
          </div>
        </div>
        {/* Add to Cart Button */}
        <Button className="bg-blue-500 text-white hover:bg-blue-600 text-md font-bold px-4 py-7 rounded-md mb-2 w-full">
          Add to Cart
        </Button>

        {/* Buy Now Button */}
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
