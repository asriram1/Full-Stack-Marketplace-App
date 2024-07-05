import Image from "next/image";
import React from "react";

export default function Google() {
  return (
    <Image
      src="/google.png"
      className="size-5"
      width={5}
      height={5}
      alt="google"
    />
  );
}
