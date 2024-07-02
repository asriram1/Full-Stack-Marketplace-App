"use server";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_libs/authOptions";

// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function GetSessionEmail() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return email || "";
}
