import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardContent, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const PlaylistPage = () => {
    const audioRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resumeTime, setResumeTime] = useState(0); // Stores the resume time

  const playlist = [
    { title: "Audio 1", url: "/path/to/audio1.mp3" },
    { title: "Audio 2", url: "/path/to/audio2.mp3" },
    { title: "Audio 3", url: "/path/to/audio3.mp3" },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setResumeTime(audio.currentTime); // Keep track of current playback time
    };

    const handleEnded = () => {
      if (currentIndex < playlist.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsPlaying(false); // Stop playback when the playlist ends
        console.log("Playlist finished.");
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, playlist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.src = playlist[currentIndex].url;
      audio.currentTime = currentIndex === 0 ? 0 : resumeTime; // Resume from the last time or start fresh
      audio.play().catch(console.error);
    }
  }, [currentIndex, isPlaying, resumeTime, playlist]);

  const playFromBeginning = () => {
    setCurrentIndex(0);
    setResumeTime(0);
    setIsPlaying(true);
  };

  const resumePlayback = () => {
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Audio Playlist
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Now Playing: {playlist[currentIndex]?.title || "None"}</Typography>
          <audio ref={audioRef} controls style={{ display: "none" }} />
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={playFromBeginning}>
              Play from Beginning
            </Button>
            <Button variant="contained" onClick={resumePlayback} disabled={isPlaying}>
              Resume
            </Button>
            <Button variant="contained" color="secondary" onClick={pauseAudio}>
              Pause
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom>
        Playlist
      </Typography>
      <List>
        {playlist.map((audio, index) => (
          <ListItem
            key={index}
            button
            selected={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          >
            <ListItemText primary={audio.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlaylistPage;
