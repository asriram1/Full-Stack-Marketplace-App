import { connect } from "@/app/_libs/connectHelper";
import { Ad, AdModel } from "@/app/_models/Ad";
import { FilterQuery, Model } from "mongoose";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request, res: Response) {
  await connect();
  const url = new URL(req.url);
  const phrase = url.searchParams.get("phrase") || null;
  const category = url.searchParams.get("category") || null;
  const min_price = url.searchParams.get("min") || null;
  const max_price = url.searchParams.get("max") || null;
  const email = url.searchParams.get("email") || null;

  const filter: FilterQuery<Ad> = {};

  if (email) {
    filter.userEmail = email;
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    filter.userEmail = { $ne: email };

    if (phrase) {
      filter.title = { $regex: ".*" + phrase + ".*", $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (max_price && min_price) {
      filter.price = { $lte: max_price, $gte: min_price };
    } else if (min_price) {
      filter.price = { $gte: min_price };
    } else if (max_price) {
      filter.price = { $lte: max_price };
    }

    if (url.searchParams.get("radius")) {
      const radius = parseFloat(url.searchParams.get("radius"));
      const center_lat = parseFloat(url.searchParams.get("lat"));
      const center_lng = parseFloat(url.searchParams.get("lng"));

      if (radius) {
        const earthRadiusInKm = 6371; // Radius of the Earth in kilometers
        const radiusInRadians = radius / earthRadiusInKm;

        const minLat = center_lat - radiusInRadians * (180 / Math.PI);
        const maxLat = center_lat + radiusInRadians * (180 / Math.PI);

        const minLng =
          center_lng -
          Math.asin(Math.sin(radiusInRadians) / Math.cos(center_lat));
        const maxLng =
          center_lng +
          Math.asin(Math.sin(radiusInRadians) / Math.cos(center_lat));

        // const minLng2 =
        //   center_lng -
        //   (radiusInRadians * (180 / Math.PI)) /
        //     Math.cos(center_lat * (Math.PI / 180));
        // const maxLng2 =
        //   center_lng +
        //   (radiusInRadians * (180 / Math.PI)) /
        //     Math.cos(center_lat * (Math.PI / 180));

        console.log(minLat, maxLat, minLng, maxLng);

        filter["location.lat"] = { $gte: minLat, $lte: maxLat };
        filter["location.lng"] = { $lte: minLng, $gte: maxLng };
      }
    }
  }

  const adsDocs = await AdModel.find(filter, null, { sort: { createdAt: -1 } });

  return Response.json(adsDocs);
}
