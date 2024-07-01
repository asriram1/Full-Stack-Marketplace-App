import { UploadResponse } from "imagekit/dist/libs/interfaces";
import Image from "next/image";
import React, { MouseEvent, MouseEventHandler } from "react";
import MyImage from "./MyImage";

type Props = {
  file: UploadResponse;
  onClick?: () => void;
};

export default function UploadThumbnail({ file, onClick }: Props) {
  function handleClick(ev: React.MouseEvent) {
    if (onClick) {
      ev.preventDefault();
      return onClick();
    }
    // location.href = file.url;
  }

  if (file.fileType === "image") {
    return (
      <a onClick={onClick && handleClick} href={file.url} target="_blank">
        <MyImage
          alt={"product thumbnail"}
          width={300}
          height={300}
          aiCrop={true}
          src={file.filePath + "?tr=fo-auto"}
        />
      </a>
    );
  }

  return <div></div>;
}
