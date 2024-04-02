"use client";

import { useState } from "react";
import BillingForm from "@/components/checkout/billing-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const CheckoutForm = () => {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const toggleSameAsBilling = () => {
    setSameAsBilling(!sameAsBilling);
  };

  return (
    <>
      <BillingForm />
      <div className="w-full flex flex-col items-start justify-start bg-white rounded-md p-4 shadow-sm transition mb-10">
        <div className="flex items-center space-x-2">
          <Switch
            id="shippingDiffrent"
            checked={sameAsBilling}
            onCheckedChange={toggleSameAsBilling}
          />
          <Label htmlFor="shippingDiffrent">
            Shipping address same as billing address
          </Label>
        </div>
      </div>
      {!sameAsBilling && <ShippingForm />}
    </>
  );
};

export default CheckoutForm;
