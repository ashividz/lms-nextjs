import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.event) {
      return NextResponse.json("Invalid request body format", { status: 400 });
    }

    const { event, payload } = body;
    const razorpaySignature = req.headers.get("x-razorpay-signature");

    const isValidSignature = validateWebhookSignature(
      JSON.stringify(body),
      razorpaySignature as string,
      process.env.RAZORPAY_WEBHOOK_SECRET as string
    );

    if (!isValidSignature) {
      return NextResponse.json("Invalid webhook signature", { status: 400 });
    }

    switch (event) {
      case "payment.captured":
        await handlePaymentCaptured(payload);
        break;
      case "payment.failed":
        console.log("Payment failed:", payload.payment.entity);
        break;
      default:
        console.log("Unknown event type:", event);
    }

    return NextResponse.json("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("[RAZORPAY_WEBHOOK]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

async function handlePaymentCaptured(payload: any): Promise<void> {
  try {
    const paymentEntity = payload.payment.entity;
    console.log("Payment captured:", paymentEntity);
    const orderId = paymentEntity.order_id;

    const order = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) {
      console.log("Order not found");
      return;
    }

    await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentStatus: "Paid",
      },
    });

    const items = await db.item.findMany({
      where: {
        orderId: order.id,
      },
    });

    // Iterate over items and check if the user has already purchased each course
    for (const item of items) {
      // Check if the user has already purchased the course
      const existingPurchase = await db.purchase.findFirst({
        where: {
          userId: order.userId,
          courseId: item.courseId as string,
        },
      });

      // If the user has not already purchased the course, insert it
      if (!existingPurchase) {
        await db.purchase.create({
          data: {
            courseId: item.courseId as string,
            userId: order.userId,
          },
        });
      }
    }

    console.log("Payment captured successfully");
  } catch (error) {
    console.error("Error handling captured payment:", error);
  }
}
