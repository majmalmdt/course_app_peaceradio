import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { CourseContext } from '../contexts/CourseContext';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  courseText: {
    paddingRight: "85px"
  },
  primary: {
    fontWeight: 700,
    // color: "red"
  },
  secondary: {
    fontSize: '14px'
  }
}))

function Course({course,handleEnroll}) {
  // const { course, setCourse } = useContext(CourseContext);
  const classes = useStyles();
  const history = useNavigate();


  const handleCourseClick = () => {
    //console.log('course.selectedCourse', courseProp)
    // setCourse({ ...course, selectedCourse: courseProp })
    if(course.is_enrolled !== '0')
    history(`/course/${course.id}`);
      }
  return (
    <React.Fragment>
      <ListItem button alignItems="flex-start" className={classes.courseText} onClick={handleCourseClick} key={course.id}>
        <ListItemIcon>
        <img src={course.logo_url} alt="Course Logo" style={{ width: 40, height: 40 }} />       
        </ListItemIcon>
        <div>
        <ListItemText
          classes={{ primary: classes.primary, secondary: classes.secondary }}
          primary={course.course_name}
          secondary={course.course_description}
        />
        {course.scholar &&<Typography fontSize={"10px"} fontWeight={'bold'}> {course.scholar}</Typography>}
        </div>
        <ListItemSecondaryAction>
          {course.is_enrolled !== '0' ? <CircularProgressWithLabel value={course.percentage} /> :
            <Button onClick={()=>handleEnroll(course)}  variant="contained" size="small" style={{ marginBottom: '1.5rem', textTransform: 'none', color: "#00A881" }} color="secondary">Enroll</Button>}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}

export default Course


