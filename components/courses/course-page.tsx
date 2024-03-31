import Image from "next/image";

import { cn } from "@/lib/utils";
import CourseContainer from "@/components/courses/course-container";
import CourseDetails from "@/components/courses/course-details";

interface CoursePageProps {
  course: {
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    chapters: {
      id: string;
      title: string;
      description: string | null;
      videoUrl: string | null;
      position: number;
      isPublished: boolean;
      isFree: boolean;
      createdAt: Date;
    }[];
    faqs: {
      id: string;
      title: string;
      description: string | null;
      position: number;
      isPublished: boolean;
      createdAt: Date;
    }[];
  };
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
