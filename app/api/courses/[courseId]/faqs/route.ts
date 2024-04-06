import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { title, description } = await req.json();

    const lastFaq = await db.faqs.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastFaq ? lastFaq.position + 1 : 1;

    const faq = await db.faqs.create({
      data: {
        title,
        description,
        courseId: params.courseId,
        position: newPosition,
      },
    });
    return NextResponse.json(faq, { status: 200 });
  } catch (error) {
    console.log("[COURSES_FAQ]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
