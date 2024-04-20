import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { orderId } = await req.json();

    const order = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
      include: {
        items: true,
        user: true,
      },
    });
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
