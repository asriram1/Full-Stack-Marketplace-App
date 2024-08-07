"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext, cartProductPrice } from "@/app/_components/AppContext";
import { useParams } from "next/navigation";
import CartProduct from "@/app/_components/CartProduct";
import { Order } from "@/app/_models/Order";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState<Order>();
  const [loadingOrder, setLoadingOrder] = useState<Boolean>(true);

  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        // console.log(res.json());
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
      setLoadingOrder(false);
    }
  }, [id]);

  let subtotal = 0;

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <div className=" flex flex-col mx-auto mt-8 ml-5 h-[80vh] max-w-[80%]">
      <div className="text-center">
        <div className="mt-4 mb-8 ml-56">
          <p>Thanks for your order</p>
          <p>The order pickup details have been sent to your email.</p>
        </div>
      </div>
      <div className="w-full mx-auto">
        {loadingOrder && <div>Loading Order...</div>}
        {order && (
          <div className="md:grid grid-cols-2 gap-16">
            <div>
              {order.cartProducts.map((product, index: number) => (
                <CartProduct
                  key={product._id}
                  size={order.selectedSizes[index]}
                  product={product}
                />
              ))}
              <div className="text-right py-2 text-gray-500">
                Subtotal:
                <span className="text-black font-bold inline-block w-8">
                  ${Math.round(subtotal * 100) / 100}
                </span>
                <br />
                Tax:
                <span className="text-black font-bold inline-block w-8">
                  $5
                </span>
                <br />
                Total:
                <span className="text-black font-bold inline-block w-8">
                  ${Math.round((subtotal + 5.0) * 100) / 100}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
