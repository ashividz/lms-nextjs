"use client";

import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CircleDashed } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import CheckoutForm from "@/components/checkout/checkout-form";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { exchangePrice } from "@/lib/exchangePrice";
import { useUserCountry } from "@/context/user-country-context";
import { Form } from "@/components/ui/form";
import { billingSchema, checkoutSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";

declare global {
  interface Window {
    Razorpay: any; // or specify the correct type for Razorpay
  }
}
const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("PayU");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);

  const handleSameAsBilling = (sameAsBilling: boolean) => {
    setSameAsBilling(sameAsBilling);
  };

  const user = useCurrentUser();

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const { cartItems, emptyCart } = useCart();
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
  let defaultValues: {
    billing_firstName: string;
    billing_lastName: string;
    billing_email: string;
    billing_phoneNumber: string;
    billing_address: string;
    billing_country: string;
    billing_city: string;
    billing_state: string;
    billing_zip: string;
    shipping_firstName?: string;
    shipping_lastName?: string;
    shipping_email?: string;
    shipping_phoneNumber?: string;
    shipping_address?: string;
    shipping_city?: string;
    shipping_state?: string;
    shipping_zip?: string;
  };

  if (sameAsBilling === true) {
    defaultValues = {
      billing_firstName: user?.name ? user.name?.split(" ")[0] : "",
      billing_lastName: user?.name ? user.name?.split(" ")[1] : "",
      billing_email: user?.email ? user.email : "",
      billing_phoneNumber: "",
      billing_address: "",
      billing_country: "",
      billing_city: "",
      billing_state: "",
      billing_zip: "",
    };
  } else {
    defaultValues = {
      billing_firstName: user?.name ? user.name?.split(" ")[0] : "",
      billing_lastName: user?.name ? user.name?.split(" ")[1] : "",
      billing_email: user?.email ? user.email : "",
      billing_phoneNumber: "",
      billing_address: "",
      billing_country: "",
      billing_city: "",
      billing_state: "",
      billing_zip: "",
      shipping_firstName: "",
      shipping_lastName: "",
      shipping_email: "",
      shipping_phoneNumber: "",
      shipping_address: "",
      shipping_city: "",
      shipping_state: "",
      shipping_zip: "",
    };
  }
  const getSchema = (sameAsBilling: boolean) => {
    return sameAsBilling ? billingSchema : checkoutSchema;
  };

  const checkoutForm = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(getSchema(sameAsBilling)),
    defaultValues: defaultValues,
  });

  const { isSubmitting, isValid } = checkoutForm.formState;

  const handlePaymentSubmit = async (
    values: z.infer<typeof checkoutSchema>
  ) => {
    try {
      const coursesDetails = cartItems?.map((item) => ({
        courseId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        int_price: item.int_price,
        sameAsBilling: sameAsBilling,
      }));
      const formDataWithCourses = {
        ...values,
        courses: coursesDetails,
        paymentMethod: selectedMethod,
        currency: userCurrency,
      };

      const checkoutResponse = await axios.post(
        "/api/checkout",
        formDataWithCourses
      );
      const checkoutData = checkoutResponse.data;
      if (!checkoutData) throw new Error("Checkout failed");
      if (checkoutData.paymentMethod === "Razorpay") {
        const res = await initializeRazorpay();

        if (!res) {
          throw new Error("Razorpay SDK Failed to load");
        }
        const razorpayData = {
          amount: checkoutData.totalAmount,
          currency: checkoutData.currency,
          orderId: checkoutData.id,
        };

        const response = await axios.post("/api/razorpay", razorpayData);
        const data = response.data;

        var options = {
          key: process.env.RAZORPAY_KEY,
          name: "Unitus Health Academy",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          description: "Thankyou for your intress in Unitus Health Academy",
          image: "./unitus-logo.png",
          handler: function (response: any) {
            if (response.razorpay_payment_id === null) {
              toast.error("Payment Cancelled", {
                position: "top-center",
                autoClose: 5000,
              });
            } else if (
              response.error &&
              response.error.code === "payment_failed"
            ) {
              // Payment failed
              toast.error("Payment failed", {
                position: "top-center",
                autoClose: 5000,
              });
            } else if (response.razorpay_payment_id) {
              // Payment success, redirect to success page
              emptyCart();
              router.push("/success?orderId=" + response.razorpay_order_id);
            } else {
              toast.error("Payment cancelled", {
                position: "top-center",
                autoClose: 5000,
              });
            }
          },
          modal: {
            ondismiss: function () {
              toast.error("Payment Cancelled", {
                position: "top-center",
                autoClose: 5000,
              });
            },
          },
          prefill: {
            name: values.billing_firstName + " " + values.billing_lastName,
            email: values.billing_email,
            contact: values.billing_phoneNumber,
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch {
      toast.error("Something went wrong while creating order", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Checkout" className="py-12" />
      <Container>
        <FormProvider {...checkoutForm}>
          <Form {...checkoutForm}>
            <form onSubmit={checkoutForm.handleSubmit(handlePaymentSubmit)}>
              <CheckoutForm
                totalPrice={totalPrice}
                subTotal={subTotal}
                taxAmount={taxAmount}
                sendSameAsBilling={handleSameAsBilling}
                isSubmitting={isSubmitting}
                isValid={isValid}
                onSelectMethod={handleSelectMethod} // Pass the method to select payment method
              />
              <div className="flex justify-end ">
                <Button
                  className="relative bg-gradient-to-r md:w-[35%] font-bold from-fuchsia-500 to-cyan-500 rounded-md p-6 shadow-sm transition overflow-hidden"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  <span className="relative flex items-center">
                    <span className="transition-transform">
                      {isSubmitting ? (
                        <>
                          <div className="flex items-center">
                            <CircleDashed className="w-5 h-5 mr-2 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        </>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </span>
                    <FaArrowRight className="ml-2 opacity-100 group-hover:opacity-0 duration-300 transition-transform" />
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </Container>
    </div>
  );
};

export default CheckoutPage;
