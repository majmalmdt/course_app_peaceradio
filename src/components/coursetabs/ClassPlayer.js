import React, { useContext, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Forward10Icon from '@material-ui/icons/Forward10';
import Replay10Icon from '@material-ui/icons/Replay10';
import Replay30Icon from '@material-ui/icons/Replay30';
import ShareIcon from '@material-ui/icons/Share';
import { PlayerContext } from '../../contexts/PlayerContext';
import CloseIcon from '@material-ui/icons/Close';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import SpeedIcon from '@material-ui/icons/Speed';
import Badge from '@material-ui/core/Badge';
import Slider from '@material-ui/core/Slider';
import useAudioPlayer from '../../utils/useAudioPlayer';
import moment from 'moment';
import "moment-duration-format";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    position: 'fixed',
    bottom: '1vh',
    width: '94vw',
    left: '3vw',
    margin: '0 auto',
    boxShadow: '0 2.8px 12.2px rgba(0, 0, 0, 0.52), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    paddingBottom: '5px',
    // backgroundColor: '#f5f5f5',
  },
  classDetail: {

  },
  classDesc: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#fff',
    alignSelf: 'center',
  },
  content: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    padding: '16px 16px 14px 16px',
    // flex: '1 0 auto',
  },
  closeButton: {
    color: '#fff',
    marginLeft: "auto",
    padding: 0,
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    padding: '0 10px',
  },
  seekBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    padding: '5px 15px 5px',
  },
  seekBarText: {
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 800,
    padding: '0 0.7rem',
  },
  controlIcon: {
    color: theme.palette.primary.dark,
    height: 38,
    width: 38,
  },
  controlIconWhite: {
    color: '#fff',
  },
  badge: {
    color: '#fff',
    fontSize: '0.65rem',
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  sliderRoot: {
    margin: '0 0.2rem',
    padding: '15px 0',
    color: theme.palette.primary.dark,
  },
  displayNone: {
    display: 'none'
  }
}));

const playbackRateArray = [1, 1.25, 1.5]

// console.log("t1")
function ClassPlayer() {
  const [pbrIndex, setPbrIndex] = useState(0)

  const audioElement = useRef(null);

  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setPlaybackRate,
    seeking,
  } = useAudioPlayer();

  const { player, setPlayer } = useContext(PlayerContext);

  const handlePauseRequest = () => {
    setPlayer({ ...player, playing: !player.playing });
    setPlaying(!playing);
  }

  const handleSeekInput = (ev, nv) => {
    setClickedTime(duration * nv / 100);
    // setPlayer({ ...player, seek: nv })
  }

  const handleJumpRequest = jumpDuration => {
    setClickedTime(curTime + jumpDuration);
  }

  const handleChangePlaybackRate = () => {
    if ((pbrIndex + 1) === playbackRateArray.length) {
      setPlaybackRate(playbackRateArray[0])
      setPbrIndex(0)
    } else {
      setPlaybackRate(playbackRateArray[pbrIndex + 1])
      setPbrIndex(pbrIndex + 1)
    }
  }

  const handleCloseRequest = () => {
    setPlaying(false);
    setPlayer({ ...player, showPlayer: false });
  }

  const formatDuration = duration => moment.duration(duration, "seconds").format("mm:ss", { trim: false });

  const classes = useStyles();
  // const theme = useTheme(); 


  useEffect(() => {
    if (player.src !== '') {
      audioElement.current.src = player.src;
      audioElement.current.load();
      console.log("loaded src", player.src);
      player.playing && setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.src])
  // console.log("t2")
  return (
    <Fade
      in={player.showPlayer}
    >
      <Card className={classes.root} elevation={6}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" className={classes.classDesc}>
              {seeking ? "Buffering" : player.loadedClass.className}
            </Typography>
            <IconButton aria-label="previous" className={classes.closeButton} >
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="previous" onClick={handleCloseRequest} className={classes.closeButton} >
              <CloseIcon />
            </IconButton>
          </CardContent>
          <div className={classes.seekBar}>
            <Typography className={classes.seekBarText}>{formatDuration(curTime)}</Typography>
            <Slider value={curTime / duration * 100} onChange={handleSeekInput} aria-labelledby="continuous-slider" classes={{ root: classes.sliderRoot }} />
            <Typography className={classes.seekBarText}>{formatDuration(duration)}</Typography>
          </div>
          <div className={classes.controls}>
            <IconButton aria-label="previous" onClick={() => handleJumpRequest(-30)} >
              <Replay30Icon className={classes.controlIconWhite} />
            </IconButton>
            <IconButton aria-label="next" onClick={() => handleJumpRequest(-10)} >
              <Replay10Icon className={classes.controlIconWhite} />
            </IconButton>
            <IconButton aria-label="play/pause" onClick={handlePauseRequest}>
              <Avatar className={classes.avatar}>
                {playing ?
                  <Zoom in={playing}><PauseIcon className={classes.controlIcon} /></Zoom> :
                  <Zoom in={!playing}><PlayArrowIcon className={classes.controlIcon} /></Zoom>
                }
              </Avatar>
            </IconButton>
            <IconButton aria-label="previous" onClick={() => handleJumpRequest(10)} >
              <Forward10Icon className={classes.controlIconWhite} />
            </IconButton>
            <IconButton aria-label="next" onClick={handleChangePlaybackRate}>
              <Badge badgeContent={playbackRateArray[pbrIndex]} classes={{ badge: classes.badge }} >
                <SpeedIcon className={classes.controlIconWhite} />
              </Badge>
            </IconButton>
          </div>
        </div>
        <CardMedia
          ref={audioElement}
          className={classes.displayNone}
          component="audio"
          id="audio"
          title=""
        />
      </Card>
    </Fade>
  )
}

export default ClassPlayer
