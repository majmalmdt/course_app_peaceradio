import React from 'react'
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
  },

}));

const TabPanel = (props) => {
  const classes = useStyles();

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.root}
      {...other}
    >
      {value === index && (children
        // <Box p={0} className={classes.root}>
        //     <Typography className={classes.root}>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}

export default TabPanel




