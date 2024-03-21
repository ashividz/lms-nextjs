import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string };
  }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
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
