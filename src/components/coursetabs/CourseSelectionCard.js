import React, { useContext } from "react"
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { UserContext } from '../../contexts/UserContext';
import { CourseContext } from '../../contexts/CourseContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: "12px 10px",
    backgroundColor: 'white'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  typeName: {
    fontSize: 14,
    color: theme.palette.primary.light,
    fontWeight: 700,
  },
  cardContent: {
    padding: '4px 20px',
    "&:last-child": {
      paddingBottom: '5px'
    }
  },
  pos: {
    marginBottom: 12,
  },
  primary: {
    fontWeight: 700,
    // color: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
  secondary: {
    fontSize: '10px',
    // color: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
  listItem: {
    padding: '4px 0',
  },
  list: {
    padding: '7px 0'
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  listItemAvatar: {
    minWidth: '58px',
  }
}));

function CourseSelectionCard() {
  const { course } = useContext(CourseContext);
  const { user, setUser } = useContext(UserContext);
  const history = useNavigate();
  const classes = useStyles();

  const handleClickUser = () => {
    setUser({ ...user, selectedUser: 0 })
    history('/')
  }

  const handleClickCourse = () => {
    history('/membercourselist')
  }

  return (
    <Card elevation={2} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <List className={classes.list}>
          <ListItem className={classes.listItem} onClick={handleClickCourse}>
            <ListItemAvatar className={classes.listItemAvatar}>
              <Avatar className={classes.avatar}>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary }} primary={course.selectedCourse.type_name} secondary="Change course" />
          </ListItem>
          <ListItem className={classes.listItem} onClick={handleClickUser}>
            <ListItemAvatar className={classes.listItemAvatar}>
              <Avatar className={classes.avatar}>
                <PeopleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary }} primary={user.memberList[user.selectedUser].name} secondary="Change user" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default CourseSelectionCard
