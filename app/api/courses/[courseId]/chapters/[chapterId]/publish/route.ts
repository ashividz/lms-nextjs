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
    const chapter = await db.chapters.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    if (
      !chapter ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }
    const publishedChapter = await db.chapters.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedChapter, { status: 200 });
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
