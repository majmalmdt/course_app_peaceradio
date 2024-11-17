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

function Course({ course, handleEnroll }) {
  const classes = useStyles();
  const history = useNavigate();

  const handleCourseClick = () => {
    if (course.is_enrolled !== '0') {
      history(`/course/${course.id}`);
    }
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
        <ListItemSecondaryAction>
          {course.is_enrolled !== '0' ? (
          
            <div className={classes.progressWrapper}>
              {(!course?.course_end_time || (new Date(course?.course_end_time)>new Date(new Date()))) &&
              <div className={classes.svgIcon}>
                <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="15" fill="#00A881">
                    <animate attributeName="r" from="15" to="25" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="15" fill="#00A881" />
                  <circle cx="50" cy="50" r="5" fill="#CCEEE6" />
                </svg>
              </div>}
              <CircularProgressWithLabel value={course.percentage} />
            </div>
          ) : (
            <Button
              onClick={() => handleEnroll(course)}
              variant="contained"
              size="small"
              style={{ marginBottom: '1.5rem', textTransform: 'none', color: "#00A881" }}
              color="secondary"
            >
              Enroll
            </Button>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

export default Course;
