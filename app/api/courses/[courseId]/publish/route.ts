import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { courseId } = params;

    const course = await db.courses.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json("Course not found", { status: 404 });
    }

    const hasPulishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (!hasPulishedChapter) {
      return NextResponse.json("Course has no published chapters", {
        status: 400,
      });
    }

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.price
    ) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    const publishedCourse = await db.courses.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedCourse, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
