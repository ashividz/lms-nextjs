import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; faqId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const faq = await db.faqs.findUnique({
      where: {
        id: params.faqId,
        courseId: params.courseId,
      },
    });
    if (!faq) {
      return NextResponse.json("Faq not found", { status: 404 });
    }

    const deletedFaq = await db.faqs.delete({
      where: {
        id: params.faqId,
        courseId: params.courseId,
      },
    });

    const pulishedFaqsInCourse = await db.faqs.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!pulishedFaqsInCourse.length) {
      await db.faqs.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedFaq, { status: 200 });
  } catch (error) {
    console.log("[FAQ_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; faqId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { isPublished, ...values } = await req.json();
    const faq = await db.faqs.update({
      where: {
        id: params.faqId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(faq, { status: 200 });
  } catch (error) {
    console.log("[COURSE_FAQ_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
