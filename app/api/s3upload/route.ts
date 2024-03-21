import { NextResponse } from "next/server";

import { deleteFolderFromS3, deleteImageFromS3 } from "@/lib/s3utils";
import { uploadFileToS3 } from "@/lib/s3utils";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    const previousImageUrl = formData.get("previousImageUrl") as string | null;
    const courseId = formData.get("courseId") as string | null;
    const chapterId = formData.get("chapterId") as string | null;
    const isAttachment = formData.get("isAttachment") as boolean | null;

    const filesMap: Record<string, File[]> = {};
    formData.forEach((value: File | string | Blob, key: string) => {
      if (value instanceof File) {
        if (!filesMap[key]) {
          filesMap[key] = [];
        }
        filesMap[key].push(value);
      }
    });

    if (previousImageUrl) {
      // delete previous image
      const key = previousImageUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION
        }.amazonaws.com/`
      )[1];

      await deleteImageFromS3(key);
    }
    let uploadedImageUrls: string[] | null = [];
    for (let fileName in filesMap) {
      if (Object.prototype.hasOwnProperty.call(filesMap, fileName)) {
        const files = filesMap[fileName];
        for (let file of files) {
          const fileContent = await file.arrayBuffer();
          // upload image
          if (chapterId) {
            const fileName = `${courseId}/chapters/${chapterId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else {
            const fileName = isAttachment
              ? `${courseId}/attachments/${file.name}`
              : `${courseId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          }
        }
      }
    }
    return NextResponse.json(uploadedImageUrls, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
