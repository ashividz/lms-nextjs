"use client";

import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutForm from "@/components/checkout/checkout-form";
import Container from "@/components/container";
import PageTitle from "@/components/sections/page-title";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { exchangePrice } from "@/lib/exchangePrice";
import { useUserCountry } from "@/context/user-country-context";
import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { billingSchema, checkoutSchema } from "@/schemas";
import axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import Razorpay from "razorpay";
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

      // const response = await axios.post("/api/checkout", formDataWithCourses);
      //router.push(`/admin/courses/${response.data.id}`);

      const res = await initializeRazorpay();
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }

      // const response = await axios.post("/api/razorpay", formDataWithCourses);
      // console.log("Response from Razorpay:", response.data);

      // // Extract the order ID from the response
      // const orderId = response.data.orderId;
      // setOrderId(orderId);
      // if (orderId) {
      //   // Redirect user to Razorpay payment page
      //   router.push(`https://checkout.razorpay.com/v1/checkout.js`);
      // } else {
      //   console.error("Failed to get order ID");
      // }
      toast.success("Your order created successfully", {
        position: "top-center",
        autoClose: 5000,
      });
    } catch {
      toast.error("Something went wrong while creating order", {
        position: "top-center",
        autoClose: 5000,
      });
    }
    if (selectedMethod === "PayU") {
      // Call PayU API to process payment
      console.log("Processing payment via PayU...");
    } else if (selectedMethod === "Razorpay") {
      // Call RazorPay API to process payment
      console.log("Processing payment via RazorPay...");
    } else {
      console.error("No payment method selected!");
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

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
                      Proceed to payment
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
