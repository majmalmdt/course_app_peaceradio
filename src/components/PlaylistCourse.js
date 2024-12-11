import React from "react";
import { useNavigate } from "react-router-dom";
import CircularProgressWithLabel from './CircularProgressWithLabel';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  courseText: {
    paddingRight: "85px",
  },
  primary: {
    fontWeight: 700,
  },
  secondary: {
    fontSize: '14px',
  },
  progressWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '-5px',
  },
  svgIcon: {
    width: '50px',
    height: '50px',
  },
}));

function PlaylistCourse({ course, handleEnroll }) {
  const classes = useStyles();
  const history = useNavigate();

  
  const handleCourseClick = () => {
   
      history(`/playlist/${course.id}`);
    
  };

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
          {course.scholar && (
            <Typography fontSize={"10px"} fontWeight={'bold'}>
              {course.scholar}
            </Typography>
          )}
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

export default PlaylistCourse;
