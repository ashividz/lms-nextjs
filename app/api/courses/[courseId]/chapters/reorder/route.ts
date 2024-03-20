import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { list } = await req.json();
    for (let item of list) {
      await db.chapters.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }
    return NextResponse.json("Course chapters reordered successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[COURSE_REORDER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
