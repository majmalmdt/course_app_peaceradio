import React, { useState, useEffect, useRef, useContext } from 'react';
import {  Box } from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { CourseContext } from '../../contexts/CourseContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  detailText: {
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  detailQuestionText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  tabsAppBar: {
    boxShadow: 'none',
  },
  tabNames: {
    textTransform: 'none',
  }
}));
const YouTubeDialog = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { moduleId } = useParams();
  const playerRef = useRef(null);
  const {course} = useContext(CourseContext);
  const classes = useStyles();
  const [fontSiz, setFontSiz] = useState(14)
  const removeHtml = /(<([^>]+)>)/ig
  const removeSlashNR = /(\r\n|\r|\n)+/g
  const module = course.modules.filter(item => item.module_id == moduleId)[0]


  const thumbnailUrl = `https://img.youtube.com/vi/${module.reference.class_video_link}/hqdefault.jpg`;

  useEffect(() => {
    setIsPlaying(false);
  }, [module.reference]);

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
    <div>
    <Box sx={{ width: '100%', marginTop: '4rem' }}>
      {!isPlaying ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            cursor: 'pointer',
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
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
          url={`https://www.youtube.com/watch?v=${module.reference.class_video_link}`}
          controls={true}
          playing={true}
          width="100%"
          // height="90vh" // Increased height
          style={{ borderRadius: '8px', overflow: 'hidden', paddingTop: '20px' }}
          onClick={handleFullscreen}
        />
      )}
    </Box>
    <div style={{ margin: '20px' }}>
    <Typography style={{fontSize:"14px", fontWeight:"bold", marginBottom:"10px"}}>{module?.class_name}</Typography>
        <ButtonGroup variant="outlined" aria-label="outlined button group" style={{ float: 'right' }}>
          <Button onClick={() => setFontSiz(fontSiz + 1)}>+</Button>
          <Button onClick={() => setFontSiz(fontSiz - 1)}>-</Button>
        </ButtonGroup>
        <Typography className={classes.detailText} style={{ fontSize: `${fontSiz}px` }}>{module.reference?.reference_text? module.reference?.reference_text?.replace(removeHtml, '').replace(removeSlashNR, '$1'):"ഈ ക്ലാസിൻ്റെ റഫറൻസ് ഇപ്പോൾ ലഭ്യമല്ല"}</Typography>
      </div>

    </div>
  );
};

export default YouTubeDialog;
