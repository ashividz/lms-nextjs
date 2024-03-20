import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title } = await req.json();

    const lastChapter = await db.chapters.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;
    const chapter = await db.chapters.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });
    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log("[COURSES]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
