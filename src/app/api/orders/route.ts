import { connect } from "@/app/_libs/connectHelper";
import { Ad, AdModel } from "@/app/_models/Ad";
import { Order } from "@/app/_models/Order";
var ObjectId = require("mongodb").ObjectId;
import { FilterQuery, Model } from "mongoose";
import React from "react";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/_libs/authOptions";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request, res: Response) {
  await connect();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id") || null;

  if (_id) {
    const ordersDocs = await Order.findById(_id);

    // await AdModel.find(filter, null, { sort: { createdAt: -1 } });
    return Response.json(ordersDocs);
  }
  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
  return true;
}
