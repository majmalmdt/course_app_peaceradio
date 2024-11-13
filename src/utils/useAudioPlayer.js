// https://codesandbox.io/s/5wwj02qy7k?file=/src/Bar.js

import { useState, useEffect } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [clickedTime, setClickedTime] = useState();
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    console.log("Executing useEffect in useAudioPlayer")
    const audio = document.getElementById("audio");

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    const setSeekingStatus = (ev) => {
      ev.target.seeking ? setSeeking(true) : setSeeking(false) //[playing, clickedTime, curTime, playbackRate]
    }

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    audio.addEventListener("seeking", setSeekingStatus);
    audio.addEventListener("seeked", setSeekingStatus);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    if (playbackRate !== audio.playbackRate) {
      audio.playbackRate = playbackRate;
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("seeking", setSeekingStatus);
      audio.removeEventListener("seeked", setSeekingStatus);
    };
  }, [playing, clickedTime, curTime, playbackRate]);

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setPlaybackRate,
    seeking,
  };
}

export default useAudioPlayer;
