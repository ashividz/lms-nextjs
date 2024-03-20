import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string };
  }
) {
  try {
    const { courseId, chapterId } = params;
    const chapter = await db.chapters.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedChapterInCourse = await db.chapters.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });
    if (!publishedChapterInCourse.length) {
      await db.courses.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log("[UNPUBLISH_CHAPTER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
