import React, { useContext,  useEffect,  useState } from 'react'
// import { UserContext } from '../../contexts/UserContext';
import { CourseContext } from '../../contexts/CourseContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School';
// import ClassPlayer from './ClassPlayer';
import ClassReferenceQuestionTab from './ModuleTabQuestionClassReference';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import StopIcon from '@material-ui/icons/Stop';
import Fade from '@material-ui/core/Fade';
import { PlayerContext } from '../../contexts/PlayerContext';
// import ListSkeleton from '../../ui/ListSkeleton';
import Menu from '../firdous/Menu'
import VideocamIcon from '@material-ui/icons/Videocam';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import samplePDF from '../../files/girls.pdf'
import moduleTabFetch  from '../../utils/moduletab';
import { UserContext } from '../../contexts/UserContext';
import CardMedia from '@mui/material/CardMedia';
import {  Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import getCertificate from '../../utils/certificate';
import Popup from '../firdous/Popup';
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: "10px 10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    // flexBasis: '100%',
    fontWeight: 700,
    // flexShrink: 0,
    color: theme.palette.primary.dark,
    alignSelf: 'center',
  },
  subHead: {
    fontSize: theme.typography.pxToRem(13),
    marginLeft: '20px',
    fontWeight: 700,
    // flexShrink: 0,
    color: theme.palette.primary.dark,
    alignSelf: 'center'
  },
  detailText: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  avatarPlay: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    // alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short
    })
  },
  expandIcon: {
    color: theme.palette.primary.main,
  },
  openTransition: {
    transform: "rotate(0)",
  },
  closeTransition: {
    transform: "rotate(-180deg)",
  },
  player: {
    position: 'fixed',
    bottom: theme.spacing(2),
    margin: theme.spacing(1),
    right: theme.spacing(3),
  },
}))



const getAccordionVarient = (examStatus,start_time) => {
  const currentDate = new Date();
  const startTime = new Date(start_time);
  if(!(currentDate >= startTime) || !start_time){
    return "#fff"
  }
  if(examStatus==="correctTime"){
    return "#CCEEE6"
  }
  if(examStatus==="notAnswered"){
    return "#fbe9e5"
  }
  return "#faf8dc"
}

const Accordion = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    // boxShadow: 'none',
    // '&:not(:last-child)': {
    //     borderBottom: 0,
    // },
    // '&:before': {
    //     display: 'none',
    // },
    // '&$expanded': {
    //     margin: 'auto',
    // },
  },
  expanded: {
    '&$expanded': {
      margin: '12px 0',
      borderRadius: '5px',
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: 'red',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    // position: 'sticky',
    // top: '56px',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    fontWeight: 700,
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
  },
}))(MuiAccordionDetails);

