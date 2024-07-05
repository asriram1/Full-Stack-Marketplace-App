"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

import { CartContext } from "./AppContext";
import Cart from "./icons/Cart";
import Logo from "./icons/Logo";
import Google from "./icons/Google";

export default function Header({ session }: { session: Session | null }) {
  const { cartProducts } = useContext(CartContext);
  // let cartProducts = getCartProducts();
  return (
    <header className="border-b bg-gray-200 flex items-center justify-between h-24">
      <div className="flex flex-col items-center ml-5 ">
        {/* <img src={"/Liceria.png"} alt="logo" className="size-24" />
        <p className="text-sm text-[#1E88E5] italic mt-6.5 ">
          Trendy Fashion, Cheap Prices...{" "}
        </p> */}
        <a
          className="text-blue-600 font-bold text-2xl flex items-center gap-2 ml-5"
          href="/"
        >
          {/* <img src="logo.png" className="h-8 w-10" alt="logo" /> */}
          <Logo />
          Clothes Bazaar
        </a>
        <p className="text-xs italic">Luxury Finds, Great Prices </p>
      </div>

      <nav className="flex gap-4  *:rounded *:py-1 ">
        {session?.user && (
          <a
            href={"/new"}
            className="border border-blue-600 text-blue-600 inline-flex items-center gap-1 px-2 mr-2"
          >
            <FontAwesomeIcon className="h-4" icon={faPlus} />

            <span className="text-md">Post Ad</span>
          </a>
        )}

        <span className="border-r bg-black"></span>
        {!session?.user && (
          <>
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-300 transition delay-150 px-6"
            >
              <Google />
              Login with Google
            </button>
          </>
        )}
        {session?.user && (
          <>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  {" "}
                  <Image
                    alt="User Image"
                    src={session?.user?.image as string}
                    width={20}
                    height={20}
                    className="rounded-lg"
                  />
                  <div className="flex items-center text-md">
                    {session.user?.name}
                  </div>
                </Button>
                {/* <div className="inline-flex gap-2 cursor-pointer">
                  <Image
                    src={session?.user?.image as string}
                    width={30}
                    height={30}
                    className="rounded-lg"
                  />
                  <div className="flex items-center">{session.user?.name}</div>
                </div> */}
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="">
                <DropdownItem
                  key="ads"
                  className=" hover:bg-blue-300 hover:text-white bg-white px-4 py-2 w-[200px] flex items-center justify-center"
                  href={"/my-ads"}
                >
                  <Link
                    // className="bg-blue-300 mb-2 px-4 py-2 rounded-xl text-white text-xs"
                    href={"/my-ads"}
                  >
                    {" "}
                    My Ads
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="orders"
                  className=" hover:bg-blue-300 hover:text-white bg-white px-4 py-2 w-[200px] flex items-center justify-center"
                  href={"/orders"}
                >
                  <Link
                    // className="bg-blue-300 mb-2 px-4 py-2 rounded-xl text-white text-xs"
                    href={"/orders"}
                  >
                    {" "}
                    My Orders
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className=" hover:bg-blue-300 hover:text-white bg-white px-4 py-2 w-[200px] flex items-center justify-center"
                  color="danger"
                  onClick={() => {
                    signOut();
                    redirect("/");
                  }}
                >
                  <button
                    onClick={() => {
                      signOut();
                      redirect("/");
                    }}
                    // className="bg-gray-400 mt-2 px-4 py-2 rounded-xl text-white text-xs"
                  >
                    Logout
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <a href={"/cart"} className="relative mr-2">
              <Cart />

              {cartProducts?.length > 0 && (
                <div className="bg-red-200 rounded-full w-3 flex items-center justify-center absolute right-0 -top-2">
                  <div className="text-sm">{cartProducts.length}</div>
                </div>
              )}
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
