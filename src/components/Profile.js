import { useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { UserContext } from '../contexts/UserContext';
import FamilyMembers from './FamilyMembers';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { motion } from 'framer-motion';
// import { listVariants, listItemXVariants, listItemYVariants } from '../ui/MotionVariants';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 5, 0),
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inline: {
    display: 'inline',
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "8vw",
    marginBottom: "16px",
    maxWidth: "500px",
    color: theme.palette.primary.dark
  },
  textp: {
    fontSize: "12px",
    color: theme.palette.primary.dark
  },
  buttonStyle: {
    margin: theme.spacing(1, 2),
    textTransform: "none",
    fontSize: "14px",
    color: theme.palette.primary.dark
  },
  root2: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: theme.palette.background.paper,
  },
  root3: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0.5, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "left",
  },
  texth5: {
    textAlign: "left",
    fontSize: "20px",
    paddingTop: "10px",
    paddingLeft: "16px",
    paddingBottom: "0px",
    maxWidth: "500px",
    color: theme.palette.primary.main
  },

}));

function Profile({ handleChangeTab }) {
  const { user, setUser } = useContext(UserContext);
  const history = useNavigate();

  const handleMyCoursesButton = () => {
    setUser({ ...user, selectedUser: 0 })
    history("/membercourselist");
    // handleChangeTab(1)
  }

  const classes = useStyles();
  return (
    user.success === "Y" ? (
      <Container maxWidth={false} className={classes.root2}>
        <Container maxWidth={false} m={2} className={classes.root}>
          <Typography className={classes.text} variant="h4">{user.memberList[0].name}</Typography>
          {/* <Typography className={classes.textp} variant="body1">muhammadanas@gmail.com</Typography> */}
          <Typography className={classes.textp} variant="body1">Mobile: {user.memberList[0].mobile}</Typography>
          <Typography className={classes.textp} variant="body1">Country: {user.memberList[0].country}</Typography>
          <Typography className={classes.textp} variant="body1">Age: {user.memberList[0].age}</Typography>
          <Typography className={classes.textp} variant="body1">Roll Number: {user.memberList[0].rollNumber}</Typography>
          <Button className={classes.buttonStyle} variant="contained" color="secondary" disableElevation onClick={handleMyCoursesButton}>View my Courses</Button>
        </Container>

        {/* <Divider variant="middle" /> */}
        <FamilyMembers members={user} handleChangeTab={handleChangeTab} />

      </Container>) : (
      <Container maxWidth={false} className={classes.root2}>
        <Container maxWidth={false} m={2} className={classes.root}>
          <Typography className={classes.textp} variant="h1">User not logged in</Typography>
          <CircularProgress />
        </Container>
      </Container>)
  )
}

export default Profile
