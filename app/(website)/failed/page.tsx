"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { Order } from "@prisma/client";
import axios from "axios";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { CircleCheckBig, CircleX } from "lucide-react";
import CourseFeatureItem from "@/components/courses/course-feature-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FailedPage = () => {
  const [order, setOrder] = useState<Order | null>(null); // Initialize order state as null
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID not found");
        }
        const response = await axios.get(`/api/orders/${orderId}`);
        const fetchedOrder = response.data;
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Error fetching order details");
        router.push("/");
      }
    };

    fetchOrder();
  }, [orderId, router]);

  return (
    <div>
      <PageTitle title="Payment Failed" className="py-12" />
      <Container>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden my-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative inline-block">
                <CircleX className="w-20 h-20 text-rose-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full animate-ping absolute inset-0 border-4 border-rose-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
            </div>
            <div className="flex items-center justify-center">
              {order ? (
                <div>
                  <CourseFeatureItem title="Order ID" value={order.orderId} />
                  <CourseFeatureItem title="Sub Total" value={order.subTotal} />
                  {order.currency === "INR" && (
                    <CourseFeatureItem title="Tax" value={order.taxTotal} />
                  )}

                  <CourseFeatureItem
                    title="Total Amount"
                    value={order.totalAmount}
                  />
                  <CourseFeatureItem
                    title="Payment Method"
                    value={order.paymentMethod}
                  />
                  <CourseFeatureItem
                    title="Payment Status"
                    value={order.paymentStatus}
                  />
                </div>
              ) : (
                <p className="text-lg mb-2">Loading order details...</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Link href="/checkout">
                <Button size="lg" variant="destructive">
                  Try Again
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FailedPage;
