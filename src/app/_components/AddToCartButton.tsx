"use client";
import React, { useContext } from "react";
import { CartContext } from "./AppContext";
import toast from "react-hot-toast";

export default function AddToCartButton({ adDoc }) {
  const { addToCart } = useContext(CartContext);

  function onAddToCart(adDoc) {
    addToCart(adDoc);
    toast.success("Added to cart.");
  }
  return (
    <button
      onClick={() => onAddToCart(adDoc)}
      className="bg-blue-300 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
    >
      <span>Add to Cart</span>
    </button>
  );
}
