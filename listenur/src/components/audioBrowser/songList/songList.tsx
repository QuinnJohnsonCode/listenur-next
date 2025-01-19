"use client";

// Pagination guide using nextjs
// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd

import { calculateTime } from "@/lib/utils";
import SongTab from "@/components/audioBrowser/songTab/songTab";
import { useState, useEffect } from "react";
import getSongs from "@/lib/actions/getSongs";
import { useInView } from "react-intersection-observer";
import { useAudio } from "@/contexts/AudioProvider";

const NUMBER_OF_SONGS_TO_FETCH = 10;

const SongList = ({ initialSongs }: { initialSongs?: any }) => {
  const [songs, setSongs] = useState<any[]>(initialSongs);
  const [offset, setOffset] = useState(NUMBER_OF_SONGS_TO_FETCH);
  const [ref, inView] = useInView();

  const fetchMoreSongs = async () => {
    const apiSongs = await getSongs(offset, NUMBER_OF_SONGS_TO_FETCH);
    setSongs((songs) => [...songs, ...apiSongs]);
    setOffset((offset) => offset + NUMBER_OF_SONGS_TO_FETCH);
  };

  useEffect(() => {
    if (inView) {
      fetchMoreSongs();
    }
  }, [inView]);

  const { setCurrentSong } = useAudio();

  return (
    <ul className="max-h-[calc(100vh-20rem)] flex-1 overflow-y-auto space-y-2">
      {songs.map((song: any) => {
        return (
          <SongTab
            key={song._id}
            song={{
              id: song._id,
              title: song.title,
              artist: song.artist.name,
              album: song.album.title,
              coverPath: song.album.coverPath,
              duration: calculateTime(song.duration),
            }}
            onClick={() => setCurrentSong(song)}
          />
        );
      })}
      <div
        ref={ref}
        className="loading flex justify-center items-center mt-4 text-gray-500 text-sm"
      >
        <div className="loader border-4 border-t-4 border-gray-200 border-t-teal-300 rounded-full w-5 h-5 mr-2 animate-spin"></div>
        Loading more tunes...
      </div>
    </ul>
  );
};

export default SongList;
