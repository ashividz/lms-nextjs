import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
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
    console.log("[ORDER_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
