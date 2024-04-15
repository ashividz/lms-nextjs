import { db } from "@/lib/db";
import { uploadFileToS3 } from "@/lib/s3utils";
import { NextResponse } from "next/server";
import CareerThankyouMail from "@/emails/career-thankyou-mail";
import { render } from "@react-email/render";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // const { resume, phoneNumber, ...data } = Object.fromEntries(
    //   formData.entries()
    // );

    const file = formData.get("resume");
    const phoneNumber = formData.get("phoneNumber");

    if (!file || typeof file === "string") {
      // Handle error if file is not present in formData
      return NextResponse.json("No file uploaded or invalid file", {
        status: 400,
      });
    }
    const fileName = `career/${phoneNumber}/${file.name}`;
    const fileContent = await file.arrayBuffer();
    const uploadedData = await uploadFileToS3(
      fileContent as Buffer,
      file.type,
      fileName
    );
    if (!uploadedData) {
      return NextResponse.json("Resume File upload failed to S3", {
        status: 400,
      });
    }
    const resumeUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    const combinedData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      qualification: formData.get("qualification") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      bio: formData.get("bio") as string,
      zip: formData.get("zip") as string,
      positionApplied: formData.get("positionApplied") as string,
      resume: resumeUrl as string,
    };

    const career = await db.career.create({
      data: combinedData,
    });

    await sendEmail({
      to: combinedData.email,
      subject: "Thank you for applying for a career at Unitus LMS",
      html: render(
        CareerThankyouMail({
          name: combinedData.name,
          jobPosition: combinedData.positionApplied,
        })
      ),
    });

    return NextResponse.json("Form Submitted", { status: 200 });
  } catch (error) {
    console.log("[CAREER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
