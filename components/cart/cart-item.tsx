"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/formatCurrency";
import { CartItem } from "@/types/cart-item";

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantityInCart, removeFromCart } = useCart();
  return (
    <>
      <tr key={item.id} className="text-center bg-white">
        <td className="border border-b border-r px-4 py-2 text-center">
          <div className="flex justify-center items-center">
            <Image
              src={item.imageUrl || "/"}
              alt={item.title}
              width={150}
              height={100}
            />
          </div>
        </td>
        <td className="border border-b border-r px-4 py-2 font-bold">
          <Link href={`/course/${item.slug}`}>{item.title}</Link>
        </td>
        <td className="border border-b border-r px-4 py-2">
          {formatCurrency(item.price, "INR")}
        </td>
        <td className="border border-b border-r px-4 py-2 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <button
              onClick={() => updateQuantityInCart(item.id, item.quantity - 1)}
              className="px-2 py-1 rounded-md mb-2 md:mr-2 md:mb-0 bg-red-500 text-white"
            >
              -
            </button>
            <span className="text-lg">{item.quantity}</span>
            <button
              onClick={() => updateQuantityInCart(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-emerald-500 text-white rounded-md mt-2 md:ml-2 md:mt-0"
            >
              +
            </button>
          </div>
        </td>
        <td className="border border-b border-r px-4 py-2">
          {formatCurrency(item.price * item.quantity, "INR")}
        </td>
        <td className="border border-b border-r px-4 py-2">
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-gray-500"
          >
            <IoMdClose />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
