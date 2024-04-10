"use client";

import { useState } from "react";

import BillingForm from "@/components/checkout/billing-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Container from "../container";
import CheckoutSummary from "./checkout-summary";
import PaymentMethodSelection from "./payment-method-selection";
import payUIcon from "@/public/assets/payu.png";
import razorPayIcon from "@/public/assets/razorpay.png";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useForm, useFormContext } from "react-hook-form";
import BillingFormTest from "./billing-form-test";

interface CheckoutFormProps {
  totalPrice: number;
  subTotal: number;
  taxAmount?: number;
  sendSameAsBilling: (sameAsBilling: boolean) => void;
  isSubmitting: boolean;
  isValid: boolean;
  onSelectMethod: (method: string) => void;
}

const CheckoutForm = ({
  totalPrice,
  subTotal,
  taxAmount,
  sendSameAsBilling,
  onSelectMethod,

  isSubmitting,
  isValid,
}: CheckoutFormProps) => {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string | null>("PayU");

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
    onSelectMethod(method);
  };
  const toggleSameAsBilling = () => {
    setSameAsBilling(!sameAsBilling);
    sendSameAsBilling(!sameAsBilling);
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row pt-12 gap-20 justify-between items-start">
        <div className="w-full md:w-4/6">
          <BillingForm isSubmitting={isSubmitting} />
          <div className="w-full flex flex-col items-start justify-start bg-white rounded-md p-4 shadow-sm transition mb-10">
            <div className="flex items-center space-x-2">
              <Switch
                id="shippingDiffrent"
                checked={sameAsBilling}
                onCheckedChange={toggleSameAsBilling}
                style={{
                  backgroundColor: sameAsBilling ? "#34D399" : "#8ddffc",
                }}
              />
              <Label htmlFor="shippingDiffrent">
                Shipping address same as billing address
              </Label>
            </div>
          </div>
          {!sameAsBilling && <ShippingForm isSubmitting={isSubmitting} />}
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
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
