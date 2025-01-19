import ScanButton from "@/components/audioBrowser/scanButton/scanButton";
import FilterHeadings from "@/components/audioBrowser/filterHeadings/filterHeadings";
import SongList from "@/components/audioBrowser/songList/songList";
import getSongs from "@/lib/actions/getSongs";

const INITIAL_NUMBER_OF_SONGS = 10;

const AudioBrowser = async ({ setCurrentSong }: { setCurrentSong: any }) => {
  const initialSongs = await getSongs(0, INITIAL_NUMBER_OF_SONGS);

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-teal-300">Browse</h2>
        <ScanButton />
      </div>

      {/* Table Headings */}
      <FilterHeadings />

      {/* List of Songs */}
      <SongList initialSongs={initialSongs} />
    </div>
  );
};

export default AudioBrowser;
