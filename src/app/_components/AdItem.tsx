import React from "react";
import Link from "next/link";
import { Ad } from "@/app/_models/Ad";
import UploadThumbnail from "./UploadThumbnail";
import MyImage from "./MyImage";
import Image from "next/image";

export default function AdItem({ ad }: { ad: Ad }) {
  return (
    <div className="h-5/6">
      {" "}
      {ad.images?.length > 0 && (
        <a
          href={"/ad/" + ad._id}
          className=" bg-gray-400 p-4 hover:bg-white hover:shadow-md hover: shadow-black/25 transition-all h-full flex flex-col justify-center rounded-md overflow-hidden items-center"
        >
          <Image
            alt={"product thumbnail"}
            width={300}
            height={300}
            src={ad.images[0]}
          />

          {/* <MyImage
            alt={"product thumbnail"}
            width={300}
            height={300}
            aiCrop={true}
            src={ad.files[0].filePath + "?tr=fo-auto"}
          /> */}
        </a>
      )}
      <div>
        <a href={"/ad/" + ad._id}>
          <p className="mt-1 font-bold">${ad.price}</p>
          <p>{ad.title}</p>
        </a>
      </div>
    </div>
  );
}
