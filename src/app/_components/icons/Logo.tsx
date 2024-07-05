import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      className="h-8 w-10"
      width={10}
      height={8}
      alt="logo"
    />
  );
}
