"use client";
import styles from "./audioPlayer.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";

const AudioPlayer = () => {
    // State
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    
    // // References
    // const audioPlayer:any = useRef();
    // const progressBar:any = useRef();
    // const animationRef:any = useRef();

    // useEffect(() => {
    //     const seconds = Math.floor(audioPlayer.current.duration);
    //     setDuration(seconds);
    //     progressBar.current.max = seconds;

    // }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
    

    // const togglePlayPause = () => {
    //     const prevValue = isPlaying;
    //     setIsPlaying(!prevValue);
        
    //     if (!prevValue) {
    //         audioPlayer.current.play();
    //         animationRef.current = requestAnimationFrame(whilePlaying);
    //     } else {
    //         audioPlayer.current.pause();
    //         cancelAnimationFrame(animationRef.current);
    //     }
    // };

    // const whilePlaying = () => {
    //     progressBar.current.value = audioPlayer.current.currentTime;
    //     changePlayerCurrentTime();
    //     animationRef.current = requestAnimationFrame(whilePlaying);
    // };

    // const changeRange = () => {
    //     audioPlayer.current.currentTime = progressBar.current.value;
    //     changePlayerCurrentTime();
    // };

    // const changePlayerCurrentTime = () => {
    //     progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
    //     setCurrentTime(progressBar.current.value);
    // };

    // const calculateTime = (secs: number) => {
    //     const minutes = Math.floor(secs / 60);
    //     const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    //     const seconds = secs % 60;
    //     const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    //     return `${returnedMinutes}:${returnedSeconds}`;
    // };

    // const backThirty = () => {
    //     progressBar.current.value = Number(Number(progressBar.current.value) - 30);
    //     changeRange();
    // };

    // const forwardThirty = () => {
    //     progressBar.current.value = Number(Number(progressBar.current.value) + 30);
    //     changeRange();
    // };

    return (

        // <div className={styles.audioPlayer}>
        //     <audio ref={audioPlayer} src="http://localhost:3000/api/stream/4" preload="metadata"></audio>
        //     <button className={styles.forwardBackward} onClick={backThirty}><BsArrowLeftShort /> 30</button>
        //     <button onClick={togglePlayPause} className={styles.playPause}>
        //         { isPlaying ? <FaPause /> : <FaPlay className={styles.play} /> }
        //     </button>
        //     <button className={styles.forwardBackward} onClick={forwardThirty}>30 <BsArrowRightShort /></button>

        //     {/* Current Time */}
        //     <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        //     {/* Progress Bar */}
        //     <div>
        //         <input type="range" className={styles.progressBar} defaultValue={0} ref={progressBar} onChange={changeRange} />
        //     </div>

        //     {/* Duration */}
        //     <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        // </div>

        <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4 text-center text-teal-300">Now Playing</h2>
            <div className="m-2.5 rounded-md h-auto flex justify-center items-center">
                <Image
                src="/album-covers/album-cover.jpg"
                alt="Album Cover"
                className="rounded-md border-2 border-gray-600 shadow-md"
                width={400}
                height={400}
                />
            </div>
            <div className="text-center mb-4">
                <p className="text-lg font-medium text-gray-200">Beds are Burning - Midnight Oil</p>
            </div>
            <div className="w-full flex items-center justify-center mb-4">
                {/* <!-- Audio Player Controls --> */}
                <audio className="w-full bg-gray-800 rounded">
                {/* <source src="your-audio-file.mp3" type="audio/mpeg"> */}
                Your browser does not support the audio element.
            </audio>
            </div>
            <div className="w-full flex gap-5 items-center justify-center">
                {/* Skip Backwards */}
                <IoPlaySkipBackSharp className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />

                {/* Play/Pause */}
                <FaPlay className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
                <FaPause className="hidden"/>

                {/* Skip Forwards */}
                <IoPlaySkipForwardSharp className="h-8 w-8 hover:text-teal-600 cursor-pointer transition-colors" />
            </div>

            {/* <!-- Player Progress --> */}
            <div className="flex justify-between text-sm text-gray-400">
                <span>0:00</span>
                <span>3:45</span>
            </div>
        </div>
    );
};

export default AudioPlayer;