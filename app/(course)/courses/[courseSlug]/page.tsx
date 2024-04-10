import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseSlugPage = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
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
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.slug}/chapters/${course.chapters[0].id}`);
};

export default CourseSlugPage;
