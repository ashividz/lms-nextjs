import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { facultyId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { facultyId } = params;

    const faculty = await db.faculty.findUnique({
      where: {
        id: facultyId,
      },
    });

    if (!faculty) {
      return NextResponse.json("Faculty not found", { status: 404 });
    }

    const unPublishedFaculty = await db.faculty.update({
      where: {
        id: facultyId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unPublishedFaculty, { status: 200 });
  } catch (error) {
    console.log("[FACULTY_ID_UNPUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
