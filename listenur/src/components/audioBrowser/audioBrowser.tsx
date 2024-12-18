import styles from "./audioBrowser.module.css";
import Image from "next/image";
import { FaPlay, FaBars } from "react-icons/fa";

const AudioBrowser = () => {
    return (
        <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-4 text-teal-300">Browse</h2>
            
            {/* Table Headings */}
            <div className="grid grid-cols-[90px_2fr_2fr_80px] gap-4 px-5 text-gray-300 text-sm pb-2">
                <div>
                    <span className="cursor-pointer hover:text-teal-600 transition-colors">#</span>
                </div>
                <div>
                    <span className="cursor-pointer hover:text-teal-600 transition-colors">Title</span>
                </div>

                <div>
                    <span className="cursor-pointer hover:text-teal-600 transition-colors">Album</span>
                </div>

                <div>
                    <span className="cursor-pointer hover:text-teal-600 transition-colors">Duration</span>
                </div>
            </div>

            {/* List of Songs */}
            <ul className="max-h-[calc(100vh-20rem)] flex-1 overflow-y-auto space-y-2">
                <li className="grid grid-cols-[90px_2fr_2fr_80px] gap-4 cursor-pointer items-center p-2 bg-gray-600 rounded hover:bg-teal-600 transition-colors">  

                    <div className="flex items-center gap-2 text-white">
                        {/* Play/Number (todo, add playlist/collection numbers) */}
                        <FaPlay className="mx-2" />
                        

                        {/* Album Cover */}
                        <Image 
                        src="/album-covers/album-cover.jpg"
                        alt="Thumbnail for album cover"
                        className="rounded-sm"
                        width={50}
                        height={50}
                        />
                    </div>

                    {/* Title/Artist */}
                    <div className="flex flex-col">
                        <div>
                            Beds are Burning
                        </div>
                        <div className="text-sm text-gray-300">
                            Midnight Oil
                        </div>
                    </div>

                    {/* Album Title */}
                    <div className="text-gray-300">20,000 Watt R.S.L</div>

                    {/* Duration */}
                    <div className="text-gray-300 flex items-center gap-6">
                        <div>
                            3:45
                        </div>
                        <div>
                            <FaBars />
                        </div>
                    </div>
                </li>
            </ul>


        </div>
    );
};

export default AudioBrowser;