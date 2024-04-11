import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const userEmail = session?.user.email;
    const userDetails = await db.user.findUnique({
      where: {
        email: userEmail!,
      },
    });
    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    console.log("[USER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const userEmail = session?.user.email;
    const { firstName, lastName, ...values } = await req.json();

    const name = `${firstName} ${lastName}`;
    const user = await db.user.update({
      where: {
        email: userEmail!,
      },
      data: {
        name: name,
        ...values,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[USER_UPDATE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
