import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { CourseContext } from '../contexts/CourseContext';
import Alert from '@material-ui/lab/Alert';
import courseEnroll from "../utils/courseEntroll"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Course from './Course';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { listVariants, listItemXVariants, listItemYVariants } from '../ui/MotionVariants';
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

export default function DashBoard () {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [message,setMessage]=useState("");
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
  const handleEnroll =  async (courseInfo) =>{

    const res = await courseEnroll(courseInfo.id, user.selectedUser.id);
    if (res.status) {
      getCourseList()
      setMessage(`You Enrolled to ${courseInfo.course_name}`)
      setSeverity("success")
    }else{
      setMessage(res.message)
      setSeverity("error")
    }
  }
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
  .filter(course => course?.is_enrolled === '0' && course?.course_end_time )
  .reduce((acc, course) => {
    const courseTypeName = course.course_type_name;
    if (!acc[courseTypeName]) {
      acc[courseTypeName] = [];
    }
    acc[courseTypeName].push(course);
    return acc;
  }, {});
  const completedCourses = courses
  .filter(course => course?.is_enrolled !== '0' && course?.end_date)
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
        <Typography className={classes.texth1} variant="h5">Dashboard</Typography>
      <Container m={2} className={classes.root3}>
      <motion.div initial="hidden" animate="visible" variants={listItemYVariants}>
          <Typography className={classes.texth5} variant="h5">Exclusive Courses</Typography>
      </motion.div>
      <Typography variant="caption">പീസ് റേഡിയോയിൽ പ്രക്ഷേപണം ചെയ്യുകയും കോഴ്സ് ആയി പൂർത്തീകരിക്കുകയും ചെയ്ത കോഴ്സുകളാണ് exclusive കോഴ്സുകൾ 
              </Typography>
       </Container>
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
                  <Course course={course} handleEnroll={handleEnroll} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </List>
      <Container m={2} className={classes.root3}>
      <motion.div initial="hidden" animate="visible" variants={listItemYVariants}>
          <Typography className={classes.texth5} variant="h5">Completed Courses</Typography>
        </motion.div>
        {/* <Divider /> */}
       </Container>
       <List component="nav" className={classes.root}>
      {Object.keys(completedCourses).map((courseTypeName, idx) => (
        <React.Fragment key={idx}>
          <ButtonBase
            onClick={() => toggleVisibility(courseTypeName + "_comp")}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              textAlign: 'left',
              padding: '8px 16px',
              borderRadius: '4px',
              // Optional: Add a background color or hover effect
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
                transform: visibleGroups[courseTypeName + "_comp"] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                padding: 0,
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </ButtonBase>
          {visibleGroups[courseTypeName + "_comp"] && (
            <motion.div initial="hidden" animate="visible" variants={listVariants}>
              {completedCourses[courseTypeName].map((course, index) => (
                <motion.div variants={listItemVariants} key={course.id}>
                  <Course course={course} handleEnroll={handleEnroll} />
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
