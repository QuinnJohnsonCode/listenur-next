import ScanButton from "@/components/audioBrowser/scanButton/scanButton";
import SongTab from "./songTab/songTab";
import { calculateTime, findById } from "@/lib/utils";
import getSongs from "@/lib/actions/getSongs";

const INITIAL_NUMBER_OF_SONGS = 10;

const AudioBrowser = async () => {
  const initialSongs = await getSongs(0, INITIAL_NUMBER_OF_SONGS);

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-teal-300">Browse</h2>
        <ScanButton />
      </div>

      {/* Table Headings */}
      <div className="grid grid-cols-[90px_2fr_2fr_80px] gap-4 px-5 text-gray-300 text-sm pb-2">
        <div>
          <span className="cursor-pointer hover:text-teal-600 transition-colors">
            #
          </span>
        </div>
        <div>
          <span className="cursor-pointer hover:text-teal-600 transition-colors">
            Title
          </span>
        </div>

        <div>
          <span className="cursor-pointer hover:text-teal-600 transition-colors">
            Album
          </span>
        </div>

        <div>
          <span className="cursor-pointer hover:text-teal-600 transition-colors">
            Duration
          </span>
        </div>
      </div>

      {/* List of Songs */}
      <ul className="max-h-[calc(100vh-20rem)] flex-1 overflow-y-auto space-y-2">
        {initialSongs.map((song: any) => {
          return (
            <SongTab
              key={song._id}
              song={{
                title: song.title,
                artist: song.artist.name,
                album: song.album.title,
                coverPath: song.album.coverPath,
                duration: calculateTime(song.duration),
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default AudioBrowser;
