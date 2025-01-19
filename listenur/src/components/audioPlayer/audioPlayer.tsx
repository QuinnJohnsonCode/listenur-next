"use client";
import { calculateTime } from "@/lib/utils";
import styles from "./audioPlayer.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { useAudio } from "@/contexts/AudioProvider";

const AudioPlayer = () => {
  // Shared currentSong state (contains a song object)
  const { currentSong } = useAudio();

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // References
  const audioPlayer: any = useRef();
  const progressBar: any = useRef();
  const animationRef: any = useRef();

  // Set initial duration/progress bar
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const isLoaded = () => {
    return currentSong !== null;
  };

  // Toggles between play and pause on button press
  const togglePlayPause = () => {
    if (!isLoaded()) return;

    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current); // Cancels progress bar updates
    }
  };

  // Updates progress bar and animation frame
  const whilePlaying = () => {
    if (!isLoaded()) return;

    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  // Gets new time from the audio player to modify progress bar (on progress bar click)
  const changeRange = () => {
    if (!isLoaded()) return;

    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  // Modifies progress bar's position
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col justify-center h-full">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-teal-300">
        Now Playing
      </h2>

      {/* Album Cover */}

      <div className="m-2.5 rounded-md h-auto flex justify-center items-center">
        <Image
          src={currentSong?.album?.coverPath || "/album-covers/unknown.jpg"}
          alt="Album Cover"
          className="rounded-md border-2 border-gray-600 shadow-md"
          width={600}
          height={600}
          priority={true}
        />
      </div>

      {/* Title/Artist */}
      <div className="text-lg flex flex-col text-center mb-4">
        <div className="font-medium">
          {currentSong?.title || "Unknown Title"}
        </div>
        <div className="text-sm text-gray-300">
          {currentSong?.artist?.name || "Unknown Artist"}
        </div>
      </div>

      {/* Audio Element (consumes API) */}
      <audio
        ref={audioPlayer}
        src={
          currentSong?._id !== undefined
            ? `http://localhost:3000/api/stream/${currentSong?._id}`
            : undefined
        }
        preload="metadata"
      />

      {/* Control Buttons (skip, play/pause) */}
      <div className="w-full flex gap-5 items-center justify-center">
        {/* Skip Backwards */}
        <IoPlaySkipBackSharp className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />

        {/* Play/Pause */}
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <FaPause className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
          ) : (
            <FaPlay className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
          )}
        </button>

        {/* Skip Forwards */}
        <IoPlaySkipForwardSharp className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
      </div>

      {/* Player Progress */}
      <div className="flex my-5 gap-2 text-sm text-gray-400">
        <span>{calculateTime(currentTime)}</span>
        <div className="flex-grow">
          <input
            type="range"
            className={styles.progressBar}
            defaultValue={0}
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        <span>
          {(duration && !isNaN(duration) && calculateTime(duration)) ||
            calculateTime(currentSong?.duration) ||
            "0:00"}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
