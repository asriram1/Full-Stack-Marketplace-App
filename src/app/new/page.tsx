"use client";
import AdTextInputs from "@/app/_components/AdTextInputs";
import LocationPicker, { Location } from "@/app/_components/LocationPicker";
import UploadArea from "@/app/_components/UploadArea";
import Uploader from "@/app/_components/Uploader";
import {
  faImage,
  faLocationCrosshairs,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import React, { useEffect, useState } from "react";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons/faLessThanEqual";
import SubmitButton from "@/app/_components/SubmitButton";
import { redirect } from "next/navigation";
import { createAd } from "../_actions/adActions";

const locationDefault = {
  lat: 41.878,
  lng: -87.629,
};

export default function NewAdPage() {
  // const [files, setFiles] = useState<UploadResponse[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<Location>(locationDefault);
  const [gpsCoords, setGpsCoords] = useState<Location | null>(null);
  const [sizes, setSizes] = useState<string[]>([]);

  function handleFindMyPositionClick() {
    navigator.geolocation.getCurrentPosition((ev) => {
      setLocation({ lat: ev.coords.latitude, lng: ev.coords.longitude });
      setGpsCoords({ lat: ev.coords.latitude, lng: ev.coords.longitude });
    }, console.error);
  }

  async function handleSubmit(formData: FormData) {
    formData.set("location", JSON.stringify(location));
    formData.set("images", JSON.stringify(images));
    // formData.set("files", JSON.stringify(files));

    console.log(sizes);
    formData.append("sizes", sizes[0]);

    const response = await createAd(formData);

    redirect("/ad/" + response._id);
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-xl mx-auto grid grid-cols-2 gap-8"
    >
      <div className="grow pt-8">
        <UploadArea setImages={setImages} />
        <div>
          <label className="text-center" htmlFor="">
            {" "}
            Where is it located?
          </label>
          <button
            type="button"
            onClick={handleFindMyPositionClick}
            className="flex w-full gap-2 items-center justify-center border border-blue-600 text-blue-600 py-2 mb-2 rounded"
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} />

            <span>Share current location</span>
          </button>
          <div className="bg-gray-100 min-h-12 rounded overflow-hidden text-gray-400">
            <LocationPicker
              defaultLocation={location}
              gpsCoords={gpsCoords}
              onChange={setLocation}
            />
          </div>
        </div>
      </div>
      <div className="grow">
        <AdTextInputs setSizes={setSizes} />
        <SubmitButton>Publish</SubmitButton>
      </div>
    </form>
  );
}