const ModuleTabAccordion = () => {
  const [vidOpen, setVidOpen] = useState(false);
  const [videoId, setVideoId] = useState(''); // Replace with your default videoId if needed

  const handleVidOpen = (id) => {
   navigate(`/course/video/${id}`);
  };
  const classes = useStyles();
  const [expanded, setExpanded] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [module,setModule] = useState({});
  const { user } = useContext(UserContext);
  const [videoPlay,setVideoPlay]= useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [moduleId,setModuleId]=useState(0)
  const {course} = useContext(CourseContext);
  const [certificate,setCertificate]=useState("")
  const [message,setMessage]=useState("")
  const navigateToExamPage = () => {
    navigate(`/course/examPage/${moduleId}`);
} 
  const handleClickOpen = (id,examType) => {
    setMessage(examType+" എക്സാം ആരംഭിക്കാൻ പോവുകയാണ്. 2 മണിക്കൂർ ആണ് പരീക്ഷ. പരീക്ഷ തുടങ്ങാൻ start ക്ലിക്ക് ചെയ്യുക")
    setModuleId(id)
    setOpen(true);
  };
  const handleVidClose = () => setVidOpen(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (panel, index) => async(event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const loadModule = async (index) => {
    const data= await moduleTabFetch(index,user?.selectedUser?.id);
    setModule(data.data);
  }

  const { player, setPlayer } = useContext(PlayerContext);


  const isDisabled=(start_time)=>{
    const currentDate = new Date();
    const startTime = new Date(start_time);
    return !(currentDate >= startTime) || !start_time
  }
  // const { course } = useContext(CourseContext);
  // const { user, setUser } = useContext(UserContext);

  // const removeHtml = /(<([^>]+)>)/ig
  // const removeSlashNR = /(?:\r\n|\r|\n)/g

  const handlePlay = (i, c, e) => {
    // e.preventDefault();
    e.stopPropagation();
    setPlayer({
      ...player,
      showPlayer: true,
      playing: true,
      loadedClass: c,
      src:c.reference.class_audio_url
    });
    // setPlaying(true);
  }

  const videoHandleOpen = (e,link) => {
    e.stopPropagation();
    window.open(link, '_blank');
  };

  const videoHandleClose = () => {
    setVideoPlay(false);
  };
  useEffect(()=>{

    const certificateData=async()=>{
      const res=await getCertificate()
      setCertificate( res)
    }
    certificateData()
    console.log(certificate)
  },[])

      return (
      <div className={classes.root}>
        {course?.modules && course?.modules?.map(
          (cl, index) => {
            if(cl.module_type==="Class"){
              return(
                <Accordion 
                disabled={isDisabled(cl.start_time)}
                style={{backgroundColor:getAccordionVarient(cl.examstatus,cl.start_time)}}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)} 
                key={index} elevation={2} 
                onClick={()=>loadModule(cl?.module_id)}
                >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                aria-controls={`panel${index + 1}d-content`} 
                id={`panel${index + 1}d-header`}>
                <Avatar className={classes.avatar}>
                  <SchoolIcon />
                </Avatar>
                {/* <div> */}
                <div>
                <Typography className={classes.heading}>Class {cl?.module_no}</Typography>
                <Typography style={{fontSize:"14px"}}>{cl?.class_name}</Typography>
                </div>
                {/* <Fade in={expanded === `panel${(index + 1)}`} timeout={500}>
                  <Typography className={classes.subHead}>Class short details</Typography>
                </Fade>
                </div> */}
                <Fade
                  in={expanded === `panel${(index + 1)}`}
                  timeout={500}
                >
                  <div style={{paddingLeft:'3rem'}}>
      <Avatar className={classes.avatarPlay}>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>handleVidOpen(cl?.module_id)}
        >
          <VideocamIcon />
        </Button>
      </Avatar>

      
    </div>

                </Fade>
                <Fade
                  in={expanded === `panel${(index + 1)}`}
                  timeout={500}
                >
                  <Avatar onClick={(e) => handlePlay(index, cl, e)} className={classes.avatarPlay}>
                    <PlayArrowIcon />
                  </Avatar>

                </Fade>
              </AccordionSummary>
              {/* </div> */}
              <AccordionDetails>
                {/* <Typography className={classes.detailText}>{cl.referenceText.replace(removeHtml, '').replace(/(\r\n|\r|\n)+/g, '$1') }</Typography> */}
                <ClassReferenceQuestionTab module={module} moduleId={cl.module_id} reference={cl.reference} isLoading={isLoading} course={course} moduleDetails={cl}/>
                {videoPlay && 
                <CardMedia
                  component="iframe"
                  sx={{ width: 250 }}
                  src={cl.reference?.class_video_link}
                  alt="Live from space album cover"
                />}
              </AccordionDetails>
            </Accordion>)}
            if(cl.module_type==="Model"){
              // setMessage("Model എക്സാം ആരംഭിക്കാൻ പോവുകയാണ്. 2 മണിക്കൂർ ആണ് പരീക്ഷ. പരീക്ഷ തുടങ്ങാൻ start ക്ലിക്ക് ചെയ്യുക")
              // setOpen(true)
              return  <Menu classes={classes} label="Model Exam" fn={handleChange} abc={expanded} idd={"a"+index} handleClickOpen={()=>handleClickOpen(cl.module_id,'Model')} />

            }
            if(cl.module_type==="Final"){
              return <Menu classes={classes} label="Final Exam" fn={handleChange} abc={expanded} idd={"a"+index} handleClickOpen={()=>handleClickOpen(cl.module_id,'Final')} />
            }
            if(cl.module_type==="Review" || cl.module_type==="Parent Review"){
              return <Menu classes={classes} label="Review" fn={handleChange} abc={expanded} idd={"a"+index} course={course} moduleDetails={cl}/>
            }
            if(cl.module_type==="Feedback"){
              return <Menu classes={classes} data={course} label="Feedback" fn={handleChange} abc={expanded} idd={"a"+index} />
            }
            if(cl.module_type==="certificate"){
              return  <Menu classes={classes} label="Certificate" fn={handleChange} abc={expanded} idd={"a"+index} data={course} />

            }
            
          }

              )
          }
          {/* {
            course?.course_work?.length > 0 && (
              <Menu classes={classes} label="Course Work" fn={handleChange} abc={expanded} idd="a1" data={course} />
            )
          }
          {
            course?.assignment?.length > 0 && (
              <Menu classes={classes} label="Assignment" fn={handleChange} abc={expanded} idd="a6" data={course} />
            )
          }
          {
            course?.review?.length > 0 && (
              <Menu classes={classes} label="Review" fn={handleChange} abc={expanded} idd="a2" />
            )
          }
          { 
            (
              <Menu classes={classes} label="Model Exam" fn={handleChange} abc={expanded} idd="a7" handleClickOpen={handleClickOpen} />
            )
          }
          { 
             (
              <Menu classes={classes} data={course} label="Feedback" fn={handleChange} abc={expanded} idd="a3" />
            )
          }*/
          }
          {
            course?.assignment?.length > 0 && (
              <Menu classes={classes} label="Assignment" fn={handleChange} abc={expanded} idd="a97" data={course} />
            )
          }
          {
                course?.course_work?.length>0 && <Menu classes={classes} label="Course Work" fn={handleChange} abc={expanded} idd="a98" data={course} />
          }
          {
             <Menu classes={classes} label="Result" fn={handleChange} abc={expanded} idd="a99" data={course} />
            
          } 
           { 
             (
              <Menu classes={classes} data={course} label="Feedback" fn={handleChange} abc={expanded} idd="a100" />
            )
          }
          {
             (
              <Menu classes={classes} label="Certificate" fn={handleChange} abc={expanded} idd="a101" data={course} />
            )
          }
          {/* <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                handleClose();
             },
        }}
      >
        <DialogTitle>Model Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
          മോഡൽ എക്സാം ആരംഭിക്കാൻ പോവുകയാണ്. 2 മണിക്കൂർ ആണ് പരീക്ഷ. പരീക്ഷ തുടങ്ങാൻ start ക്ലിക്ക് ചെയ്യുക 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={navigateToExamPage} type="submit">Start</Button>
        </DialogActions>
      </Dialog> */}
      <Popup open={open} message={message} setOpen={setOpen} onSuccessHandler={navigateToExamPage}/>
      </div>
    )
}

export default ModuleTabAccordion
