"use client";

import CartSummaryItem from "./cart-summary-item";

interface CartSummaryProps {
  subTotal: number;
  taxAmount?: number;
  couponDiscount?: number;
  grandTotal: number;
}

const CartSummary = ({
  subTotal,
  taxAmount,
  couponDiscount,
  grandTotal,
}: CartSummaryProps) => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
      <div className="flex flex-col w-full">
        <CartSummaryItem title="Subtotal" value={subTotal} />
        <CartSummaryItem title="Tax Amount" value={taxAmount || 0} />
        {/* <CartSummaryItem title="Coupon Discount" value={couponDiscount} /> */}
        <CartSummaryItem title="Grand Total" value={grandTotal} />
      </div>
    </div>
  );
};

export default CartSummary;
