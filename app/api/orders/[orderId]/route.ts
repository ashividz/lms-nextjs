import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const order = await db.order.findMany({
      where: {
        userId: userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
