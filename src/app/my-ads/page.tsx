import React, { useState } from "react";
import AdItem from "../_components/AdItem";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { connect } from "@/app/_libs/connectHelper";
import { Ad, AdModel } from "@/app/_models/Ad";
import { FilterQuery, Model } from "mongoose";
// import { authOptions } from "../_libs/authOptions";

export default async function myAdsPage({}) {
  const session = await getServerSession(authOptions);

  await connect();

  const filter: FilterQuery<Ad> = {};
  const email = session?.user?.email;
  if (email) {
    filter.userEmail = email;
  }

  const ads = await AdModel.find(filter, null, { sort: { createdAt: -1 } });

  if (!email) {
    return <div>Login to access this page.</div>;
  }

  return (
    <div className="flex w-full">
      <div className=" p-4 bg-gray-100 grow">
        <h2 className="font-bold mt-2 mb-2">My Ads</h2>
        <div className=" grid sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8">
          {ads.map((ad) => (
            <AdItem key={ad._id} ad={ad} />
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
}
