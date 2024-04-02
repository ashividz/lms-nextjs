"use client";

const PaymentMethodSelect = () => {
  // Placeholder code for payment method selection
  return (
    <div className="bg-white rounded-md p-4 shadow-sm transition">
      {/* Placeholder content for payment method selection */}
      <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
      <select className="border border-gray-300 rounded-md p-2 w-full">
        <option value="credit_card">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="stripe">Stripe</option>
      </select>
    </div>
  );
};

export default PaymentMethodSelect;
