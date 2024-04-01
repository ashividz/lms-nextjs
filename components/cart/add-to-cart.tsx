"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart-item";

interface AddToCartProps {
  item: CartItem;
  isAuthenticated: boolean; // Flag to check if the user is authenticated
  addToCart: (item: CartItem) => void; // Function to add item to cart for guest users
  //addToDatabase: (item: CartItem) => void; // Function to add item to database for logged-in users
}

const AddToCart = ({
  item,
  isAuthenticated,
  addToCart,
}: //addToDatabase,
AddToCartProps) => {
  const handleAddToCart = () => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      //addToDatabase(item); // Add item to database for logged-in users
    } else {
      addToCart(item); // Add item to local storage for guest users
      console.log(isAuthenticated);
    }
  };
  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-600 text-md font-bold px-4 py-7 rounded-md mb-2 w-full"
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;
