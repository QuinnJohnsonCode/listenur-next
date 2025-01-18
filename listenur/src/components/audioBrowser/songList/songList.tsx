import { calculateTime } from "@/lib/utils";
import SongTab from "@/components/audioBrowser/songTab/songTab";

const SongList = ({ initialSongs }: { initialSongs?: any }) => {
  return (
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
  );
};

export default SongList;
