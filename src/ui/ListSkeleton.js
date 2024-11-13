import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    margin: '10px',
    // height: 75,
  },
  skel: {
    height: '65px',
    marginBottom: '10px',
  }
});

function ListSkeleton() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      <Skeleton variant="rect" animation="wave" className={classes.skel} />
      {/* <Skeleton animation={false} /> */}
      {/* <Skeleton animation="wave" /> */}
    </div>
  )
}

export default ListSkeleton
