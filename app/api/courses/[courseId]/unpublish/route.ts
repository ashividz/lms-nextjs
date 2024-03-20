import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    const course = await db.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return NextResponse.json("Course not found", { status: 404 });
    }

    const unPublishedCourse = await db.courses.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unPublishedCourse, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
