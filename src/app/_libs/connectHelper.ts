"use server";
import mongoose from "mongoose";
import { AdModel } from "@/app/_models/Ad";
import IdentityServer4 from "next-auth/providers/identity-server4";
export async function connect() {
  try {
    mongoose.connect(process.env.REACT_APP_MONGO_URL as string);
  } catch (error) {
    console.log(error);
  }
}

export async function connectAndFind(id) {
  mongoose.connect(process.env.REACT_APP_MONGO_URL as string);
  const adDoc = await AdModel.findById(id);
  //   { id }
  return JSON.parse(JSON.stringify(adDoc));
}
