import { UploadResponse } from "imagekit/dist/libs/interfaces";
import Image from "next/image";
import React from "react";
import MyImage from "./MyImage";

export default function UploadView({ file }: { file: UploadResponse }) {
  if (file.fileType === "image") {
    return (
      <MyImage
        src={file.filePath}
        alt={"product photo"}
        width={2048}
        height={2048}
        className="w-auto rounded max-h-full h-auto"
      />
    );
  }

  return <div>{file.name}</div>;
}
