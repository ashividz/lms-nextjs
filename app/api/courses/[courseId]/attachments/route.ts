import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const urls = await req.json();
    if (urls) {
      urls.forEach(async (url: string) => {
        if (url) {
          const name = url.split("/").pop();
          const attachments = await db.attachements.create({
            data: {
              url,
              name: name as string,
              courseId: params.courseId,
            },
          });
        }
      });
    }

    return NextResponse.json("Attachments created successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[COURSE_ATTACHMENTS]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
