import type { Metadata } from "next";
import "./globals.css";

import Image from "next/image";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Listenur",
  description: "Listen on your network, no questions asked.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="select-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
