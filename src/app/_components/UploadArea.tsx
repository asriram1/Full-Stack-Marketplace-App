import { UploadResponse } from "imagekit/dist/libs/interfaces";
import React, { Dispatch, SetStateAction, createRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faLocationCrosshairs,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Uploader from "@/app/_components/Uploader";
import UploadThumbnail from "./UploadThumbnail";
import toast from "react-hot-toast";
type Props = {
  setImages: Dispatch<SetStateAction<string[]>>;
};

export default function UploadArea({ setImages }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [localImages, setLocalImages] = useState<string[]>([]);

  async function handleFileChange(files: any) {
    const data = new FormData();
    for (var x = 0; x < files.length; x++) {
      data.append("files[]", files[x]);
    }
    const response = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });
    const links = await response.json();
    setImages(links);
    setLocalImages(links);
    console.log(links);
    if (response.ok) {
      toast.success("Upload Complete");
      setIsUploading(false);
    } else {
      toast.error("Upload Error");
      setIsUploading(false);
    }
  }
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-center text-gray-600 uppercase text-xs font-bold">
        Add photos of your product
      </h2>

      <div className="flex flex-col">
        <FontAwesomeIcon icon={faImage} className="h-24 text-gray-300" />

        <label
          onClick={() => {
            setIsUploading(true);
          }}
          className={
            isUploading
              ? "mt-2 bg-gray-300 text-white px-4 py-2 rounded-xl inline-flex gap-1 items-center justify-center"
              : "mt-2  bg-blue-600 text-white px-4 py-2 rounded-xl inline-flex gap-1 items-center justify-center cursor-pointer"
          }
        >
          <FontAwesomeIcon icon={faPlus} className="h-4" />
          {!isUploading && <span>Add Photos</span>}
          {isUploading && <span>Uploading...</span>}
          <input
            type="file"
            hidden
            multiple
            // Event handler to capture file selection and update the state
            onChange={(event) => {
              event.preventDefault();
              console.log(event.target.files); // Log the selected file
              handleFileChange(event.target.files); // Update the state with the selected file
            }}
          />
        </label>
        <div className="flex gap-2  mt-2 flex-wrap">
          {localImages &&
            localImages.map((image) => (
              <div className="text-xs size-16 rounded overflow-hidden">
                <img
                  alt={"product thumbnail"}
                  width={300}
                  height={300}
                  src={image}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
