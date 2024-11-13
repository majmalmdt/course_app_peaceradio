import { useState, useRef, useContext, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Paper, AppBar, Toolbar, Tabs, Tab, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import TabPanel from './TabPanel';
import HomeTab from './coursetabs/HomeTab';
import ModuleTab from './coursetabs/ModuleTab';
import HelpTab from './coursetabs/HelpTab';
import { Menu as MenuIcon } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import homeTabFetch from '../utils/hometab';
import homePage from '../utils/homePage';
import { CourseContext } from '../contexts/CourseContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    zIndex: 1500,
    boxShadow: "none",
    height: "100vh",
    overflow: "auto",
  },
  tab: {
    backgroundColor: theme.palette.primary.dark,
    position: "relative",
    zIndex: 1500,
    boxShadow: "0 2px 5px 2px rgba(0, 0, 0, .2)",
  },
  removeShadow: {
    boxShadow: "none",
  },
  tabPanel: {
    // Optional: Add styles if necessary
  },
}));

const HomeTabs = () => {
  const { course, setCourse } = useContext(CourseContext);
  const { courseId, tabId } = useParams();
  const [value, setValue] = useState(tabId ? parseInt(tabId) : 0);
  const classes = useStyles();
  const myRef = useRef();
  const theme = useTheme();

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function getHomeTabData() {
    try {
      const userDetails = await homePage();
      const selectedUser = userDetails.data.members[0].id;
      if (selectedUser) {
        const res = await homeTabFetch(courseId, selectedUser);
        setCourse(res.data);
      }
    } catch (error) {
      console.error('Error fetching home tab data:', error);
    }
  }

  useEffect(() => {
    getHomeTabData();
  }, [courseId]);

  return (
    <Paper className={classes.root}>
      <AppBar ref={myRef} position="static" className={classes.removeShadow}>
        <Toolbar>First</Toolbar>
      </AppBar>

      <Typography align='center' variant='subtitle1'>{course.course_name}</Typography>
      <Tabs
        className={classes.tab}
        value={value}
        onChange={handleChangeTab}
        variant="fullWidth"
        indicatorColor="primary"
        scrollButtons="off"
      >
        <Tab icon={<MenuIcon />} label="Home" />
        <Tab icon={<SchoolIcon />} label="Module" />
        <Tab icon={<MenuBookIcon />} label="Help" />
      </Tabs>
      
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <HomeTab handleChangeTab={handleChangeTab} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ModuleTab handleChangeTab={handleChangeTab} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <HelpTab handleChangeTab={handleChangeTab} />
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
};

export default HomeTabs;
