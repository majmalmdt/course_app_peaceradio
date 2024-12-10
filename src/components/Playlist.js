import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PlaylistCourse from './PlaylistCourse';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { listVariants } from '../ui/MotionVariants';
import courseTabFetch from "../utils/courseTab";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React from 'react';
import { IconButton  } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
  },
  mainRoot: {
    width: '100%',
    zIndex: 0,
    marginTop: '60px', // Ensure this matches the height of your Navbar
    // paddingTop: "25px"
  },
  inline: {
    display: 'inline',
  },
  texth5: {
    textAlign: "left",
    fontSize: "20px",
    paddingTop: "20px",
    paddingLeft: "0px",
    paddingBottom: "0px",
    maxWidth: "600px",
    color: theme.palette.primary.main
  },
  texth1: {
    textAlign: "center",
    paddingTop: "20px",
    paddingLeft: "0px",
    paddingBottom: "0px",
    color: theme.palette.primary.main
  },
}));

export default function Playlist () {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [message,setMessage]=useState("");
  const [isSuccess,setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity]=useState("");
  const [ courses, setCourses ] = useState([]);
  const [visibleGroups, setVisibleGroups] = useState({});

  const getCourseList= async () =>{
    if (user &&user.selectedUser && user.selectedUser.id) {
      const res = await courseTabFetch(user.selectedUser.id);
      setCourses(res.data);
    }
    else{
    }
  }
  useEffect(() => {
      getCourseList()
  }, []);

  useEffect(() => {
    getCourseList()
}, [user]);
  
  const toggleVisibility = (courseTypeName) => {
    setVisibleGroups(prevState => ({
      ...prevState,
      [courseTypeName]: !prevState[courseTypeName]
    }));
  };
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  const unEnrolledCourses = courses
  .reduce((acc, course) => {
    const courseTypeName = course.course_type_name;
    if (!acc[courseTypeName]) {
      acc[courseTypeName] = [];
    }
    acc[courseTypeName].push(course);
    return acc;
  }, {});
  
  return (courses.length > 0 ? 
    <Container m={2} className={classes.mainRoot}>
        {isSuccess?<Alert variant="filled" severity={severity}>
        {message}
      </Alert>:<></>}
        <Typography className={classes.texth1} variant="h5">Playlist</Typography>
    
       <List component="nav" className={classes.root}>
      {Object.keys(unEnrolledCourses).map((courseTypeName, idx) => (
        <React.Fragment key={idx}>
          <ButtonBase
            onClick={() => toggleVisibility(courseTypeName)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              textAlign: 'left',
              padding: '8px 16px',
              borderRadius: '4px',
              // Optional styles
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {courseTypeName}
            </Typography>
            <IconButton
              style={{
                transform: visibleGroups[courseTypeName] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                padding: 0,
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </ButtonBase>
          {visibleGroups[courseTypeName] && (
            <motion.div initial="hidden" animate="visible" variants={listVariants}>
              {unEnrolledCourses[courseTypeName].map((course, index) => (
                <motion.div variants={listItemVariants} key={course.id}>
                  <PlaylistCourse course={course} handleEnroll={()=>{}} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </List>
    </Container> : 
    <Box sx={{ display: 'flex' }}  
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        className={classes.mainRoot}>
      <CircularProgress />
    </Box>

  );
}
