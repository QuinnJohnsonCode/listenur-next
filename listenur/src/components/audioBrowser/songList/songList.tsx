"use client";

// Pagination guide using nextjs
// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd

import { calculateTime } from "@/lib/utils";
import SongTab from "@/components/audioBrowser/songTab/songTab";
import { useState, useEffect, useRef } from "react";
import getSongs from "@/lib/actions/getSongs";
import { useInView } from "react-intersection-observer";
import { useAudio } from "@/contexts/AudioProvider";
import { IoIosRefresh } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// @ts-ignore
import debounce from "lodash.debounce";

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
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hitBottom, setHitBottom] = useState(false);

  // Used to set the global current song state from the AudioProvider
  const { setCurrentSong } = useAudio();

  // Fetch songs and avoid loading race conditions and endless fetching
  const fetchMoreSongs = async (newOffset = offset) => {
    if (isLoading || hitBottom) return;
    setIsLoading(true);

    const apiSongs = await getSongs(
      newOffset,
      NUMBER_OF_SONGS_TO_FETCH,
      filter,
      order,
      debouncedSearch
    );

    if (apiSongs.length < NUMBER_OF_SONGS_TO_FETCH) {
      setHitBottom(true);
    }

    setSongs((prevSongs) => [...prevSongs, ...apiSongs]);
    setOffset(newOffset + NUMBER_OF_SONGS_TO_FETCH);

    setIsLoading(false);
  };

  // Return list to defaults and refetch
  const clearSongs = async () => {
    setIsLoading(true);
    setOffset(0);
    setSongs([]);
    setHitBottom(false);

    await fetchMoreSongs(0);

    setIsLoading(false);
  };

  // Changes the filter and ordering based on newFilter and previous order
  const handleFilterChange = (newFilter: string) => {
    if (filter === newFilter && order === "asc") {
      setOrder("desc");
    } else if (filter === newFilter && order === "desc") {
      newFilter = "none";
      setOrder("asc");
    }

    setFilter(newFilter);
  };

  // Debounce search input to avoid rapid queries
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 300); // Delay 300ms
    handler();

    return () => handler.cancel();
  }, [search]);

  // Clear songs any time filter, order, or search changes
  useEffect(() => {
    clearSongs();
  }, [filter, order, debouncedSearch]);

  // Infinite scroll, if reference object (ref) is on the screen, fetch more songs
  useEffect(() => {
    if (inView) {
      fetchMoreSongs();
    }
  }, [inView]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        {/* Refresh Button */}
        <div
          onClick={() => handleFilterChange("none")}
          className="flex items-center gap-1 cursor-pointer hover:text-teal-600 transition-colors"
        >
          <IoIosRefresh />
          <div>Refresh Listings</div>
        </div>

        {/* Search Field */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search titles..."
              className="w-full py-2 pl-10 pr-4 text-white bg-gray-700 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
              onChange={(event) => setSearch(event.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-300 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Headings for the list */}
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

      {/* Main list holding SongTab objects */}
      <ul className="max-h-[calc(100vh-24rem)] flex-1 overflow-y-auto space-y-2">
        {songs.length > 0 &&
          songs.map((song: any, index: number) => {
            return (
              <SongTab
                key={`${song._id}-${index}`} // Create a unique composite key
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

        {/* Infinite scroll loading reference */}
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
