import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; faqId: string };
  }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { courseId, faqId } = params;
    const faq = await db.faqs.update({
      where: {
        id: faqId,
        courseId: courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedFaqInCourse = await db.faqs.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });
    if (!publishedFaqInCourse.length) {
      await db.courses.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(faq, { status: 200 });
  } catch (error) {
    console.log("[UNPUBLISH_FAQ]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
