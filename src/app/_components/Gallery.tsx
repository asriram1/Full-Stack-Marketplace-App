"use client";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import React, { useEffect, useState } from "react";
import UploadView from "./UploadView";
import UploadThumbnail from "./UploadThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MyImage from "./MyImage";
import Image from "next/image";

export default function Gallery({ files }: { files: string[] }) {
  const [activeFile, setActiveFile] = useState<number>(0);

  useEffect(() => {}, [activeFile]);

  function next() {
    const activeFileIndex = activeFile;
    const nextIndex =
      activeFileIndex === files.length - 1 ? 0 : activeFileIndex + 1;
    const nextFile = files[nextIndex];
    setActiveFile(nextIndex);
  }

  function prev() {
    const activeFileIndex = activeFile;
    const prevIndex =
      activeFileIndex === 0 ? files.length - 1 : activeFileIndex - 1;
    const prevFile = files[prevIndex];
    setActiveFile(prevIndex);
  }
  return (
    <>
      {files && (
        <div className="absolute inset-0 overflow-hidden ">
          <Image
            src={files[activeFile]}
            alt={"bg"}
            width={2048}
            height={2048}
            className="object-cover opacity-30 blur w-full h-full"
          />
          {/* <MyImage
            src={activeFile.filePath}
            alt={"bg"}
            width={2048}
            height={2048}
            className="object-cover opacity-30 blur w-full h-full"
          /> */}
        </div>
      )}
      <div className="grow flex items-center relative ">
        {files && (
          <>
            <div className="absolute inset-4 max-w-full max-h-full flex items-center justify-center">
              <UploadView file={files[activeFile]} />
            </div>
            <div className="absolute inset-4 flex items-center">
              <div className=" flex justify-between w-full">
                <button
                  onClick={prev}
                  className="flex items-center size-12 justify-center rounded-full bg-gray-500/40 hover:bg-gray-500/80 transition"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  onClick={next}
                  className="flex items-center size-12 justify-center rounded-full bg-gray-500/40 hover:bg-gray-500/80 transition"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex gap-3 justify-center relative z-10">
        {files.map((file, index) => (
          <div
            key={index}
            className="size-24 cursor-pointer rounded overflow-hidden"
          >
            <a onClick={() => setActiveFile(index)} target="_blank">
              <Image
                alt={"product thumbnail"}
                width={300}
                height={300}
                src={file}
              />
            </a>

            {/* <UploadThumbnail onClick={() => setActiveFile(file)} file={file} /> */}
          </div>
        ))}
      </div>
    </>
  );
}
