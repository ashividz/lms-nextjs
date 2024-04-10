"use client";

import CartSummaryItem from "@/components/cart/cart-summary-item";
import { useCart } from "@/context/cart-context";
import CourseItemInCart from "./course-item-in-cart";
import { useUserCountry } from "@/context/user-country-context";

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
  const { userCountry } = useUserCountry();
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
      <div className="flex flex-col w-full">
        {cartItems.map((item) => (
          <CourseItemInCart
            key={item.id}
            title={item.title}
            price={userCountry === "IN" ? item.price : item.int_price}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="flex flex-col w-full">
        <CartSummaryItem title="Subtotal" value={subTotal || 0} />
        {userCountry === "IN" && (
          <CartSummaryItem title="Tax Amount" value={taxAmount || 0} />
        )}
        {/* <CartSummaryItem title="Coupon Discount" value={couponDiscount} /> */}
        <CartSummaryItem title="Grand Total" value={grandTotal || 0} />
      </div>
    </div>
  );
};

export default CheckoutSummary;
