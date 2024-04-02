"use client";

import CartSummaryItem from "@/components/cart/cart-summary-item";
import { useCart } from "@/context/cart-context";
import CourseItemInCart from "./course-item-in-cart";

interface CartSummaryProps {
  subTotal: number;
  taxAmount?: number;
  couponDiscount?: number;
  grandTotal: number;
}

const CheckoutSummary = ({
  subTotal,
  taxAmount,
  couponDiscount,
  grandTotal,
}: CartSummaryProps) => {
  const { cartItems } = useCart();
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
      <div className="flex flex-col w-full">
        {cartItems.map((item) => (
          <CourseItemInCart
            key={item.id}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="flex flex-col w-full">
        <CartSummaryItem title="Subtotal" value={subTotal || 0} />
        <CartSummaryItem title="Tax Amount" value={taxAmount || 0} />
        {/* <CartSummaryItem title="Coupon Discount" value={couponDiscount} /> */}
        <CartSummaryItem title="Grand Total" value={grandTotal || 0} />
      </div>
    </div>
  );
};

export default CheckoutSummary;
