"use client";
import AdItem from "@/app/_components/AdItem";
import SubmitButton from "@/app/_components/SubmitButton";
import UploadThumbnail from "@/app/_components/UploadThumbnail";
import { Ad } from "@/app/_models/Ad";
import { categories } from "@/app/_libs/helpers";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faStore } from "@fortawesome/free-solid-svg-icons";
import LabelRadioButton from "@/app/_components/LabelRadioButton";
import SearchForm from "@/app/_components/SearchForm";
import { getServerSession } from "next-auth";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  function fetchAds(params?: URLSearchParams) {
    let url = `/api/ads`;
    if (params) {
      url = `/api/ads?${params?.toString() || ""}`;
    }
    console.log(url);
    fetch(url).then((response) => {
      response.json().then((adsDocs) => {
        setAds(adsDocs);
      });
    });
  }

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    fetchAds(params);
  }

  return (
    <div className="flex w-full">
      <SearchForm handleSearch={handleSearch} />
      <div className=" p-4 bg-gradient-to-bl from-purple-600 to-blue-600 text-white grow w-3/4">
        <h2 className="font-bold mt-2 mb-2">Latest Products</h2>
        <div className=" grid sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8">
          {ads.map((ad) => (
            <AdItem key={ad._id} ad={ad} />
          ))}
        </div>

        <div className="mb-6"></div>
      </div>
    </div>
  );
}
