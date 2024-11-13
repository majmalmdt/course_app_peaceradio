import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Tab, Container, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CoursesList from './CoursesList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    height: '100vh',
    overflow: 'auto',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  mainRoot: {
    marginTop: '60px', // Ensure this matches the height of your Navbar
  },
}));

export default function MainPage() {
  const [value, setValue] = useState("0");
  const classes = useStyles();
  const theme = useTheme();

  const handleChangeTab = (event, index) => {
    console.log(value)
    setValue(index);
  };

  return (
    <Container m={2} className={classes.mainRoot}>
      {/* <TabContext value={value}>
        <Box className={classes.tabContainer}> */}
          {/* <TabList onChange={handleChangeTab} aria-label="tabs example"> */}
            {/* <Tab label="Courses" value="0" /> */}
            {/* <Tab label="History" value="1" /> */}
          {/* </TabList> */}
        {/* </Box> */}
        {/* <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value}>
          <TabPanel value={value} index={"0"} dir={theme.direction}>
            <CoursesList />
          </TabPanel>
          <TabPanel value={value} index={"1"} dir={theme.direction}>
          </TabPanel>
        </SwipeableViews> */}
      {/* </TabContext> */}
      <CoursesList />
    </Container>
  );
}
