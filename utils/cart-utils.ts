import { db } from "@/lib/db";
import { CartItem } from "@/types/cart-item";

// Function to add item to cart for guest users (using local storage)
export const addToCartLocalStorage = (item: CartItem): void => {
  // Retrieve existing cart items from local storage
  const existingCartItemsJSON = localStorage.getItem("cartItems");
  const existingCartItems: CartItem[] = existingCartItemsJSON
    ? JSON.parse(existingCartItemsJSON)
    : [];

  // Check if the item is already in the cart
  const existingItemIndex = existingCartItems.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex !== -1) {
    // If the item is already in the cart, update its quantity
    existingCartItems[existingItemIndex].quantity += item.quantity;
  } else {
    // If the item is not in the cart, add it
    existingCartItems.push(item);
  }

  // Save updated cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
};

// export const addToCartDatabase = (item: CartItem): void => {
//   // Add the item to the database (adjust this based on your database structure)
//   db.collection("cartItems")
//     .add({
//       id: item.id,
//       name: item.name,
//       image: item.image,
//       price: item.price,
//       quantity: item.quantity,
//       // Add any other relevant fields as needed
//     })
//     .then(() => {
//       console.log("Item added to cart in the database.");
//     })
//     .catch((error) => {
//       console.error("Error adding item to cart in the database:", error);
//     });
// };
