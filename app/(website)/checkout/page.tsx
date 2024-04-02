"use client";

import CartSummary from "@/components/cart/cart-summary";
import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutSummary from "@/components/checkout/checkout-summary";
import PaymentMethodCheckbox from "@/components/checkout/payment-method-checkbox";
import PaymentMethodSelect from "@/components/checkout/payment-method-select";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { useCart } from "@/context/cart-context";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const totalAmount =
    cartItems?.reduce(
      (total, item) => total + (item.price * item.quantity || 0),
      0
    ) || 0;
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
                subTotal={totalAmount - totalAmount * 0.18}
                taxAmount={totalAmount * 0.18}
                grandTotal={totalAmount}
              />
            </div>
            <div className="bg-white rounded-md p-4 shadow-sm transition">
              <h2 className="text-lg font-semibold mb-4">
                Select Payment Method
              </h2>
              <PaymentMethodCheckbox
                imageSrc="/path/to/image.png"
                gatewayName="Payment Gateway Name"
              />
              <PaymentMethodSelect />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
