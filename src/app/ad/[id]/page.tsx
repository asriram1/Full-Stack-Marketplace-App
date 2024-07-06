"use server";
import { authOptions } from "@/app/_libs/authOptions";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteButton from "@/app/_components/DeleteButton";
import Gallery from "@/app/_components/Gallery";
import LocationMap from "@/app/_components/LocationMap";
import { connect } from "@/app/_libs/connectHelper";
import { formatMoney } from "@/app/_libs/helpers";
import { AdModel, Ad } from "@/app/_models/Ad";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AddToCartButton from "@/app/_components/AddToCartButton";

type Props = {
  params: {
    id: string;
  };
  // searchParam: { [key: string]: string };
};

export default async function SingleAdPage(args: Props) {
  await connect();
  const id = args.params.id;
  const adDoc = await AdModel.findById(id);
  const session = await getServerSession(authOptions);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // await connect();
  //     console.log(args.params.id);
  //     const adDoc = await findById(args.params.id);

  //     console.log(adDoc);
  //     return adDoc;
  //   };

  //   const adDoc = fetchData();
  //   console.log(adDoc);
  //   setAdDoc(adDoc);
  //   // console.log(adDoc, session);

  //   // if (!adDoc) {
  //   //   return "Not Found!";
  //   // }
  // }, []);

  // async function handleAsyncFunctionality() {
  //   await connect();
  //   const adDoc = await AdModel.findById(args.params.id);
  //   const session = await getServerSession(authOptions);
  //   return { adDoc, session };
  // }

  // function onAddToCartClick(adDoc) {
  //   addToCart(adDoc);
  //   toast.success("Added to cart");
  // }

  if (!adDoc) {
    return "Loading...";
  }

  return (
    <div className="flex " style={{ height: "100vh" }}>
      <div className="grow bg-black text-white flex flex-col relative">
        <Gallery files={adDoc.images} />
      </div>
      <div className="w-2/5 p-8 grow shrink-0 overflow-y-scroll">
        <h1 className="text-lg font-bold"> {adDoc.title}</h1>
        {session && session?.user?.email === adDoc.userEmail && (
          <div className="mt-2 flex gap-2">
            <Link
              href={"/ad/edit/" + args.params.id}
              className="bg-gray-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
            >
              <FontAwesomeIcon className="size-2" icon={faPencil} />
              <span>Edit</span>
            </Link>
            {/* <button className="bg-red-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center">
            <FontAwesomeIcon className="size-2" icon={faTrash} />
            <span>Delete</span>
          </button> */}
            <div className="z-50">
              <DeleteButton label="Delete" id={id} />
            </div>
          </div>
        )}
        {session && session?.user?.email !== adDoc.userEmail && (
          <div className="mt-2 flex gap-2">
            <AddToCartButton adDoc={adDoc} />
            {/* <button
              onClick={() => addToCart(adDoc)}
              className="bg-blue-300 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
            >
              <span>Add to Cart</span>
            </button> */}
            {/* <button className="bg-red-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center">
            <FontAwesomeIcon className="size-2" icon={faTrash} />
            <span>Delete</span>
          </button> */}
            {/* <div className="z-50">
            <DeleteButton label="Delete" id={id} />
          </div> */}
          </div>
        )}

        <label>Price</label>
        <p>{formatMoney(adDoc.price)}</p>
        <label>Category</label>
        <p className="text-sm"> {adDoc.category}</p>
        {session && session?.user?.email !== adDoc.userEmail
          ? adDoc.category !== "Accessories" && (
              <div>
                {/* <label>Available Sizes</label>
                <select
                  value={size}
                  onChange={(ev) => setSize(ev.target.value)}
                >
                  {adDoc.sizes[0].split(",").map((size) => (
                    <option value={size}>{size}</option>
                  ))}
                </select> */}
              </div>
            )
          : adDoc.category !== "Accessories" && (
              <div>
                <label>Available Sizes</label>
                <p className="text-sm"> {adDoc.sizes[0]}</p>
              </div>
            )}

        {/* {session &&
        session?.user?.email !== adDoc.userEmail &&
        adDoc.category !== "Accessories" ? (
          <div>
            <label>Available Sizes</label>
            <p className="text-sm"> {adDoc.sizes[0]}</p>
          </div>
        ) : (
          <div>
            <label>Available Sizes</label>
            <p className="text-sm"> {adDoc.sizes[0]}</p>
          </div>
        )} */}

        <label>Description</label>
        <p className="text-sm"> {adDoc.description}</p>
        <label>Contact</label>
        <p>{adDoc.contact}</p>
        <div className="w-full h-[300px]">
          <label>Location</label>

          <LocationMap lat={adDoc.location.lat} lng={adDoc.location.lng} />
        </div>
      </div>
    </div>
  );
}
