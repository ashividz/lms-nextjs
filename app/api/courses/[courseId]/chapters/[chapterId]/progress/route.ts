import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { isCompleted } = await req.json();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const purchase = await db.purchase.create({
    //   data: {
    //     userId: userId as string,
    //     courseId: params.courseId,
    //   },
    // });
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId as string,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: userId as string,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
