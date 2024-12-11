import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Divider, List, ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import photo from '../../files/Peaceradio-logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    top: '50%',
    width: '70vw',
    maxHeight: '60vh',  // Set a maximum height, adjust as needed
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    // border: '4px solid #00A881',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '20px',
  },
  avatr: { color: '#00A881', backgroundColor: '#CCEEE6' }
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext)
  const history = useNavigate()
  const changeUser = (ind) => {
    setUser({ ...user, selectedUser: ind })
    history("/");
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateToAddMembers = () => {
    history('/addmembers');
  }

  const navigateToDashboard = () => {
    history('/dashboard');
  }
  const navigateToPlaylist = () => {
    history('/playlist');
  }
  const signOut = () => {
    setUser({ memberList:[], selectedUser: 0 })
    localStorage.removeItem('token');
    history('/login');
  }

  const navigateToEditProfile = (userId) => {
    history(`/profile/edit/${userId}`)
  }


  const body = (
    <div className={classes.paper}>
      <div>
          <ListItem button onClick={() => {navigateToDashboard(); handleClose()}}>
            <ListItemIcon>
              <Avatar className={classes.avatr}>
                <DashboardIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
        </div>
        <div>
          <ListItem button onClick={() => {navigateToPlaylist(); handleClose()}}>
            <ListItemIcon>
              <Avatar className={classes.avatr}>
                <PlaylistPlayIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Playlist" />
          </ListItem>
          <Divider />
        </div>
      <List component="nav" aria-label="main mailbox folders">

        {/* <div style={{ borderRadius: '20px', backgroundColor: "#E0FFFF" }}> */}
        {
          user?.memberList?.map((member, i) =>
            <div key={i}><ListItem button onClick={() => { changeUser(member); handleClose() }} style={{backgroundColor: member.id === user.selectedUser.id && "#CCEEE6"}}>
              <ListItemIcon>
                <Avatar className={classes.avatr}><PersonIcon /></Avatar>
              </ListItemIcon>
              <ListItemText primary={member.name} />
            </ListItem>
              <Divider /></div>
          )
        }
        
        <div>
          <ListItem button onClick={() => {navigateToAddMembers(); handleClose()}}>
            <ListItemIcon>
              <Avatar className={classes.avatr}>
                <AddIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Add family member" />
          </ListItem>
          <Divider />
        </div>
        <div>
          <ListItem button onClick={() => {
            navigateToEditProfile(user.selectedUser.id)
            handleClose()
          }} >
            <ListItemIcon>
              <Avatar className={classes.avatr}>
                <EditIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={`Edit ${user.selectedUser.name} Profile`} />
          </ListItem>
          <Divider />
        </div>
        <div>
          <ListItem button onClick={signOut} >
            <ListItemIcon>
              <Avatar className={classes.avatr}>
                <ExitToAppIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={`Sign out ${user.selectedUser.name}`} />
          </ListItem>
          {/* <Divider /> */}
        </div>
        {/* </div> */}
      </List>
    </div>
  );
  // console.log(photo)
  return (
    <div>
      {/* <button type="button" onClick={handleOpen}> */}
      <Avatar onClick={handleOpen} title={user.selectedUser.name} style={{ color: '#00A881', backgroundColor: '#CCEEE6' }}>
        {photo === true ? <img src={photo} width={40} height={40} alt='firdous' /> : user.selectedUser.name.charAt(0).toUpperCase()}
      </Avatar>
      {/* </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
