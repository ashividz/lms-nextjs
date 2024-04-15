import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { name } = await req.json();
    const faculty = await db.faculty.create({
      data: {
        name,
      },
    });
    return NextResponse.json(faculty, { status: 200 });
  } catch (error) {
    console.log("[FACULTY]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const faculties = await db.faculty.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isPublished: true,
      },
    });
    return NextResponse.json(faculties, { status: 200 });
  } catch (error) {
    console.log("[FACULTIES]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
