import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getProgress } from "@/actions/get-progress";

import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";

const CourseWatchLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseSlug: string };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const course = await db.courses.findUnique({
    where: {
      slug: params.courseSlug,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: user?.id,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(user.id!, course.id);

  return (
    <div className="h-full">
      <div className="h-[70px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[70px] h-full">{children}</main>
    </div>
  );
};

export default CourseWatchLayout;
