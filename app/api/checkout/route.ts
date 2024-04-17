import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const body = await req.json();

    const existingBillingAddress = await db.billingAddress.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (existingBillingAddress) {
      await db.billingAddress.update({
        where: {
          id: existingBillingAddress.id,
        },
        data: {
          address: body.billing_address,
          city: body.billing_city,
          country: body.billing_country,
          state: body.billing_state,
          zip: body.billing_zip,
        },
      });
    } else {
      await db.billingAddress.create({
        data: {
          address: body.billing_address,
          city: body.billing_city,
          country: body.billing_country,
          state: body.billing_state,
          zip: body.billing_zip,
          userId: user.id as string,
        },
      });
    }
    const existingShippingAddress = await db.shippingAddress.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (existingShippingAddress) {
      await db.shippingAddress.update({
        where: {
          id: existingShippingAddress.id,
        },
        data: {
          address: body.shipping_address,
          city: body.shipping_city,
          country: body.shipping_country,
          state: body.shipping_state,
          zip: body.shipping_zip,
        },
      });
    } else {
      await db.shippingAddress.create({
        data: {
          address: body.shipping_address,
          city: body.shipping_city,
          country: body.shipping_country,
          state: body.shipping_state,
          zip: body.shipping_zip,
          userId: user.id as string,
        },
      });
    }

    let totalAmount = 0;
    let subTotal = 0;
    let taxTotal: number | null = 0 || null;
    if (body.currency === "INR") {
      totalAmount = body.courses.reduce((acc: number, item: any) => {
        // Calculate subtotal for each item
        const subtotal = item.price * item.quantity;
        return acc + subtotal;
      }, 0);
      const tax = totalAmount * 0.18 || 0;
      taxTotal = parseFloat(tax.toFixed(2));
      subTotal = totalAmount - taxTotal;
    } else {
      totalAmount = body.courses.reduce((acc: number, item: any) => {
        // Calculate subtotal for each item
        const subtotal = item.int_price * item.quantity;
        return acc + subtotal;
      }, 0);
      taxTotal = null;
      subTotal = totalAmount;
    }

    const order = await db.order.create({
      data: {
        userId: user.id as string,
        totalAmount,
        currency: body.currency,
        subTotal,
        taxTotal,
        paymentMethod: body.paymentMethod,
        sameAsBilling: body.sameAsBilling,
      },
    });

    await db.item.createMany({
      data: body.courses.map((item: any) => ({
        orderId: order.id,
        itemName: item.title,
        courseId: item.courseId,
        price: item.price,
        int_price: item.int_price,
        quantity: item.quantity,
      })),
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
