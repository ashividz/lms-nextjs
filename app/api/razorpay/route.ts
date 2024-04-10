import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // Define the order payload
    const orderPayload = {
      amount: 1000, // Amount in paisa (e.g., ₹10.00 ke liye 1000)
      currency: "INR", // Currency code (e.g., INR for Indian Rupee)
      receipt: "receipt_id_123", // Unique receipt id
      payment_capture: 1, // 1 for automatic capture, 0 for manual capture
    };

    // Create the order using Razorpay SDK
    const order = await razorpay.orders.create(orderPayload);

    // Return the order ID in the response
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("RAZORPAY_HANDLE", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
