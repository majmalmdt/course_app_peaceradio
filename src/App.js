import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import NavBar from './components/NavBar';
import ClassPlayer from './components/coursetabs/ClassPlayer'
import { UserContext } from './contexts/UserContext'
import { CourseContext } from './contexts/CourseContext'
import { PlayerContext } from './contexts/PlayerContext'
import {ToasterContext} from "./contexts/ToasterContext"
import theme from './ui/Theme';
import ScrollToTop from './ui/ScrollToTop';
import  homePage  from './utils/homePage';
import AddMembers from './components/firdous/AddMembers';
import DashBoard from './components/DashBoard';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ExamPage from './components/ExamPage.js';
import EditProfile from './components/EditProfile.js';
import YouTubeDialog from './components/firdous/YoutubeView.js';

function App() {

  const location = useLocation()
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});
  const [toaster,setToaster] = useState({
    showToaster:false,
    isError:false,
    message:""
  })
  const [player, setPlayer] = useState({
    showPlayer: false,
    loadedClass: false,
    playing: false,
    seek: 0,
    src: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function loginAndSetUser() {
      if (localStorage.getItem('token')) {
        const res = await homePage();
        res&&
        setUser({memberList:res.data.members,selectedUser:user.selectedUser?user.selectedUser: res.data.members[0]})
      }
      else{
        navigate('/login')
      }
    }
    loginAndSetUser();
  }, [navigate])
  const handleCloseToaster = () => {
    setToaster({
      showToaster:false,
      isError:false,
      message:""
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <ToasterContext.Provider value={{toaster, setToaster}}>
        <CourseContext.Provider value={{ course, setCourse }}>
          <PlayerContext.Provider value={{ player, setPlayer }}>
            <ScrollToTop />
            <div className="App">
              <NavBar/>
              <AnimatePresence>
                <Routes location={location} key={location.key}>
                <Route path="/" element= {<MainPage />} /> 
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addmembers" element={<AddMembers />} />
                <Route path="/course/:courseId/:tabId?" element={<Home />} />
                <Route path="/profile/edit/:userId" element={<EditProfile />} />
                <Route path="/course/examPage/:courseId" element={<ExamPage/>}/>
                <Route path='dashboard' element={<DashBoard />} />
                <Route path="/course/video/:videoId" element={<YouTubeDialog />}/>
                  {/* <Route path="/membercourselist" element={<MemberCourseList />} />
                  <Route path="/somepage" element={<Somepage />} />
                  <Route path="/login" element={<LoginPage />} /> */}
                </Routes>
              </AnimatePresence>
              <ClassPlayer />
              <Snackbar onClose={handleCloseToaster} open={toaster.showNotification} autoHideDuration={6000}>
            <MuiAlert onClose={handleCloseToaster} severity={toaster.isError ? "error" : "success"} elevation={6} variant="filled">
              {toaster.message}
            </MuiAlert>
          </Snackbar>
            </div>
          </PlayerContext.Provider>
        </CourseContext.Provider>
        </ToasterContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
