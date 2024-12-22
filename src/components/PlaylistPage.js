import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import coursePlaylistFetch from "../utils/coursePlaylist";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";

const PlaylistPage = () => {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const { courseId } = useParams();
  const [course, setCourse] = useState({ modules: [] });

  useEffect(() => {
    const initializeExam = async () => {
      const res = await coursePlaylistFetch(courseId);
      if (!res.status) return;
      setCourse(res.data);
    };

    initializeExam();
  }, [courseId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setResumeTime(audio.currentTime);

    const handleEnded = () => {
      if (currentIndex < course.modules.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsPlaying(false); // Stop playback when the playlist ends
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, course.modules]);

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (audio && isPlaying) {
  //     const audioUrl = course.modules[currentIndex]?.reference?.class_audio_url;
  //     if (audioUrl) {
  //       audio.src = audioUrl;
  //       audio.currentTime = currentIndex === 0 ? 0 : resumeTime;
  //       audio.play().catch(console.error);
  //     }
  //   }
  // }, [currentIndex, isPlaying, resumeTime]);
    // Handle audio source updates
    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        const audioUrl = course.modules[currentIndex]?.reference?.class_audio_url;
        if (audioUrl) {
          audio.src = audioUrl;
          audio.currentTime = 0; // Reset to the beginning for new audio
        }
      }
    }, [currentIndex, course.modules]);
  
    // Start or resume playback
    useEffect(() => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.play().catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false); // Stop playback if an error occurs
        });
      }
    }, [isPlaying]);

  const playFromBeginning = () => {
    setCurrentIndex(0);
    setResumeTime(0);
    setIsPlaying(true);
  };

  const resumePlayback = () => setIsPlaying(true);

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <Box sx={{ p: 3, marginTop: "3rem" }}>
      <Typography variant="h5" gutterBottom>
        {course.course_name || "Loading..."}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Now Playing: {course.modules[currentIndex]?.class_name || "None"}
          </Typography>
          <audio ref={audioRef} controls style={{ display: "none" }} />
          <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
            variant="contained"
            onClick={playFromBeginning}
            sx={{
            width: 80, // Increased size for text and icon
            height: 80,
            borderRadius: "50%",
            minWidth: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            backgroundColor: "#00A881",
            justifyContent: "center",
            }}
        >
            <PlayLessonIcon sx={{ fontSize: 24 }} />
            <Typography variant="caption" sx={{ mt: 0.5 , color: "white" }}>
            Play
            </Typography>
        </Button>
        <Button
            variant="contained"
            onClick={isPlaying ? pauseAudio : resumePlayback}
            sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            minWidth: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            color: "white",
            backgroundColor: "#00A881",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            {isPlaying ? (
            <>
                <PauseCircleIcon sx={{ fontSize: 24 }} />
                <Typography variant="caption" sx={{ mt: 0.5 , color: "white" }}>
                Pause
                </Typography>
            </>
            ) : (
            <>
                <PlayCircleIcon sx={{ fontSize: 24 }} />
                <Typography variant="caption" sx={{ mt: 0.5 , color: "white" }}>
                Resume
                </Typography>
            </>
            )}
        </Button>
          </Box>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom>
        Classes
      </Typography>
      <List>
        {course.modules.map((audio, index) => (
          <ListItem
            key={index}
            button
            selected={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          >
            <ListItemText primary={audio.class_name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="play">
                <PlayCircleIcon sx={{ fontSize: 30, color: "#00A881" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlaylistPage;
