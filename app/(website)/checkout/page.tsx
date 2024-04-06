"use client";

import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutSummary from "@/components/checkout/checkout-summary";
import PaymentMethodSelection from "@/components/checkout/payment-method-selection";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

import payUIcon from "@/public/assets/payu.png";
import razorPayIcon from "@/public/assets/razorpay.png";
import { exchangePrice } from "@/lib/exchangePrice";
import { useUserCountry } from "@/context/user-country-context";

const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("PayU");

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

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
      <PageTitle title="Checkout" className="py-12" />
      <Container>
        <div className="w-full flex flex-col md:flex-row py-12 gap-20 justify-between items-start">
          <div className="w-full md:w-4/6">
            <CheckoutForm />
          </div>
          <div className="w-full md:w-2/5 flex flex-col">
            <div className="bg-white rounded-md p-4 shadow-sm transition mb-4">
              <CheckoutSummary
                subTotal={subTotal}
                taxAmount={taxAmount}
                grandTotal={totalPrice}
              />
            </div>
            <div className="bg-white rounded-md p-4 shadow-sm transition">
              <h2 className="text-lg font-semibold mb-4">
                Select Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <PaymentMethodSelection
                  imageSrc={payUIcon}
                  gatewayName="PayU"
                  isSelected={selectedMethod === "PayU"}
                  onSelect={handleSelectMethod}
                />
                <PaymentMethodSelection
                  imageSrc={razorPayIcon}
                  gatewayName="Razorpay"
                  isSelected={selectedMethod === "Razorpay"}
                  onSelect={handleSelectMethod}
                />
              </div>
            </div>
            <div className="w-full  mt-4 flex justify-end">
              <Button className="relative bg-gradient-to-r w-full font-bold from-fuchsia-500 to-cyan-500 rounded-md p-6 shadow-sm transition overflow-hidden">
                <span className="relative flex items-center">
                  <span className="transition-transform">
                    Proceed to payment
                  </span>
                  <FaArrowRight className="ml-2 opacity-100 group-hover:opacity-0 duration-300 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
