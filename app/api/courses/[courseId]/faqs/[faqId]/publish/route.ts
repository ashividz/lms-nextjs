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
    const faq = await db.faqs.findUnique({
      where: {
        id: faqId,
        courseId: courseId,
      },
    });

    if (!faq || !faq.title || !faq.description) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }
    const publishedFaq = await db.faqs.update({
      where: {
        id: faqId,
        courseId: courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedFaq, { status: 200 });
  } catch (error) {
    console.log("[FAQ_PUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
