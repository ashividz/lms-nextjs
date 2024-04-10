import { Categories, Chapters, Courses, Faqs } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

type CourseWithProgressWithCategory = Courses & {
  category: Categories | null;
  chapters: Chapters[];
  faqs: Faqs[];
  progress: number | null;
};

export const getCourseBySlug = async ({
  courseSlug,
}: {
  courseSlug?: string;
}): Promise<CourseWithProgressWithCategory | null> => {
  try {
    if (courseSlug === undefined) {
      throw new Error("Course slug is required");
    }

    const user = await currentUser();
    const userId: string | undefined = user?.id;

    const course = await db.courses.findFirst({
      where: {
        isPublished: true,
        slug: courseSlug,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        faqs: {
          orderBy: {
            position: "asc",
          },
          where: {
            isPublished: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
    });

    if (!course) {
      return null;
    }
    if (course.purchases.length === 0) {
      return {
        ...course,
        progress: null,
      };
    }
    const progressPercentage = userId
      ? await getProgress(userId, course.id)
      : null;

    return {
      ...course,
      progress: progressPercentage,
    };
  } catch (error) {
    console.log("[GET_COURSE_BY_SLUG]", error);
    return null;
  }
};
