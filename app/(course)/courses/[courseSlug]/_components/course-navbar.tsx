import { Chapters, Courses, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "./navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Courses & {
    chapters: (Chapters & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-[#e8fdff] shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
