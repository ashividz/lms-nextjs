"use client";

import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import CouponCodeForm from "@/components/cart/coupon-code-form";
import EmptyCart from "@/components/cart/empty-cart";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemTypes } from "@/types/cart-item";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);

  useEffect(() => {
    const cartDataJSON = localStorage.getItem("cartItems");
    if (cartDataJSON) {
      const cartData: CartItemTypes[] = JSON.parse(cartDataJSON);
      setCartItems(cartData);
    }
  }, []);
  const onUpdateQuantity = (id: string, newQuantity: number) => {
    const updatedQuantity = Math.max(newQuantity, 1);
    const itemIndex = cartItems.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return;
    }
    const updatedCartItems = [...cartItems];

    updatedCartItems[itemIndex].quantity = updatedQuantity;

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  const onRemove = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Cart" className="py-12" />
      <Container>
        {cartItems.length === 0 ? (
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
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemove={onRemove}
                      />
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
                  subTotal={
                    cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) -
                    cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) *
                      0.18
                  }
                  taxAmount={
                    cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) * 0.18
                  }
                  grandTotal={
                    cartItems.reduce((a, b) => a + b.price, 0) *
                    cartItems.reduce((a, b) => a + b.quantity, 0)
                  }
                />
              </div>
            </div>
            <div className="w-full  mt-4 flex justify-end">
              <Button className="relative bg-gradient-to-r md:w-[35%] font-bold from-fuchsia-500 to-cyan-500 rounded-md p-6 shadow-sm transition overflow-hidden">
                <span className="relative flex items-center">
                  <span className="transition-transform">
                    Proceed to Checkout
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
