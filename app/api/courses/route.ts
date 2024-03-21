import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { title } = await req.json();
    const course = await db.courses.create({
      data: {
        title,
      },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("[COURSES]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
