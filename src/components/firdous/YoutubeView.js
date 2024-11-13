import React, { useState, useMemo, useEffect, useRef } from 'react';
import { IconButton, Box } from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import { useNavigate, useParams } from 'react-router-dom';

const YouTubeDialog = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const { videoId } = useParams();
  const playerRef = useRef(null);


  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  useEffect(() => {
    setIsPlaying(false);
  }, [videoId]);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  // Handle fullscreen mode
  const handleFullscreen = () => {
    const playerElement = playerRef.current.getInternalPlayer();
    if (playerElement.requestFullscreen) {
      playerElement.requestFullscreen();
    } else if (playerElement.webkitRequestFullscreen) {
      playerElement.webkitRequestFullscreen();
    } else if (playerElement.mozRequestFullScreen) {
      playerElement.mozRequestFullScreen();
    } else if (playerElement.msRequestFullscreen) {
      playerElement.msRequestFullscreen();
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!isPlaying ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleThumbnailClick}
        >
          <Box
            component="img"
            src={thumbnailUrl}
            alt="YouTube Thumbnail"
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
            }}
          />
        </Box>
      ) : (
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls={true}
          playing={true}
          width="100%"
          height="90vh" // Increased height
          style={{ borderRadius: '8px', overflow: 'hidden', paddingTop: '20px' }}
          onClick={handleFullscreen}
        />
      )}
    </Box>
  );
};

export default YouTubeDialog;
