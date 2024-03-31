import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { deleteImageFromS3 } from "@/lib/s3utils";
import { currentUser } from "@/lib/auth";

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { courseId, attachmentId } = params;
    const uploadedFile = await db.attachements.findUnique({
      where: {
        id: attachmentId,
      },
      select: {
        url: true,
      },
    });
    if (uploadedFile?.url) {
      // delete previous image
      const key = uploadedFile.url.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
      await deleteImageFromS3(key);
    }
    const attachment = await db.attachements.delete({
      where: {
        courseId: courseId,
        id: attachmentId,
      },
    });
    return NextResponse.json(attachment, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ATTACHMENTS]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
