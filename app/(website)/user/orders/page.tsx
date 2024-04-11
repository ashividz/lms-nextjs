"use client";

const OrdersPage = () => {
  return (
    <div className="bg-white rounded-md shadow-sm transition p-4">
      <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700">
        My Orders
      </h1>
      <div className="flex flex-col justify-between w-full py-10">
        <p>No Orders</p>
      </div>
    </div>
  );
};

export default OrdersPage;
