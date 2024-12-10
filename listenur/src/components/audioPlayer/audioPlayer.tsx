"use client";
import styles from "./audioPlayer.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = () => {
    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    
    // References
    const audioPlayer:any = useRef();
    const progressBar:any = useRef();
    const animationRef:any = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;

    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
    

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    };

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = secs % 60;
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    const backThirty = () => {
        progressBar.current.value = Number(Number(progressBar.current.value) - 30);
        changeRange();
    };

    const forwardThirty = () => {
        progressBar.current.value = Number(Number(progressBar.current.value) + 30);
        changeRange();
    };

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioPlayer} src="http://localhost:3000/api/stream/4" preload="metadata"></audio>
            <button className={styles.forwardBackward} onClick={backThirty}><BsArrowLeftShort /> 30</button>
            <button onClick={togglePlayPause} className={styles.playPause}>
                { isPlaying ? <FaPause /> : <FaPlay className={styles.play} /> }
            </button>
            <button className={styles.forwardBackward} onClick={forwardThirty}>30 <BsArrowRightShort /></button>

            {/* Current Time */}
            <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

            {/* Progress Bar */}
            <div>
                <input type="range" className={styles.progressBar} defaultValue={0} ref={progressBar} onChange={changeRange} />
            </div>

            {/* Duration */}
            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    );
};

export default AudioPlayer;