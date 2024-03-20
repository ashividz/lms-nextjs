import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { deleteFolderFromS3, deleteImageFromS3 } from "@/lib/s3utils";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
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

    for (const chapter of course.chapters) {
      //delete chapter video

      if (chapter.videoUrl) {
        const key = chapter.videoUrl.split(
          `${process.env.AWS_BUCKET_NAME as string}.s3.${
            process.env.AWS_REGION as string
          }.amazonaws.com/`
        )[1];
        await deleteImageFromS3(key);
      }

      await db.chapters.delete({
        where: {
          id: chapter.id,
          courseId: course.id,
        },
      });
    }

    await deleteFolderFromS3(courseId);

    const deletedCourse = await db.courses.delete({
      where: {
        id: courseId,
      },
    });
    return NextResponse.json(deletedCourse, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const values = await req.json();
    const course = await db.courses.update({
      where: {
        id: courseId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
