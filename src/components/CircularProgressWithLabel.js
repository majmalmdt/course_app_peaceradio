
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
  baseCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    bottom: 0,
    right: 0,
    transform: 'translate(-50%, -50%)!important',
    color: '#F7F7F7'
  },
  circle: {
    strokeLinecap: 'round',
  },
  percentage: {
    fontSize: '11px'
  }

}));

const colorSelector = (percentage) => {
  if (percentage > 50) return "#2E9B83"
  else if (percentage > 20) return "#9B7B2E"
  else return "#9B3C2E";
}

function CircularProgressWithLabel(props) {

  const classes = useStyles();

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        className={classes.baseCircle}
        variant="determinate"
        // color="secondary"
        thickness={5}
        size={41}
        // color="#F7F7F7"
        value={100} />
      <CircularProgress
        variant="determinate"
        {...props}
        style={{ color: colorSelector(Math.round(props.value)) }}
        classes={{ circle: classes.circle }}
        value={Math.round(props.value)} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography className={classes.percentage} variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel