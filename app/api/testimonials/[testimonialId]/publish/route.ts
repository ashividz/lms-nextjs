import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { testimonialId } = params;

    const testimonial = await db.testimonials.findUnique({
      where: {
        id: testimonialId,
      },
    });

    if (!testimonial) {
      return NextResponse.json("Testimonial not found", { status: 404 });
    }

    if (!testimonial.studentName || !testimonial.imageUrl) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    const publishedTestimonial = await db.testimonials.update({
      where: {
        id: testimonialId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedTestimonial, { status: 200 });
  } catch (error) {
    console.log("[TESTIMONIAL_ID_PUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
