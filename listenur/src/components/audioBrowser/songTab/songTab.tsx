import Image from "next/image";
import { FaPlay, FaBars } from "react-icons/fa";

const SongTab = ({ song }: { song?: any }) => {
    return (
        <li className="group grid grid-cols-[90px_2fr_2fr_80px] gap-4 cursor-pointer items-center p-2 bg-gray-600 rounded hover:bg-teal-600 transition-colors">  

                    <div className="flex items-center gap-2 text-white">
                        {/* Play/Number (todo, add playlist/collection numbers) */}
                        <FaPlay className="invisible group-hover:visible mx-2" />
                        

                        {/* Album Cover */}
                        <Image 
                        src={`data:${song.albumType};base64,${song.albumImage}`}
                        alt="Thumbnail for album cover"
                        className="rounded-sm"
                        width={50}
                        height={50}
                        />
                    </div>

                    {/* Title/Artist */}
                    <div className="flex flex-col">
                        <div>
                            { song.title }
                        </div>
                        <div className="text-sm text-gray-300">
                            { song.artist }
                        </div>
                    </div>

                    {/* Album Title */}
                    <div className="text-gray-300">{ song.album }</div>

                    {/* Duration */}
                    <div className="text-gray-300 flex items-center gap-6">
                        <div>
                            { song.duration }
                        </div>
                        <div>
                            <FaBars />
                        </div>
                    </div>
                </li>
    );
};

export default SongTab;