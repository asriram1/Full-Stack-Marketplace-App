"use client";

import { SessionProvider } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Ad } from "../_models/Ad";

import { SetStateAction, Dispatch } from "react";
import { isNullOrUndefined } from "util";
import GetSessionEmail from "./GetSessionEmail";

interface CartContextType {
  cartProducts: Ad[];
  selectedSizes: string[];
  loading: Boolean;
  setCartProducts: Dispatch<SetStateAction<Ad[]>>;
  getCartProducts: { (): Ad[] };
  // getCartProductsFromLocalStorage: { (): Promise<Ad[]> };
  addToCart: { (arg0: Ad, arg1: string): void };
  clearCart: { (): void };
  removeCartProduct: { (index: number | undefined): void };
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [
    {
      _id: "",
      title: "",
      price: 0,
      category: "",
      sizes: [""],
      description: "",
      contact: 0,
      userEmail: "",
      images: [],
      location: { lat: 0, lng: 0 },
    },
  ],
  selectedSizes: [""],
  loading: true,
  setCartProducts: () => {},
  getCartProducts: () => {
    return [
      {
        _id: "",
        title: "",
        price: 0,
        category: "",
        sizes: [""],
        description: "",
        contact: 0,
        userEmail: "",
        images: [],
        location: { lat: 0, lng: 0 },
      },
    ];
  },
  // getCartProductsFromLocalStorage: () => {
  //   // try {

  //   return Promise<Ad[]>;

  //   // [
  //   //   Ad
  //   //   // {
  //   //   //   _id: "",
  //   //   //   title: "",
  //   //   //   price: 0,
  //   //   //   category: "",
  //   //   //   sizes: [""],
  //   //   //   description: "",
  //   //   //   contact: 0,
  //   //   //   userEmail: "",
  //   //   //   files: [],
  //   //   //   location: { lat: 0, lng: 0 },
  //   //   // },
  //   // ]

  //   // } catch (err) {
  //   //   console.log(err);
  //   // } finally {
  //   //   console.log("done");
  //   // }
  // },
  addToCart(val: Ad, val2: string) {},
  clearCart() {},
  removeCartProduct(index: number | undefined) {},
});

export function cartProductPrice(cartProduct: Ad) {
  let price = cartProduct.price;
  return price;
}

type Prop = {
  cart: Ad | undefined;
  loading: boolean;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartProducts, setCartProducts] = useState<Ad[]>([]);

  let cartProducts2 = [
    {
      _id: "",
      title: "",
      price: 0,
      category: "",
      sizes: [""],
      description: "",
      contact: 0,
      userEmail: "",
      images: [],
      location: { lat: 0, lng: 0 },
    },
  ];
  const [loading, setLoading] = useState<Boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [cartName, setCartName] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    // let cartName = "";
    const username = async () => {
      const username = await GetSessionEmail();
      return username;
    };
    username().then((name) => {
      let cartName = "cart" + name;
      if (ls && ls.getItem(cartName)) {
        // cartProducts2 = JSON.parse(ls.getItem(cartName) || "{}");
        // console.log(cartProducts2);
        setCartProducts(JSON.parse(ls.getItem(cartName) || "{}"));
        setLoading(false);
      }
      let sizesName = "sizes" + name;
      if (ls && ls.getItem(sizesName)) {
        setSelectedSizes(JSON.parse(ls.getItem(sizesName) || ""));
        setLoading(false);
      }
      // setCartName(cartName2);
    });

    // setLoading(false);
  }, []);
  // first add user to JSON stringify along with cart products, and set name to cart + username
  // when doing use effect above, get username and test cart+username, to get ls.getItem for the cart+user

  function getCartProducts() {
    return cartProducts2;
  }

  async function saveCartProductsToLocalStorage(cartProducts: Ad[]) {
    const username = await GetSessionEmail();
    const cartName = "cart" + username;
    setCartName(cartName);
    if (ls) {
      ls.setItem(cartName, JSON.stringify(cartProducts));
      // setCartProducts(JSON.parse(ls.getItem(cartName) || "{}"));
    }
  }

  async function saveSizesToLS(selectedSizes: string[]) {
    const username = await GetSessionEmail();
    const sizesName = "sizes" + username;
    if (ls) {
      ls.setItem(sizesName, JSON.stringify(selectedSizes));
      // setCartProducts(JSON.parse(ls.getItem(cartName) || "{}"));
    }
  }

  // async function getCartProductsFromLocalStorage() {
  //   const username = GetSessionEmail();
  //   const cartName = "cart" + username;
  //   if (ls && ls.getItem(cartName)) {
  //     setCartProducts(JSON.parse(ls.getItem(cartName) || "{}"));
  //     return cartProducts;
  //   }
  //   console.log(cartProducts);
  //   return cartProducts;
  // }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: number | undefined) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  function addToCart(product: Ad, size: string) {
    setCartProducts((prevProducts) => {
      const newProducts = [...prevProducts, product];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
    setSelectedSizes((prevSizes) => {
      const newSizes = [...prevSizes, size];
      saveSizesToLS(newSizes);
      return newSizes;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          selectedSizes,
          getCartProducts,
          loading,
          setCartProducts,
          // getCartProductsFromLocalStorage,
          addToCart,
          clearCart,
          removeCartProduct,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
