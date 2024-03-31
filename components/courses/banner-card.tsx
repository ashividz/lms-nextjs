"use client";

import { cn } from "@/lib/utils";
import Container from "@/components/container";
import CourseRatingDetails from "@/components/courses/course-rating-details";
import CourseBreadcum from "@/components/courses/course-breadcum";
import CourseAuthor from "@/components/courses/course-author";
import CourseUpdateDetails from "@/components/courses/course-update-details";
import StickySidebar from "@/components/courses/sticky-sidebar";

import guestAuthor from "@/public/assets/guest-user.webp";

interface BannerCardProps {
  course: {
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
  };
  className?: string;
}
const BannerCard = ({ course, className }: BannerCardProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center bg-gradient-to-b from-cyan-50 via-teal-300 to-sky-400 ",
        className
      )}
    >
      <Container>
        <div className="flex justify-between items-start flex-col lg:flex-row">
          <div className="w-full lg:pr-8">
            <CourseBreadcum currentCourse={course.title} />
            <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
              {course.title}
            </h1>
            <div className="mb-4 lg:mb-0 text-center lg:text-left">
              {/* Apply margin bottom on smaller screens */}
              {course.description && (
                <p className="text-gray-700 lg:text-base break-words">
                  {course.description}
                </p>
              )}
            </div>
            <CourseRatingDetails
              rating={4.8}
              reviews={1560}
              enrolledStudentCount={2365}
            />
            <CourseAuthor
              authorName="Satendra Singh"
              authorPhoto={guestAuthor}
            />
            <CourseUpdateDetails
              lastUpdateDate="March 25, 2024"
              language="English | Hindi"
              certificate="Certified Course"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BannerCard;
