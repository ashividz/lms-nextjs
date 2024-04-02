import Image from "next/image";
import React from "react";

interface PaymentMethodCheckboxProps {
  imageSrc: string;
  gatewayName: string;
}

const PaymentMethodCheckbox = ({
  imageSrc,
  gatewayName,
}: PaymentMethodCheckboxProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" className="form-checkbox h-5 w-5" />
      <Image
        src={imageSrc}
        alt={gatewayName}
        width={40}
        height={40}
        className="h-8 w-auto"
      />
      <span>{gatewayName}</span>
    </label>
  );
};

export default PaymentMethodCheckbox;
