// "use client";

"use client";

import React, { useContext, useEffect, useState } from "react";
import mongoose from "mongoose";
import { CartContext, cartProductPrice } from "../_components/AppContext";
import toast from "react-hot-toast";
import CartProduct from "../_components/CartProduct";
import { getServerSession } from "next-auth";

// import { authOptions } from "../_libs/authOptions";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Ad } from "../_models/Ad";
import GetSessionEmail from "../_components/GetSessionEmail";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { authOptions } from "../_libs/authOptions";

export default function CartPage() {
  const {
    cartProducts,
    selectedSizes,
    getCartProducts,
    loading,
    removeCartProduct,
  } = useContext(CartContext);
  const router = useRouter();
  const [user, setUser] = useState<string>();
  // while (loading) {
  //   console.log("loading...");
  // }
  // const cartProducts = getCartProducts();

  useEffect(() => {
    const session = async () => {
      const username = await GetSessionEmail();
      return username;
    };
    session().then((user) => {
      setUser(user);
      if (user === "") {
        router.push("/");
      }
    });
  });

  async function proceedToCheckout() {
    toast("Preparing your order...");
    console.log(cartProducts, selectedSizes);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartProducts, selectedSizes }),
    });

    if (response.ok) {
      toast.success("Redirecting to payment link...");
      const link = await response.json();
      // redirect to stripe
      window.location = link;
    } else {
      toast.error("Something went wrong...");
    }
  }

  let subtotal = 0;

  for (const p of cartProducts!) {
    subtotal += cartProductPrice(p);
  }

  if (cartProducts?.length === 0 || user === "") {
    return (
      <section className="mt-8 text-center">
        <p className="mt-4"> Your shopping cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="font-bold mt-2 mb-2">Your Cart</h2>
      <div className="mt-8 grid gap-6 grid-cols-2">
        <div>
          {cartProducts?.length > 0 &&
            cartProducts.map((product: Ad, index: number) => (
              <CartProduct
                key={index}
                size={selectedSizes[index]}
                index={index}
                product={product}
                onRemove={removeCartProduct}
              />
            ))}
          <div className="py-2 text-right pr-14 flex justify-end items-center ">
            <div className="text-gray-500">
              Subtotal: <br />
              Tax: <br />
              Total:
            </div>

            <div className=" font-semibold pl-2 text-right">
              ${Math.round(subtotal * 100) / 100} <br /> $5 <br /> $
              {Math.round((subtotal + 5.0) * 100) / 100}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-center font-bold">Checkout</h2>

          <button
            onClick={() => proceedToCheckout()}
            className="rounded-md mx-auto mt-14 w-1/2 bg-blue-300 text-white px-2 py-2 w-[125px] flex items-center justify-center"
          >
            {" "}
            Pay ${Math.round((subtotal + 5.0) * 100) / 100}
          </button>
        </div>
      </div>
    </section>
  );
}

// import React, { useContext, useEffect, useState } from "react";
// import SectionHeaders from "../components/layout/SectionHeaders";
// import { CartContext, cartProductPrice } from "../components/AppContext";
// import Image from "next/image";
// import Trash from "../components/icons/Trash";
// import AddressInputs from "../components/layout/AddressInputs";
// import { useProfile } from "../components/UseProfile";
// import toast from "react-hot-toast";
// import CartProduct from "../components/menu/CartProduct";

// export default function CartPage() {
//   const { cartProducts, removeCartProduct } = useContext(CartContext);
//   const [address, setAddress] = useState({});
//   const { data: profileData } = useProfile();

//   useEffect(() => {
//     if (typeof window.location.url !== "undefined") {
//       if (window.location.url.includes("canceled=1")) {
//         toast.error("Payment failed.");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (profileData?.city) {
//       const { phone, streetAddress, city, postal, state } = profileData;
//       const addressFromProfile = { phone, streetAddress, city, postal, state };
//       setAddress(addressFromProfile);
//     }
//   }, [profileData]);
//   let subtotal = 0;
//   for (const p of cartProducts) {
//     subtotal += cartProductPrice(p);
//   }

//   function handleAddressChange(propName, value) {
//     setAddress((prevAddress) => {
//       ({ ...prevAddress, [propName]: value });
//     });
//   }
//   async function proceedToCheckout(ev) {
//     ev.preventDefault();
//     // address & shopping cart products

//     toast("Preparing your order...");
//     const response = await fetch("/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartProducts, address }),
//     });

//     if (response.ok) {
//       toast.success("Redirecting to payment link...");
//       const link = await response.json();
//       // redirect to stripe
//       window.location = link;
//     } else {
//       toast.error("Something went wrong...");
//     }
//   }

//   if (cartProducts?.length === 0) {
//     return (
//       <section className="mt-8 text-center">
//         <SectionHeaders mainHeader="Cart" />
//         <p className="mt-4"> Your shopping cart is empty.</p>
//       </section>
//     );
//   }

//   return (
//     <section className="mt-8">
//       <div className="text-center">
//         <SectionHeaders mainHeader={"Cart"} />
//       </div>
//       <div className="mt-8 grid gap-8 grid-cols-2">
//         <div>
//           {cartProducts?.length === 0 && (
//             <div>No products in your shopping cart.</div>
//           )}
//           {cartProducts?.length > 0 &&
//             cartProducts.map((product, index) => (
//               <CartProduct
//                 key={index}
//                 product={product}
//                 onRemove={removeCartProduct}
//               />
//               // <div className="flex gap-4 mb-2 border-b py-4 items-center ">
//               //   <div className="w-24">
//               //     <Image
//               //       src={product.image}
//               //       width={240}
//               //       height={240}
//               //       alt={""}
//               //     />
//               //   </div>
//               //   <div className="grow">
//               //     <h3 className="font-semibold">{product.name}</h3>
//               //     {product.size && (
//               //       <div className="text-sm">
//               //         Size: <span>{product.size.name}</span>
//               //       </div>
//               //     )}
//               //     {product.extras?.length > 0 && (
//               //       <div className="text-sm text-gray-500">
//               //         Extras:
//               //         {product.extras.map((extra) => (
//               //           <div>
//               //             {" "}
//               //             {extra.name} ${extra.price}{" "}
//               //           </div>
//               //         ))}
//               //       </div>
//               //     )}
//               //   </div>
//               //   <div className="font-semibold text-lg">
//               //     ${cartProductPrice(product)}
//               //   </div>
//               //   <div>
//               //     <button
//               //       type="button"
//               //       onClick={() => removeCartProduct(index)}
//               //       className="p-2"
//               //     >
//               //       <Trash />
//               //     </button>
//               //   </div>
//               // </div>
//             ))}
//           <div className="py-2 text-right pr-14 flex justify-end items-center">
//             <div className="text-gray-500">
//               Subtotal: <br />
//               Delivery: <br />
//               Total:
//             </div>

//             <div className=" font-semibold pl-2 text-right">
//               ${subtotal} <br /> $5 <br /> ${subtotal + 5}
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h2>Checkout</h2>
//           <form action="" onSubmit={proceedToCheckout}>
//             <label>Address</label>
//             {/* <AddressInputs
//               addressProps={address}
//               setAdressProps={handleAddressChange}
//             /> */}
//             <button type="submit"> Pay ${subtotal + 5}</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
