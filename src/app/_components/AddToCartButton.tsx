"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "./AppContext";
import toast from "react-hot-toast";
import { Ad, AdModel } from "../_models/Ad";
import Cart from "./icons/Cart";

export default function AddToCartButton({ adDoc }: { adDoc: Ad }) {
  const { addToCart } = useContext(CartContext);
  const [size, setSize] = useState<string>("");

  function onAddToCart(adDoc: Ad) {
    addToCart(adDoc, size);
    toast.success("Added to cart.");
  }
  return (
    <div className="flex gap-3 item-center justify-center">
      {adDoc.category !== "Accessories" && (
        <div>
          <label>Select Size</label>
          <select
            value={size}
            onChange={(ev) => {
              setSize(ev.target.value);
            }}
          >
            <option>Size</option>
            {adDoc.sizes[0].split(",").map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={() => onAddToCart(adDoc)}
        className="bg-blue-600 mt-12 h-8 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
      >
        <Cart />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
