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
type Props = {
  files: UploadResponse[];
  setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
};

export default function UploadArea({ files, setFiles }: Props) {
  const [isUploading, setIsUploading] = useState(false);
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
          <span>Add Photos</span>
          <Uploader
            className="hidden"
            onSuccess={(file) => {
              setFiles((prev) => [...prev, file]);
              setIsUploading(false);
            }}
          />
        </label>
        <div className="flex gap-2  mt-2 flex-wrap">
          {files.map((file) => (
            <div className="text-xs size-16 rounded overflow-hidden">
              <UploadThumbnail file={file} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
