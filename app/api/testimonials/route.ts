import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { studentName } = await req.json();
    const testimonial = await db.testimonials.create({
      data: {
        studentName,
      },
    });
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.log("[TESTIMONIAL]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const testimonials = await db.testimonials.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isPublished: true,
      },
    });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.log("[TESTIMONIAL]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
