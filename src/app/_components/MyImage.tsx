"use client";
import Image, { ImageProps } from "next/image";

type LoaderProps = {
  src: string;
  width?: number;
  height?: number;
  quality?: number | undefined;
  aiCrop?: boolean;
};

const imageKitLoader = ({
  src,
  width,
  height,
  quality,
  aiCrop,
}: LoaderProps) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (height && aiCrop) {
    params.push("h-${height}");
  }
  if (quality) {
    params.push(`q-${quality}`);
  }
  if (aiCrop) {
    params.push("fo-auto");
  }
  const paramsString = params.join(",");
  var urlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT as string;
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

type MyImageProps = ImageProps & {
  aiCrop?: boolean;
  height?: number;
  width: number;
};

const MyImage = (props: MyImageProps) => {
  return (
    <Image
      alt="sample"
      loader={(args) =>
        imageKitLoader({
          ...args,
          width: props.width,
          height: props.height,
          aiCrop: props.aiCrop,
        })
      }
      {...props}
    />
  );
};

export default MyImage;
