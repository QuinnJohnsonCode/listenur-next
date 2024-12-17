import type { Metadata } from "next";
import "./globals.css";

import Image from 'next/image';
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";

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
      {/* <!-- Header --> */}
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col min-h-screen">
        <header className="bg-gray-800 py-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-teal-400">listenur</h1>
          </div>
        </header>

        {/* <!-- Main Content --> */}
        <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <!-- Song Browser Card --> */}
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4 text-teal-300">Browse Songs</h2>
            <ul className="max-h-[calc(100vh-20rem)] flex-1 overflow-y-auto space-y-2">
              <li className="flex cursor-pointer justify-between p-3 bg-gray-600 rounded hover:bg-teal-600 transition-colors">
                <div className="font-medium text-white">Title - Band</div>
                <div className="text-gray-300">Album</div>
                <div className="text-gray-300">Duration</div>
              </li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 2</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 3</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 4</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 2</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 3</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 4</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 2</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 3</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 4</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 3</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 4</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
              <li className="p-3 bg-gray-600 rounded hover:bg-teal-600 cursor-pointer transition-colors">Song 5</li>
            </ul>
          </div>

          {/* <!-- Audio Player Card --> */}
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4 text-center text-teal-300">Now Playing</h2>
            <div className="m-2.5 rounded-md h-auto flex justify-center items-center">
              <Image
                src="/album-covers/album-cover.jpg"
                alt="Album Cover"
                className="rounded-md border-2 border-gray-600 shadow-md"
                width={400}
                height={400}
              />
            </div>
            <div className="text-center mb-4">
              <p className="text-lg font-medium text-gray-200">Beds are Burning - Midnight Oil</p>
            </div>
            <div className="w-full flex items-center justify-center mb-4">
              {/* <!-- Audio Player Controls --> */}
              <audio className="w-full bg-gray-800 rounded">
                {/* <source src="your-audio-file.mp3" type="audio/mpeg"> */}
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="w-full flex gap-5 items-center justify-center">
              {/* Skip Backwards */}
              <IoPlaySkipBackSharp className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />

              {/* Play/Pause */}
              <FaPlay className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
              <FaPause className="hidden"/>

              {/* Skip Forwards */}
              <IoPlaySkipForwardSharp className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
            </div>

            {/* <!-- Player Progress --> */}
            <div className="flex justify-between text-sm text-gray-400">
              <span>0:00</span>
              <span>3:45</span>
            </div>
          </div>
        </main>

        {/* <!-- Footer --> */}
        <footer className="bg-gray-800 py-4 shadow-md">
          <div className="container mx-auto text-center text-sm text-gray-400">
            © 2024 listenur. Life's better with music. Play on! 🎧
          </div>
        </footer>




      {/* <body>
        <div classNameName="container">

          <main classNameName="main">
            {children}
          </main>
        </div>
      </body> */}
      </body>
    </html>
  );
}
