import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { deleteImageFromS3 } from "@/lib/s3utils";
import { currentUser } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapters.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    if (!chapter) {
      return NextResponse.json("Chapter not found", { status: 404 });
    }
    if (chapter.videoUrl) {
      // delete previous video
      const key = chapter.videoUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
      await deleteImageFromS3(key);
    }
    const deletedChapter = await db.chapters.delete({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const pulishedChaptersInCourse = await db.chapters.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!pulishedChaptersInCourse.length) {
      await db.courses.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter, { status: 200 });
  } catch (error) {
    console.log("[CHAPTER_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { isPublished, ...values } = await req.json();
    const chapter = await db.chapters.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
