import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { deleteFolderFromS3, deleteImageFromS3 } from "@/lib/s3utils";
import { currentUser } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

export async function DELETE(
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
    const { title, ...values } = await req.json();
    let slug: string | undefined;
    if (title) {
      slug = slugify(title);
    }

    const course = await db.courses.update({
      where: {
        id: courseId,
      },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...values,
      },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
