import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import { motion } from "framer-motion"
import { listVariants, listItemXVariants, listItemYVariants } from '../ui/MotionVariants';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
  },
  primary: {
    fontWeight: 700,
  },
  secondary: {
    fontSize: '14px'
  },
  texth5: {
    textAlign: "left",
    fontSize: "20px",
    paddingTop: "25px",
    paddingLeft: "0px",
    paddingBottom: "0px",
    maxWidth: "500px",
    color: theme.palette.primary.main
  },
}));

function FamilyMembers({ members, handleChangeTab }) {
  const { user, setUser } = useContext(UserContext);
  const history = useNavigate();

  const classes = useStyles();

  const handleUserChange = (e) => {
    setUser({ ...user, selectedUser: e });
    history("/membercourselist");
  }

  return (
    <Container maxWidth={false} m={2} className={classes.root}>
      <Container maxWidth={false} m={2}>
        <motion.div initial="hidden" animate="visible" variants={listItemYVariants}>
          <Typography className={classes.texth5} variant="h5">Family Members</Typography>
        </motion.div>
      </Container>
      <List component="nav" className={classes.root}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {members?.filter((member, index) => index > 0).map((member, index) =>
            <motion.div variants={listItemXVariants} key={index}>
              <ListItem button id={index} key={index}
                onClick={(e) => handleUserChange(index + 1)}
                alignItems="flex-start" component="a">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary, secondary: classes.secondary }}
                  primary={member.name}
                  secondary={`${member.age} year(s)`} />
              </ListItem>
              <Divider variant="middle" component="li" />
            </motion.div>
          )}
        </motion.div>
      </List>
    </Container>

  )
}

export default FamilyMembers
