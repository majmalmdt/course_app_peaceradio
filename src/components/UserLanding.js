import React from 'react';
import Profile from './Profile';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    zIndex: 1500,
    boxShadow: "none",
    // marginTop: "14vw",
  },
  tab: {
    position: "relative",
    zIndex: 1500,
    boxShadow: '0 2px 5px 2px rgba(0, 0, 0, .2)',
  },
  removeShadow: {
    boxShadow: "none"
  },
  tabPanel: {
    backgroundColor: "white"
  }

}));


function UserLanding() {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Paper className={classes.root}>
      <AppBar position="static" className={classes.removeShadow}>
        <Toolbar></Toolbar>
      </AppBar>
      <Profile />
    </Paper>
  )
}

export default UserLanding
