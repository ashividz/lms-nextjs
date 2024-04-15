import React, { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import Image from "next/image";
import { Testimonials } from "@prisma/client";
import VideoPlayIcon from "../icons/video-play-icon";

interface TestimonialCardProps {
  testimonial: Testimonials;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative bg-white border-sky-400 border rounded-lg shadow-lg p-4 mb-4 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="relative overflow-hidden w-full h-72">
        <div className="absolute inset-0 opacity-40"></div>
        <Image
          src={testimonial.imageUrl || "/"}
          alt={testimonial.studentName}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-6 right-2 p-4">
        <VideoPlayIcon
          videoUrl={testimonial.videoUrl}
          isFree={true}
          className="w-14 h-14 text-[#e63212] cursor-pointer"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white text-whiten text-sky-600">
        <h3 className="text-xl font-semibold ml-2">
          {testimonial.studentName}
        </h3>
      </div>
    </div>
  );
};

export default TestimonialCard;
