"use client";

import { useState, createContext, useContext } from "react";

// TypeScript requires a type provided for createContext()

interface AudioContextType<T = any> {
  currentSong: T | null; // Fallback to null
  setCurrentSong: (song: T | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: any }) => {
  const [currentSong, setCurrentSong] = useState<any | null>(null);

  return (
    <AudioContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("Context error.");
  }

  return context;
};
