import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteFolderFromS3, deleteImageFromS3 } from "@/lib/s3utils";
import { NextResponse } from "next/server";

export async function DELETE(
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

    if (testimonial.videoUrl) {
      const key = testimonial.videoUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
      await deleteImageFromS3(key);
    }
    if (testimonial.imageUrl) {
      const key = testimonial.imageUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
      await deleteImageFromS3(key);
    }

    await deleteFolderFromS3(testimonialId);

    const deletedTestimonial = await db.testimonials.delete({
      where: {
        id: testimonialId,
      },
    });
    return NextResponse.json(deletedTestimonial, { status: 200 });
  } catch (error) {
    console.log("[TESTIMONIAL_ID_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

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
    const { ...values } = await req.json();
    const testimonial = await db.testimonials.update({
      where: {
        id: testimonialId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.log("[TESTIMONIAL_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
