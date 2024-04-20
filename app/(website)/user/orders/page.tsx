"use client";

import { useEffect, useState } from "react";
import { OrderDataTable } from "../_components/order-data-table";
import { Order } from "@prisma/client";
import { columns } from "../_components/columns";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";

const OrdersPage = () => {
  const user = useCurrentUser();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`/api/orders/${user?.id}`);
      const orders = response.data;
      setOrders(orders);
    };
    fetchOrders();
  }, [user?.id]);

  return (
    <div className="bg-white rounded-md shadow-sm transition p-4">
      <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700">
        My Orders
      </h1>
      <div className="flex flex-col justify-between w-full py-10">
        <OrderDataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
