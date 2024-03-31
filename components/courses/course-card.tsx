"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/lib/formatCurrency";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    imageUrl?: string | null;
    price?: number | null;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`max-w-sm rounded overflow-hidden shadow-lg transform transition-transform hover:shadow-xl hover:-translate-y-1 ${
        isInView ? "animate-slide-up" : ""
      }`}
    >
      <Link href={`/course/${course.slug}`}>
        <div className="h-full flex flex-col">
          <Image
            className="w-full"
            src={course.imageUrl || "https://via.placeholder.com/300x200"}
            alt={course.title || "Course Image"}
            width={300}
            height={200}
          />
          <div className="px-6 py-4 min-h-24">
            <div className="font-bold text-xl mb-2">{course.title}</div>
          </div>
          {course.price && (
            <div className="px-6 pt-4 pb-2">
              <div className="font-semibold text-xl text-emerald-800">
                {formatCurrency(course.price, "INR")}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
