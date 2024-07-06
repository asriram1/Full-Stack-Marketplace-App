import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import { getServerSession } from "next-auth";

// import { authOptions } from "./api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./_components/AppContext";
import { authOptions } from "./_libs/authOptions";
// import { authOptions } from "./_libs/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Online Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header session={session} />
          <Toaster />
          {children}
          <footer className="border-t p-5 text-center text-gray-400">
            &copy; 2024 Clothes Bazaar. All rights reserved.
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
