import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteFolderFromS3, deleteImageFromS3 } from "@/lib/s3utils";
import { NextResponse } from "next/server";

export async function DELETE(
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

    if (faculty.imageUrl) {
      const key = faculty.imageUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
      await deleteImageFromS3(key);
    }

    await deleteFolderFromS3(facultyId);

    const deletedFaculty = await db.faculty.delete({
      where: {
        id: facultyId,
      },
    });
    return NextResponse.json(deletedFaculty, { status: 200 });
  } catch (error) {
    console.log("[FACULTY_ID_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

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
    const { ...values } = await req.json();
    const faculty = await db.faculty.update({
      where: {
        id: facultyId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(faculty, { status: 200 });
  } catch (error) {
    console.log("[FACULTY_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
