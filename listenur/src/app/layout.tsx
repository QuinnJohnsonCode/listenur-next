import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <div className="container">

          <main className="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
