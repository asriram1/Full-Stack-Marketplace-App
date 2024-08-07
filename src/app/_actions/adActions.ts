"use server";
import React from "react";
import mongoose from "mongoose";
import { AdModel } from "@/app/_models/Ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../_libs/authOptions";
var ObjectID = require("mongodb").ObjectID;

// import { authOptions } from "../api/auth/[...nextauth]/route";

async function connect() {
  mongoose.connect(process.env.REACT_APP_MONGO_URL as string);
}

export async function createAd(formData: FormData) {
  const { images, location, ...data } = Object.fromEntries(formData);
  const session = await getServerSession(authOptions);

  await connect();

  const newAdData = {
    ...data,
    images: JSON.parse(images as string),
    location: JSON.parse(location as string),
    userEmail: session?.user?.email,
  };

  console.log(newAdData);
  const adDoc = await AdModel.create(newAdData);
  console.log(adDoc);
  return JSON.parse(JSON.stringify(adDoc));
}

export async function findById(id: string) {
  await connect();

  const adDoc = await AdModel.findById(id);
  // const session = await getServerSession(authOptions);
  console.log(JSON.parse(JSON.stringify(adDoc)));
  return JSON.parse(JSON.stringify(adDoc));
  // return {JSON.parse(JSON.stringify(adDoc)), session};
}

export async function editAd(formData: FormData, id: String) {
  const { images, location, ...data } = Object.fromEntries(formData);
  const session = await getServerSession(authOptions);

  await connect();

  const filter = { _id: id };
  console.log(data);
  //upsert true means add doc if none exsists
  const options = { upsert: true };
  console.log(images);
  const updatedAdData = {
    ...data,
    images: JSON.parse(images as string),
    location: JSON.parse(location as string),
    userEmail: session?.user?.email,
  };

  const updateDoc = {
    $set: updatedAdData,
  };
  console.log(updateDoc);
  const result = await AdModel.updateOne(filter, updateDoc);
  return result;
}

export async function deleteAd(id: String) {
  await connect();

  const result = await AdModel.deleteOne({ _id: id });
  console.log(result);
}
