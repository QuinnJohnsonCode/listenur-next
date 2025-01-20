"use client";

// Pagination guide using nextjs
// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd

import { calculateTime } from "@/lib/utils";
import SongTab from "@/components/audioBrowser/songTab/songTab";
import { useState, useEffect } from "react";
import getSongs from "@/lib/actions/getSongs";
import { useInView } from "react-intersection-observer";
import { useAudio } from "@/contexts/AudioProvider";
import { IoIosRefresh } from "react-icons/io";

const NUMBER_OF_SONGS_TO_FETCH = 20;

const SongList = ({ initialSongs }: { initialSongs?: any }) => {
  const [songs, setSongs] = useState<any[]>(initialSongs);
  const [offset, setOffset] = useState(NUMBER_OF_SONGS_TO_FETCH);
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  // Decides how to filter songs
  const [filter, setFilter] = useState("none");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [hitBottom, setHitBottom] = useState(false);

  const fetchMoreSongs = async (newOffset = offset) => {
    if (isLoading || hitBottom) return;
    setIsLoading(true);

    const apiSongs = await getSongs(
      newOffset,
      NUMBER_OF_SONGS_TO_FETCH,
      filter,
      order
    );

    if (apiSongs.length <= 0) {
      setHitBottom(true);
    }

    setSongs((prevSongs) => [...prevSongs, ...apiSongs]);
    setOffset(newOffset + NUMBER_OF_SONGS_TO_FETCH);

    setIsLoading(false);
  };

  const clearSongs = async () => {
    setIsLoading(true);
    setOffset(0);
    setSongs([]);
    setHitBottom(false);

    await fetchMoreSongs(0);

    setIsLoading(false);
  };

  useEffect(() => {
    clearSongs();
  }, [filter, order]);

  useEffect(() => {
    if (inView) {
      fetchMoreSongs();
    }
  }, [inView]);

  const { setCurrentSong } = useAudio();

  const handleFilterChange = (newFilter: string) => {
    if (filter === newFilter && order === "asc") {
      setOrder("desc");
    } else if (filter === newFilter && order === "desc") {
      newFilter = "none";
      setOrder("asc");
    }

    setFilter(newFilter);
  };

  return (
    <div>
      <div
        onClick={() => handleFilterChange("none")}
        className="flex items-center mb-1 gap-1 cursor-pointer hover:text-teal-600 transition-colors"
      >
        <IoIosRefresh />
        <div>Refresh Listings</div>
      </div>
      <div className="grid grid-cols-[90px_2fr_2fr_80px] gap-4 px-5 text-gray-300 text-sm pb-2">
        <div>#</div>
        <div>
          <span
            onClick={() => handleFilterChange("title")}
            className="cursor-pointer hover:text-teal-600 transition-colors"
          >
            Title
            {filter === "title" && (
              <span className="ml-2">{order === "asc" ? "▲" : "▼"}</span>
            )}
          </span>
        </div>

        <div>
          <span
            onClick={() => handleFilterChange("albumTitle")}
            className="cursor-pointer hover:text-teal-600 transition-colors"
          >
            Album
            {filter === "albumTitle" && (
              <span className="ml-2">{order === "asc" ? "▲" : "▼"}</span>
            )}
          </span>
        </div>

        <div>
          <span
            onClick={() => handleFilterChange("duration")}
            className="cursor-pointer hover:text-teal-600 transition-colors"
          >
            Duration
            {filter === "duration" && (
              <span className="ml-2">{order === "asc" ? "▲" : "▼"}</span>
            )}
          </span>
        </div>
      </div>

      <ul className="max-h-[calc(100vh-22rem)] flex-1 overflow-y-auto space-y-2">
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
        {!hitBottom && (
          <div
            ref={ref}
            className="loading flex justify-center items-center mt-4 text-gray-500 text-sm"
          >
            <div className="loader border-4 border-t-4 border-gray-200 border-t-teal-300 rounded-full w-5 h-5 mr-2 animate-spin"></div>
            Loading more tunes...
          </div>
        )}
      </ul>
    </div>
  );
};

export default SongList;
