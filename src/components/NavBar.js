import React, { useContext, useEffect } from "react";
import { AppBar, Typography, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserContext } from "../contexts/UserContext";
import Modal from "./firdous/modal";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar: {
    zIndex: 2000,
  },
}));

// Function to handle Android back button
const handleAndroidBack = () => {
  if (window.Android) {
    window.Android.promptForCourseExit();
  }
};

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useNavigate();

  // Setup Android bridge functions
  useEffect(() => {
    // Global function to show Android alert
    window.showAndroidAlert = (msg) => {
      if (window.Android) {
        window.Android.showAlert(msg);
      }
    };

    // Global function for back button press
    window.fnPressedBackButton = () => {
      const currentPage = document.getElementById("currentPage")?.value || "0";
      console.log("Current page:", currentPage);
      if (currentPage === "0") {
        handleAndroidBack();
      } else if (currentPage === "1") {
        window.getData_progress = "N";
        if (typeof window.fnBacktoCourseSelectorPage === 'function') {
          window.fnBacktoCourseSelectorPage();
        }
      } else {
        if (typeof window.fnBacktoHomepageFromAnwserPage === 'function') {
          window.fnBacktoHomepageFromAnwserPage();
        }
      }
    };

    // Create hidden input for currentPage if it doesn't exist
    if (!document.getElementById("currentPage")) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.id = "currentPage";
      input.value = "0"; // Set default value
      document.body.appendChild(input);
    }

    // Cleanup
    return () => {
      delete window.showAndroidAlert;
      delete window.fnPressedBackButton;
    };
  }, []);

  return (
    <>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          {pathname !== "/" && pathname !== "/login" ? (
            <>
              <IconButton
                edge="start"
                className=""
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  history(-1);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography color="inherit">Course</Typography>
            </>
          ) : (
            <>
              <IconButton
                edge="start"
                className=""
                color="inherit"
                aria-label="open drawer"
                onClick={window.fnPressedBackButton}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography color="inherit">Home</Typography>
            </>
          )}
          {pathname === "/home" ? (
            <>
              <IconButton
                edge="start"
                className=""
                color="inherit"
                aria-label="open drawer"
                onClick={() => history("/membercourselist")}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography color="inherit">Dashboard</Typography>
            </>
          ) : (
            ""
          )}
          <div className={classes.grow} />
          
          <Box sx={{ mx: 1, fontSize: 20 }}>
            {user.selectedUser?.name ? `${user.selectedUser?.name.toUpperCase()}`:''} 
            {user.selectedUser?.roll_number? `(${user.selectedUser?.roll_number})`:''}
          </Box>
          {user?.selectedUser ? <Modal />:<></>}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;