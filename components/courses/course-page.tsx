"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import CourseContainer from "@/components/courses/course-container";
import CourseDetails from "@/components/courses/course-details";
import { Categories, Chapters, Courses, Faqs } from "@prisma/client";

type CourseWithProgressWithCategory = Courses & {
  category: Categories | null;
  chapters: Chapters[];
  faqs: Faqs[];
  progress: number | null;
};

interface CoursePageProps {
  course: CourseWithProgressWithCategory;
  className?: string;
}

const CoursePage = ({ course, className }: CoursePageProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-start justify-between text-start bg-gray-100",
        className
      )}
    >
      <CourseContainer>
        <div className="w-full text-start items-start bg-white rounded-md shadow-sm p-4">
          <div className="relative w-full h-full">
            <Image
              src={course.imageUrl || "/placeholder.jpg"}
              alt={course.title || "Course Image"}
              width={950}
              height={600}
              className="rounded-md"
            />
          </div>
        </div>
        <CourseDetails course={course} />
      </CourseContainer>
    </div>
  );
};

export default CoursePage;
