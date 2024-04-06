"use client";

import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

import CartSummary from "@/components/cart/cart-summary";
import CouponCodeForm from "@/components/cart/coupon-code-form";
import EmptyCart from "@/components/cart/empty-cart";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

import CartItems from "@/components/cart/cart-items";
import { useUserCountry } from "@/context/user-country-context";
import { exchangePrice } from "@/lib/exchangePrice";

const CartPage = () => {
  const { cartItems } = useCart();
  const { userCurrency, userCountry } = useUserCountry();
  const totalAmount =
    userCountry !== "IN"
      ? cartItems?.reduce(
          (total, item) => total + item.int_price * item.quantity,
          0
        )
      : cartItems?.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
  const [totalPrice, setTotalPrice] = useState(totalAmount);

  useEffect(() => {
    const handlePriceExchange = async (price: number, userCurrency: string) => {
      try {
        const exchangedValue = await exchangePrice(price, userCurrency);
        setTotalPrice(exchangedValue);
      } catch (error) {
        console.error("Error exchanging price:", error);
        setTotalPrice(price);
      }
    };
    if (!userCountry) return;
    handlePriceExchange(totalAmount, userCurrency);
  }, [userCurrency, userCountry, totalAmount]);
  const subTotal =
    userCountry !== "IN" ? totalPrice : totalPrice - totalPrice * 0.18;
  const taxAmount = userCountry !== "IN" ? 0 : totalPrice * 0.18;
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Cart" className="py-12" />
      <Container>
        {cartItems && cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="w-full flex items-center justify-between py-4 mt-10">
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded ">
                  <thead className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-md py-4">
                    <tr>
                      <th className="px-4 py-3 border-b border-r text-white rounded-t-md">
                        Image
                      </th>
                      <th className="px-4 py-3 border-b border-r text-white">
                        Name
                      </th>
                      <th className="px-4 py-3 border-b border-r text-white">
                        Price
                      </th>
                      <th className="px-4 py-3 border-b border-r text-white">
                        Quantity
                      </th>
                      <th className="px-4 py-3 border-b border-r text-white">
                        Total
                      </th>
                      <th className="px-4 py-3 border-b border-r text-white rounded-t-md">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems &&
                      cartItems.map((item) => (
                        <CartItems key={item.id} item={item} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center gap-20 justify-between">
              <div className="w-full md:w-4/6 bg-white rounded-md p-4 shadow-sm transition">
                <CouponCodeForm />
              </div>
              <div className="w-full md:w-2/5 bg-white rounded-md p-4 shadow-sm transition">
                <CartSummary
                  subTotal={subTotal}
                  taxAmount={taxAmount}
                  grandTotal={totalPrice}
                />
              </div>
            </div>
            <div className="w-full  mt-4 flex justify-end">
              <Button className="relative bg-gradient-to-r md:w-[35%] font-bold from-fuchsia-500 to-cyan-500 rounded-md p-6 shadow-sm transition overflow-hidden">
                <span className="relative flex items-center">
                  <span className="transition-transform">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </span>
                  <FaArrowRight className="ml-2 opacity-100 group-hover:opacity-0 duration-300 transition-transform" />
                </span>
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
